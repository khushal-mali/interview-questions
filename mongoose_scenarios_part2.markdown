# 25 Scenario-Based Questions for Mongoose: Complex Data Fetching and Mutations (Part 2)

This document provides the second set of 25 scenario-based questions focused on complex data fetching queries and mutations using Mongoose. Each scenario includes a detailed answer with a code solution and an explanation of the Mongoose concepts involved, covering advanced querying, mutations, population, aggregation, and transactions.

## Table of Contents
1. **Complex Queries (Continued)**
2. **Mutations (Continued)**
3. **Population and Relationships (Continued)**
4. **Aggregation and Performance**
5. **Middleware and Transactions**

---

### 26. Fetch posts with nested population
**Scenario**: Fetch posts with their author’s details and the author’s manager’s `name` (manager is a `User` reference in `User`).

**Answer**:
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const User = mongoose.model('User', userSchema);

async function fetchPostsWithNestedPopulation() {
  return await Post.find()
    .populate({
      path: 'author',
      select: 'name manager',
      populate: { path: 'manager', select: 'name -_id' }
    })
    .lean();
}
```

**Explanation**: Nested `populate()` fetches the author and their manager’s `name`. The `select` option limits fields for efficiency.

---

### 27. Bulk insert comments
**Scenario**: Insert multiple comments for a post in a single operation.

**Answer**:
```javascript
async function bulkInsertComments(postId, comments) {
  const commentDocs = comments.map(content => ({ postId, content }));
  return await Comment.insertMany(commentDocs);
}
```

**Explanation**: `insertMany()` efficiently inserts multiple documents, mapping input comments to include the `postId`.

---

### 28. Fetch users with high engagement
**Scenario**: Find users whose posts have an average comment count greater than 5.

**Answer**:
```javascript
async function fetchHighEngagementUsers() {
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
      $group: {
        _id: '$author',
        avgComments: { $avg: { $size: '$comments' } }
      }
    },
    { $match: { avgComments: { $gt: 5 } } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    { $project: { name: '$user.name', avgComments: 1 } }
  ]);
}
```

**Explanation**: The aggregation pipeline joins comments, groups by author to compute average comments, filters for high engagement, and joins user details.

---

### 29. Update post status with middleware
**Scenario**: Automatically set a post’s `status` to 'published' if its `publishDate` is in the past when saving.

**Answer**:
```javascript
postSchema.pre('save', function(next) {
  if (this.publishDate && this.publishDate <= new Date()) {
    this.status = 'published';
  }
  next();
});

async function savePost(postData) {
  return await Post.create(postData);
}
```

**Explanation**: The `pre('save')` middleware checks `publishDate` and updates `status` before saving, ensuring automatic status management.

---

### 30. Fetch posts with conditional population
**Scenario**: Fetch posts, populating only authors with the 'admin' role.

**Answer**:
```javascript
async function fetchPostsWithAdminAuthors() {
  return await Post.find()
    .populate({
      path: 'author',
      match: { role: 'admin' },
      select: 'name'
    })
    .lean();
}
```

**Explanation**: The `match` option in `populate()` filters authors to only those with `role: 'admin'`. Non-matching authors return `null`.

---

### 31. Delete user and their posts
**Scenario**: Delete a user and all their posts in a transaction to ensure consistency.

**Answer**:
```javascript
async function deleteUserAndPosts(userId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Post.deleteMany({ author: userId }, { session });
    await User.deleteOne({ _id: userId }, { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
```

**Explanation**: Transactions ensure both deletions succeed or are rolled back, maintaining data consistency.

---

### 32. Fetch posts by tag with pagination
**Scenario**: Fetch posts with a specific tag, paginated (page 3, 5 posts per page), sorted by `createdAt`.

**Answer**:
```javascript
async function fetchPostsByTag(tag, page = 3, limit = 5) {
  return await Post.find({ tags: tag })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
}
```

**Explanation**: The query filters by `tags`, uses pagination with `.skip()` and `.limit()`, and sorts by `createdAt`.

---

### 33. Update comment content
**Scenario**: Update the `content` of a specific comment identified by its `_id` and `postId`.

**Answer**:
```javascript
async function updateComment(postId, commentId, newContent) {
  return await Comment.updateOne(
    { _id: commentId, postId },
    { $set: { content: newContent } }
  );
}
```

**Explanation**: The query uses both `_id` and `postId` to ensure the correct comment is updated. `$set` targets the `content` field.

---

### 34. Fetch users with most recent post
**Scenario**: Fetch users with their most recent post’s `title` and `createdAt`.

**Answer**:
```javascript
async function fetchUsersWithLatestPost() {
  return await User.aggregate([
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'author',
        as: 'posts'
      }
    },
    { $unwind: { path: '$posts', preserveNullAndEmptyArrays: true } },
    { $sort: { 'posts.createdAt': -1 } },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        latestPost: { $first: '$posts' }
      }
    },
    {
      $project: {
        name: 1,
        postTitle: '$latestPost.title',
        postCreatedAt: '$latestPost.createdAt'
      }
    }
  ]);
}
```

**Explanation**: The pipeline joins posts, sorts by `createdAt`, groups by user to get the latest post, and projects relevant fields.

---

### 35. Add comment with validation
**Scenario**: Add a comment to a post, ensuring the `content` is not empty using a Schema validator.

**Answer**:
```javascript
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  content: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.trim().length > 0,
      message: 'Content cannot be empty'
    }
  }
});
const Comment = mongoose.model('Comment', commentSchema);

async function addComment(postId, content) {
  return await Comment.create({ postId, content });
}
```

**Explanation**: The Schema validator ensures non-empty `content`. `create()` triggers validation before saving.

---

### 36. Fetch posts with no comments
**Scenario**: Find posts that have no associated comments.

**Answer**:
```javascript
async function fetchPostsWithNoComments() {
  const postsWithComments = await Comment.distinct('postId');
  return await Post.find({ _id: { $nin: postsWithComments } }).lean();
}
```

**Explanation**: `distinct('postId')` finds posts with comments. `$nin` filters out those posts to find ones without comments.

---

### 37. Update user’s last login
**Scenario**: Update a user’s `lastLogin` field to the current timestamp on login.

**Answer**:
```javascript
async function updateLastLogin(userId) {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { lastLogin: new Date() } },
    { new: true }
  );
}
```

**Explanation**: `findByIdAndUpdate()` atomically updates `lastLogin`, returning the updated document.

---

### 38. Fetch posts by author activity
**Scenario**: Find posts by authors who were last active in the last 7 days.

**Answer**:
```javascript
async function fetchPostsByActiveAuthors() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const activeUsers = await User.find({ lastActive: { $gte: sevenDaysAgo } }).distinct('_id');
  return await Post.find({ author: { $in: activeUsers } }).lean();
}
```

**Explanation**: The query first finds active users, then uses `$in` to fetch their posts.

---

### 39. Archive old posts
**Scenario**: Set an `archived` field to `true` for posts older than 6 months.

**Answer**:
```javascript
async function archiveOldPosts() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  return await Post.updateMany(
    { createdAt: { $lt: sixMonthsAgo } },
    { $set: { archived: true } }
  );
}
```

**Explanation**: `$lt` filters old posts, and `updateMany()` sets the `archived` field efficiently.

---

### 40. Fetch users with specific post titles
**Scenario**: Find users who authored posts with titles containing 'Tutorial'.

**Answer**:
```javascript
async function fetchUsersByPostTitle() {
  postSchema.index({ title: 'text' });
  const posts = await Post.find({ $text: { $search: 'Tutorial' } }).distinct('author');
  return await User.find({ _id: { $in: posts } }).lean();
}
```

**Explanation**: A text index enables searching for 'Tutorial' in post titles. `distinct('author')` gets unique authors, and `$in` fetches their user documents.

---

### 41. Remove comments by author
**Scenario**: Delete all comments by a specific user.

**Answer**:
```javascript
async function deleteCommentsByAuthor(userId) {
  return await Comment.deleteMany({ author: userId });
}
```

**Explanation**: `deleteMany()` removes all comments where the `author` field matches the user ID.

---

### 42. Fetch posts with comment count threshold
**Scenario**: Find posts with more than 10 comments.

**Answer**:
```javascript
async function fetchHighCommentPosts() {
  return await Post.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'postId',
        as: 'comments'
      }
    },
    { $match: { $expr: { $gt: [{ $size: '$comments' }, 10] } } },
    { $project: { title: 1, commentCount: { $size: '$comments' } } }
  ]);
}
```

**Explanation**: `$lookup` joins comments, `$match` with `$expr` filters posts with more than 10 comments, and `$project` includes relevant fields.

---

### 43. Update user with transaction
**Scenario**: Update a user’s `email` and add a log entry to a `Log` collection in a transaction.

**Answer**:
```javascript
const logSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  action: String
});
const Log = mongoose.model('Log', logSchema);

async function updateUserWithLog(userId, newEmail) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.updateOne({ _id: userId }, { $set: { email: newEmail } }, { session });
    await Log.create([{ userId, action: 'Updated email' }], { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
```

**Explanation**: Transactions ensure both the user update and log creation succeed or are rolled back, maintaining consistency.

---

### 44. Fetch posts by creation month
**Scenario**: Find posts created in a specific month (e.g., January 2025).

**Answer**:
```javascript
async function fetchPostsByMonth(year, month) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  return await Post.find({
    createdAt: { $gte: start, $lt: end }
  }).lean();
}
```

**Explanation**: The query uses `$gte` and `$lt` to define a date range for the specified month.

---

### 45. Add multiple tags to user
**Scenario**: Add multiple tags to a user’s `tags` array, avoiding duplicates.

**Answer**:
```javascript
async function addTagsToUser(userId, newTags) {
  return await User.updateOne(
    { _id: userId },
    { $addToSet: { tags: { $each: newTags } } }
  );
}
```

**Explanation**: `$addToSet` with `$each` adds multiple tags, ensuring no duplicates are added to the array.

---

### 46. Fetch users with virtual field
**Scenario**: Define a virtual field `fullName` for users and fetch users with their full name.

**Answer**:
```javascript
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

async function fetchUsersWithFullName() {
  return await User.find()
    .select('firstName lastName')
    .setOptions({ toJSON: { virtuals: true } })
    .lean();
}
```

**Explanation**: The virtual `fullName` combines `firstName` and `lastName`. `toJSON: { virtuals: true }` includes virtuals in the output.

---

### 47. Fetch posts with author’s post count
**Scenario**: Fetch posts, including the author’s total post count.

**Answer**:
```javascript
async function fetchPostsWithAuthorPostCount() {
  return await Post.aggregate([
    {
      $lookup: {
        from: 'posts',
        localField: 'author',
        foreignField: 'author',
        as: 'authorPosts'
      }
    },
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
      $project: {
        title: 1,
        authorName: '$authorDetails.name',
        authorPostCount: { $size: '$authorPosts' }
      }
    }
  ]);
}
```

**Explanation**: Two `$lookup` stages fetch all posts by the author and the author’s details. `$size` computes the post count.

---

### 48. Update post with optimistic concurrency
**Scenario**: Update a post’s `title` while checking for version conflicts using `__v`.

**Answer**:
```javascript
async function updatePostWithConcurrency(postId, newTitle) {
  const post = await Post.findById(postId);
  return await Post.findOneAndUpdate(
    { _id: postId, __v: post.__v },
    { $set: { title: newTitle }, $inc: { __v: 1 } },
    { new: true }
  );
}
```

**Explanation**: The query checks the `__v` version to prevent overwrites. `$inc` updates the version on success.

---

### 49. Stream large dataset
**Scenario**: Process all users with `role: 'user'` using a stream to handle large datasets.

**Answer**:
```javascript
async function processUsers() {
  const stream = User.find({ role: 'user' }).lean().cursor();
  stream.on('data', (user) => {
    console.log(`Processing user: ${user.name}`);
  });
  stream.on('error', (err) => {
    console.error('Stream error:', err);
  });
  stream.on('end', () => {
    console.log('Processing complete');
  });
}
```

**Explanation**: The cursor streams documents one at a time, reducing memory usage for large datasets. `.lean()` optimizes performance.

---

### 50. Fetch posts with recent activity
**Scenario**: Find posts with comments or updates in the last 24 hours.

**Answer**:
```javascript
async function fetchRecentlyActivePosts() {
  const oneDayAgo = new Date();
  oneDayAgo.setHours(oneDayAgo.getHours() - 24);
  const recentCommentPosts = await Comment.distinct('postId', {
    createdAt: { $gte: oneDayAgo }
  });
  return await Post.find({
    $or: [
      { _id: { $in: recentCommentPosts } },
      { updatedAt: { $gte: oneDayAgo } }
    ]
  }).lean();
}
```

**Explanation**: The query uses `$or` to match posts with recent comments (via `distinct('postId')`) or recent updates (`updatedAt`).

---