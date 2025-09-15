# 25 Scenario-Based Questions for Mongoose: Complex Data Fetching and Mutations (Part 1)

This document provides 25 scenario-based questions focused on complex data fetching queries and mutations using Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js. Each scenario includes a detailed answer with a code solution and an explanation of the Mongoose concepts involved, such as advanced querying, aggregation, population, middleware, and transactions.

## Table of Contents
1. **Complex Queries**
2. **Mutations**
3. **Population and Relationships**
4. **Aggregation and Performance**
5. **Middleware and Transactions**

---

### 1. Fetch users with specific roles and sort by recent activity
**Scenario**: You have a `User` collection with fields `name`, `role` (enum: ['admin', 'user', 'moderator']), and `lastActive` (Date). Write a query to fetch all users with roles 'admin' or 'moderator', sorted by `lastActive` in descending order, and exclude the `_id` field.

**Answer**:
```javascript
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['admin', 'user', 'moderator'] },
  lastActive: Date
});
const User = mongoose.model('User', userSchema);

async function fetchAdminsAndModerators() {
  return await User.find({ role: { $in: ['admin', 'moderator'] } })
    .sort({ lastActive: -1 })
    .select('-_id name role lastActive')
    .lean();
}
```

**Explanation**: The query uses `$in` to match multiple roles, `.sort({ lastActive: -1 })` to order by `lastActive` descending, and `.select('-_id name role lastActive')` to include only specified fields. `.lean()` improves performance by returning plain JavaScript objects.

---

### 2. Update user status based on last activity
**Scenario**: Update the `status` field to 'inactive' for users who haven’t been active (`lastActive`) in the last 30 days.

**Answer**:
```javascript
async function updateInactiveUsers() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return await User.updateMany(
    { lastActive: { $lt: thirtyDaysAgo } },
    { $set: { status: 'inactive' } }
  );
}
```

**Explanation**: The `$lt` operator filters users with `lastActive` before 30 days ago. `updateMany()` applies the `$set` operator to update the `status` field efficiently across multiple documents.

---

### 3. Fetch posts with author details
**Scenario**: You have `Post` and `User` collections. Posts have an `author` field referencing a `User`’s `_id`. Fetch all posts with their authors’ `name` and `email`, excluding the post’s `_id`.

**Answer**:
```javascript
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Post = mongoose.model('Post', postSchema);

async function fetchPostsWithAuthors() {
  return await Post.find()
    .populate({ path: 'author', select: 'name email -_id' })
    .select('-_id title author')
    .lean();
}
```

**Explanation**: The `.populate()` method replaces the `author` ObjectId with the corresponding User document, selecting only `name` and `email`. `.select()` excludes `_id` from posts, and `.lean()` optimizes performance.

---

### 4. Delete posts older than a year
**Scenario**: Delete all posts with a `createdAt` date older than one year.

**Answer**:
```javascript
async function deleteOldPosts() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return await Post.deleteMany({ createdAt: { $lt: oneYearAgo } });
}
```

**Explanation**: The `$lt` operator filters posts older than one year. `deleteMany()` efficiently removes all matching documents in a single operation.

---

### 5. Aggregate posts by author
**Scenario**: Group posts by author and count the number of posts per author, including the author’s `name`.

**Answer**:
```javascript
async function aggregatePostsByAuthor() {
  return await Post.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    { $unwind: '$authorDetails' },
    {
      $group: {
        _id: '$author',
        authorName: { $first: '$authorDetails.name' },
        postCount: { $sum: 1 }
      }
    }
  ]);
}
```

**Explanation**: The `$lookup` stage joins the `Post` and `User` collections. `$unwind` flattens the `authorDetails` array, and `$group` counts posts per author, including their name.

---

### 6. Add tags to a user’s profile
**Scenario**: Add a new tag to a user’s `tags` array only if it doesn’t already exist.

**Answer**:
```javascript
async function addTagToUser(userId, tag) {
  return await User.updateOne(
    { _id: userId, tags: { $ne: tag } },
    { $push: { tags: tag } }
  );
}
```

**Explanation**: The `$ne` operator ensures the tag isn’t already in the `tags` array. `$push` adds the tag atomically, preventing duplicates.

---

### 7. Fetch users with specific tag combinations
**Scenario**: Find users who have both 'developer' and 'javascript' in their `tags` array.

**Answer**:
```javascript
async function fetchUsersWithTags() {
  return await User.find({ tags: { $all: ['developer', 'javascript'] } })
    .lean();
}
```

**Explanation**: The `$all` operator matches documents where the `tags` array contains all specified values, ensuring precise filtering.

---

### 8. Update nested address field
**Scenario**: Update the `city` field in a user’s `address` sub-document for a specific user.

**Answer**:
```javascript
async function updateUserCity(userId, newCity) {
  return await User.updateOne(
    { _id: userId },
    { $set: { 'address.city': newCity } }
  );
}
```

**Explanation**: Dot notation (`address.city`) targets the nested field. `$set` updates only the specified field, preserving other sub-document fields.

---

### 9. Fetch posts with comments count
**Scenario**: Fetch all posts, including a count of their comments (stored in a `Comment` collection referencing `postId`).

**Answer**:
```javascript
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  content: String
});
const Comment = mongoose.model('Comment', commentSchema);

async function fetchPostsWithCommentCount() {
  return await Post.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'postId',
        as: 'comments'
      }
    },
    {
      $project: {
        title: 1,
        commentCount: { $size: '$comments' }
      }
    }
  ]);
}
```

**Explanation**: The `$lookup` stage joins comments to posts. `$project` includes the `title` and computes the comment count using `$size`.

---

### 10. Soft delete a user
**Scenario**: Implement soft deletion by setting a `deletedAt` field instead of removing a user.

**Answer**:
```javascript
userSchema.pre('find', function() {
  this.where({ deletedAt: null });
});

async function softDeleteUser(userId) {
  return await User.updateOne(
    { _id: userId },
    { $set: { deletedAt: new Date() } }
  );
}
```

**Explanation**: A `pre('find')` middleware filters out soft-deleted users. The mutation uses `$set` to mark a user as deleted by setting `deletedAt`.

---

### 11. Fetch paginated posts
**Scenario**: Fetch posts with pagination (page 2, 10 posts per page), sorted by `createdAt` descending.

**Answer**:
```javascript
async function fetchPaginatedPosts(page = 2, limit = 10) {
  return await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
}
```

**Explanation**: `.skip()` and `.limit()` implement pagination, while `.sort()` orders results. `.lean()` optimizes performance for large datasets.

---

### 12. Bulk update user roles
**Scenario**: Update the `role` field to 'moderator' for all users with more than 10 posts.

**Answer**:
```javascript
async function bulkUpdateUserRoles() {
  return await User.updateMany(
    { postCount: { $gt: 10 } },
    { $set: { role: 'moderator' } }
  );
}
```

**Explanation**: `updateMany()` targets users with `postCount` greater than 10 using `$gt`. `$set` updates the `role` field efficiently.

---

### 13. Fetch users with no posts
**Scenario**: Find users who have no posts in the `Post` collection.

**Answer**:
```javascript
async function fetchUsersWithNoPosts() {
  const usersWithPosts = await Post.distinct('author');
  return await User.find({ _id: { $nin: usersWithPosts } }).lean();
}
```

**Explanation**: `distinct('author')` retrieves unique author IDs from posts. `$nin` finds users whose `_id` is not in that list.

---

### 14. Increment user post count
**Scenario**: Increment a user’s `postCount` field atomically when they create a new post.

**Answer**:
```javascript
async function incrementPostCount(userId) {
  return await User.findByIdAndUpdate(
    userId,
    { $inc: { postCount: 1 } },
    { new: true }
  );
}
```

**Explanation**: `$inc` atomically increments `postCount`. `findByIdAndUpdate()` ensures the operation is atomic and returns the updated document.

---

### 15. Fetch posts with specific keywords
**Scenario**: Find posts with a text index on `title` containing the keyword 'Node.js'.

**Answer**:
```javascript
postSchema.index({ title: 'text' });

async function searchPostsByKeyword() {
  return await Post.find({ $text: { $search: 'Node.js' } })
    .select('title')
    .lean();
}
```

**Explanation**: A text index enables full-text search. The `$text` operator with `$search` matches documents containing the keyword.

---

### 16. Create a post with transaction
**Scenario**: Create a post and update the user’s `postCount` in a transaction to ensure consistency.

**Answer**:
```javascript
async function createPostWithTransaction(userId, postData) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const post = await Post.create([postData], { session });
    await User.updateOne(
      { _id: userId },
      { $inc: { postCount: 1 } },
      { session }
    );
    await session.commitTransaction();
    return post[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
```

**Explanation**: Transactions ensure atomicity across the post creation and user update. If either fails, both are rolled back.

---

### 17. Fetch users with recent comments
**Scenario**: Find users whose posts have comments created in the last 7 days.

**Answer**:
```javascript
async function fetchUsersWithRecentComments() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const posts = await Post.find({
    _id: {
      $in: await Comment.distinct('postId', { createdAt: { $gte: sevenDaysAgo } })
    }
  }).distinct('author');
  return await User.find({ _id: { $in: posts } }).lean();
}
```

**Explanation**: `distinct('postId')` finds posts with recent comments. A second query matches users whose `_id` is in the `author` field of those posts.

---

### 18. Remove specific tag from all users
**Scenario**: Remove the tag 'old' from all users’ `tags` arrays.

**Answer**:
```javascript
async function removeTagFromUsers() {
  return await User.updateMany(
    { tags: 'old' },
    { $pull: { tags: 'old' } }
  );
}
```

**Explanation**: The `$pull` operator removes the specified value from the `tags` array across all matching documents.

---

### 19. Fetch posts with author’s role
**Scenario**: Fetch posts, including the author’s `role`, excluding posts by 'user' role authors.

**Answer**:
```javascript
async function fetchPostsByAuthorRole() {
  return await Post.find()
    .populate({
      path: 'author',
      match: { role: { $ne: 'user' } },
      select: 'role'
    })
    .lean();
}
```

**Explanation**: The `match` option in `populate()` filters authors by role. Only posts with non-'user' authors are populated.

---

### 20. Update multiple fields atomically
**Scenario**: Update a user’s `name`, `email`, and `updatedAt` fields atomically.

**Answer**:
```javascript
async function updateUserFields(userId, updates) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name: updates.name,
        email: updates.email,
        updatedAt: new Date()
      }
    },
    { new: true }
  );
}
```

**Explanation**: `$set` updates multiple fields in a single atomic operation. `findByIdAndUpdate()` ensures consistency and returns the updated document.

---

### 21. Fetch top 5 active users
**Scenario**: Find the top 5 users with the most posts, sorted by `postCount` descending.

**Answer**:
```javascript
async function fetchTopActiveUsers() {
  return await User.find()
    .sort({ postCount: -1 })
    .limit(5)
    .select('name postCount')
    .lean();
}
```

**Explanation**: `.sort()` orders by `postCount`, `.limit(5)` restricts to the top 5, and `.select()` includes only relevant fields.

---

### 22. Delete comments for a post
**Scenario**: Delete all comments associated with a specific post.

**Answer**:
```javascript
async function deletePostComments(postId) {
  return await Comment.deleteMany({ postId });
}
```

**Explanation**: `deleteMany()` removes all comments where `postId` matches the specified ID, efficiently cleaning up related data.

---

### 23. Fetch users with nested conditions
**Scenario**: Find users with `address.city` as 'Boston' and `age` greater than 25.

**Answer**:
```javascript
async function fetchUsersByCityAndAge() {
  return await User.find({
    'address.city': 'Boston',
    age: { $gt: 25 }
  }).lean();
}
```

**Explanation**: Dot notation targets nested fields, and multiple conditions in `find()` combine to filter documents.

---

### 24. Update post with validation
**Scenario**: Update a post’s `title` only if it’s not empty, using a pre-save hook for validation.

**Answer**:
```javascript
postSchema.pre('save', function(next) {
  if (!this.title) {
    return next(new Error('Title cannot be empty'));
  }
  next();
});

async function updatePostTitle(postId, title) {
  return await Post.findByIdAndUpdate(
    postId,
    { $set: { title } },
    { new: true, runValidators: true }
  );
}
```

**Explanation**: The `pre('save')` hook validates the `title`. `runValidators: true` ensures Schema validations apply during updates.

---

### 25. Fetch posts with specific comment author
**Scenario**: Find posts that have comments authored by a specific user.

**Answer**:
```javascript
async function fetchPostsByCommentAuthor(userId) {
  const postIds = await Comment.distinct('postId', { author: userId });
  return await Post.find({ _id: { $in: postIds } }).lean();
}
```

**Explanation**: `distinct('postId')` finds posts with comments by the user. `find()` retrieves those posts using `$in`.

---