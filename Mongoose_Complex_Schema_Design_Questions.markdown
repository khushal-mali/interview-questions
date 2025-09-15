# 100 Mongoose Interview Questions on Complex Schema Design for Business Scenarios

## Schema Design Fundamentals

1. **How do you design a Mongoose schema for an e-commerce product catalog with variant support (e.g., sizes, colors)?**  
   **Answer**: Create a product schema with an embedded array of variants, each containing attributes like size, color, and stock. Use validation to ensure unique variant combinations.  
   **Example**:  
   ```javascript
   const { Schema, model } = require("mongoose");
   const productSchema = new Schema({
     name: { type: String, required: true },
     description: String,
     variants: [{
       size: { type: String, enum: ["S", "M", "L"], required: true },
       color: { type: String, required: true },
       stock: { type: Number, min: 0, required: true },
       price: { type: Number, required: true }
     }],
     category: { type: Schema.Types.ObjectId, ref: "Category" }
   }, { timestamps: true });
   productSchema.index({ "variants.size": 1, "variants.color": 1 }, { unique: true });
   const Product = model("Product", productSchema);
   ```
   **Explanation**: This schema supports an e-commerce catalog where products have multiple variants, ensuring efficient querying and uniqueness for inventory management.

2. **How would you model a schema for a multi-tenant SaaS application with isolated tenant data?**  
   **Answer**: Use a single schema with a `tenantId` field to partition data, ensuring queries always filter by tenant. Add indexes for performance.  
   **Example**:  
   ```javascript
   const userSchema = new Schema({
     tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
     email: { type: String, required: true },
     name: String,
     role: { type: String, enum: ["admin", "user"], default: "user" }
   });
   userSchema.index({ tenantId: 1, email: 1 }, { unique: true });
   const User = model("User", userSchema);
   ```
   **Explanation**: In a SaaS platform, `tenantId` isolates data, ensuring secure and scalable access for each client organization.

3. **How do you design a schema for an order management system with order history and status tracking?**  
   **Answer**: Use a schema with embedded order history to track status changes and reference products for details.  
   **Example**:  
   ```javascript
   const orderSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
     items: [{
       productId: { type: Schema.Types.ObjectId, ref: "Product" },
       quantity: { type: Number, min: 1 }
     }],
     status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
     history: [{
       status: String,
       timestamp: { type: Date, default: Date.now },
       note: String
     }],
     total: Number
   }, { timestamps: true });
   const Order = model("Order", orderSchema);
   ```
   **Explanation**: This schema tracks order progress in an e-commerce system, embedding history for audit trails and referencing products for flexibility.

4. **What considerations are important when designing a schema for a subscription-based service?**  
   **Answer**: Include fields for subscription plans, billing cycles, and status, with references to users and payment methods. Use indexes for frequent queries.  
   **Example**:  
   ```javascript
   const subscriptionSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
     planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
     status: { type: String, enum: ["active", "canceled", "expired"], default: "active" },
     startDate: { type: Date, default: Date.now },
     endDate: Date,
     billingCycle: { type: String, enum: ["monthly", "yearly"], required: true }
   }, { timestamps: true });
   subscriptionSchema.index({ userId: 1, status: 1 });
   const Subscription = model("Subscription", subscriptionSchema);
   ```
   **Explanation**: This schema supports recurring billing in a subscription service, enabling efficient status and user-based queries.

5. **How do you model a schema for a hierarchical organization structure (e.g., departments, sub-departments)?**  
   **Answer**: Use a self-referencing schema with a `parentId` field to represent hierarchy, and add indexes for traversal.  
   **Example**:  
   ```javascript
   const departmentSchema = new Schema({
     name: { type: String, required: true },
     parentId: { type: Schema.Types.ObjectId, ref: "Department", default: null },
     managerId: { type: Schema.Types.ObjectId, ref: "User" }
   });
   departmentSchema.index({ parentId: 1 });
   const Department = model("Department", departmentSchema);
   ```
   **Explanation**: This schema supports corporate hierarchies, allowing recursive queries for department trees in HR systems.

## Advanced Schema Features

6. **How do you implement soft deletion in a Mongoose schema for a CRM system?**  
   **Answer**: Add a `deletedAt` field and use middleware to filter out soft-deleted records in queries.  
   **Example**:  
   ```javascript
   const customerSchema = new Schema({
     name: { type: String, required: true },
     email: String,
     deletedAt: { type: Date, default: null }
   });
   customerSchema.pre("find", function() {
     this.where({ deletedAt: null });
   });
   customerSchema.pre("findOne", function() {
     this.where({ deletedAt: null });
   });
   const Customer = model("Customer", customerSchema);
   ```
   **Explanation**: Soft deletion in a CRM preserves customer data for audits while hiding deleted records from standard queries.

7. **How do you design a schema for a multi-language content management system?**  
   **Answer**: Use an embedded array of translations with locale and content fields, ensuring efficient querying.  
   **Example**:  
   ```javascript
   const contentSchema = new Schema({
     title: String,
     translations: [{
       locale: { type: String, required: true },
       title: String,
       body: String
     }],
     published: { type: Boolean, default: false }
   });
   contentSchema.index({ "translations.locale": 1 });
   const Content = model("Content", contentSchema);
   ```
   **Explanation**: This schema supports global content delivery with locale-specific data for CMS platforms.

8. **How would you model a schema for a ticketing system with dynamic fields (e.g., custom attributes)?**  
   **Answer**: Use a `Map` type for dynamic fields to allow flexible key-value pairs, with core fields for standard data.  
   **Example**:  
   ```javascript
   const ticketSchema = new Schema({
     title: { type: String, required: true },
     status: { type: String, enum: ["open", "closed"], default: "open" },
     customFields: { type: Map, of: Schema.Types.Mixed },
     createdBy: { type: Schema.Types.ObjectId, ref: "User" }
   });
   const Ticket = model("Ticket", ticketSchema);
   // Usage
   const ticket = new Ticket({
     title: "Issue",
     customFields: { priority: "high", department: "IT" }
   });
   ```
   **Explanation**: Dynamic fields in a ticketing system allow businesses to customize attributes without schema changes.

9. **How do you design a schema for a logistics system tracking shipments with real-time updates?**  
   **Answer**: Use embedded arrays for tracking updates and references for related entities like orders and drivers.  
   **Example**:  
   ```javascript
   const shipmentSchema = new Schema({
     orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
     driverId: { type: Schema.Types.ObjectId, ref: "User" },
     status: { type: String, enum: ["in-transit", "delivered"], default: "in-transit" },
     tracking: [{
       location: { type: String, required: true },
       timestamp: { type: Date, default: Date.now },
       status: String
     }]
   });
   shipmentSchema.index({ orderId: 1, status: 1 });
   const Shipment = model("Shipment", shipmentSchema);
   ```
   **Explanation**: This schema supports real-time shipment tracking for logistics businesses, with efficient querying.

10. **How do you model a schema for a booking system with time slot availability?**  
    **Answer**: Use an embedded array of time slots with availability status, and validate overlapping bookings.  
    **Example**:  
    ```javascript
    const bookingSchema = new Schema({
      resourceId: { type: Schema.Types.ObjectId, ref: "Resource", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      slots: [{
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        status: { type: String, enum: ["booked", "available"], default: "booked" }
      }]
    });
    bookingSchema.index({ resourceId: 1, "slots.startTime": 1, "slots.endTime": 1 });
    const Booking = model("Booking", bookingSchema);
    ```
    **Explanation**: This schema ensures efficient booking management for businesses like salons or event venues.

## Relationships and References

11. **How do you model a one-to-many relationship for a blog platform with posts and comments?**  
    **Answer**: Use a separate `Comment` schema with a reference to `Post`, and index the relationship for performance.  
    **Example**:  
    ```javascript
    const commentSchema = new Schema({
      postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true }
    }, { timestamps: true });
    commentSchema.index({ postId: 1 });
    const postSchema = new Schema({
      title: { type: String, required: true },
      content: String
    });
    const Comment = model("Comment", commentSchema);
    const Post = model("Post", postSchema);
    ```
    **Explanation**: This approach scales for blogs with many comments, allowing efficient querying by post.

12. **How do you design a schema for a many-to-many relationship in a project management tool (e.g., users and projects)?**  
    **Answer**: Use arrays of references in both schemas or a separate join collection for flexibility.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      projects: [{ type: Schema.Types.ObjectId, ref: "Project" }]
    });
    const projectSchema = new Schema({
      name: String,
      members: [{ type: Schema.Types.ObjectId, ref: "User" }]
    });
    userSchema.index({ projects: 1 });
    projectSchema.index({ members: 1 });
    const User = model("User", userSchema);
    const Project = model("Project", projectSchema);
    ```
    **Explanation**: This schema supports project management tools by linking users and projects bidirectionally.

13. **How do you model a schema for a social media platform with follower relationships?**  
    **Answer**: Use arrays of references for followers and following, with indexes for efficient lookups.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      username: { type: String, required: true, unique: true },
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
      following: [{ type: Schema.Types.ObjectId, ref: "User" }]
    });
    userSchema.index({ followers: 1 });
    userSchema.index({ following: 1 });
    const User = model("User", userSchema);
    ```
    **Explanation**: This schema supports social media features like follower counts and feeds, with fast queries.

14. **How do you handle cascading deletes in a Mongoose schema for an inventory system?**  
    **Answer**: Use middleware to remove dependent documents (e.g., order items when an order is deleted).  
    **Example**:  
    ```javascript
    const orderSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" } }]
    });
    orderSchema.pre("deleteOne", { document: true }, async function(next) {
      await this.model("OrderItem").deleteMany({ orderId: this._id });
      next();
    });
    const Order = model("Order", orderSchema);
    ```
    **Explanation**: In inventory systems, cascading deletes maintain data consistency when orders are removed.

15. **How do you model a schema for a recommendation system with user-item interactions?**  
    **Answer**: Use a separate `Interaction` schema to track user actions (e.g., views, likes) with references to users and items.  
    **Example**:  
    ```javascript
    const interactionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
      action: { type: String, enum: ["view", "like", "purchase"], required: true },
      timestamp: { type: Date, default: Date.now }
    });
    interactionSchema.index({ userId: 1, itemId: 1, action: 1 });
    const Interaction = model("Interaction", interactionSchema);
    ```
    **Explanation**: This schema supports personalized recommendations in e-commerce or content platforms.

## Validation and Middleware

16. **How do you enforce unique constraints across multiple fields in a Mongoose schema for a marketplace?**  
    **Answer**: Use a compound index with `unique: true` to enforce uniqueness across fields like seller and product name.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true }
    });
    productSchema.index({ sellerId: 1, name: 1 }, { unique: true });
    const Product = model("Product", productSchema);
    ```
    **Explanation**: This ensures no duplicate products per seller in a marketplace, preventing data errors.

17. **How do you implement custom validation for a payment schema in Mongoose?**  
    **Answer**: Use a custom validator to check payment-specific rules, like valid card numbers or amounts.  
    **Example**:  
    ```javascript
    const paymentSchema = new Schema({
      amount: {
        type: Number,
        required: true,
        validate: {
          validator: v => v > 0,
          message: "Amount must be positive"
        }
      },
      cardNumber: {
        type: String,
        required: true,
        validate: {
          validator: v => /^\d{16}$/.test(v),
          message: "Invalid card number"
        }
      }
    });
    const Payment = model("Payment", paymentSchema);
    ```
    **Explanation**: Custom validation ensures secure and valid payment data in financial systems.

18. **How do you use Mongoose middleware to log changes in a CRM contact schema?**  
    **Answer**: Use `pre` and `post` middleware on `save` to log changes to contact fields.  
    **Example**:  
    ```javascript
    const contactSchema = new Schema({
      name: String,
      email: String
    });
    contactSchema.pre("save", function(next) {
      if (this.isModified("email")) {
        console.log(`Email changed to ${this.email}`);
      }
      next();
    });
    const Contact = model("Contact", contactSchema);
    ```
    **Explanation**: Logging in CRM systems tracks contact updates for audit purposes.

19. **How do you enforce data consistency in a Mongoose schema for an event management system?**  
    **Answer**: Use middleware to validate relationships, like ensuring event dates are logical.  
    **Example**:  
    ```javascript
    const eventSchema = new Schema({
      title: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true }
    });
    eventSchema.pre("save", function(next) {
      if (this.startDate > this.endDate) {
        return next(new Error("Start date must be before end date"));
      }
      next();
    });
    const Event = model("Event", eventSchema);
    ```
    **Explanation**: This ensures valid event scheduling in management platforms.

20. **How do you handle schema versioning for a product catalog in Mongoose?**  
    **Answer**: Add a `version` field and use middleware to update it on changes, with optimistic concurrency.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      name: String,
      version: { type: Number, default: 0 }
    }, { optimisticConcurrency: true });
    productSchema.pre("save", function(next) {
      this.version++;
      next();
    });
    const Product = model("Product", productSchema);
    ```
    **Explanation**: Versioning prevents conflicts in concurrent updates for product data.

## Aggregation and Query Optimization

21. **How do you use Mongoose aggregation to calculate total sales by product category in an e-commerce system?**  
    **Answer**: Use `$lookup` to join orders with products, `$group` to sum sales by category.  
    **Example**:  
    ```javascript
    const salesByCategory = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$product.category",
          totalSales: { $sum: { $multiply: ["$items.quantity", "$product.price"] } }
        }
      }
    ]);
    ```
    **Explanation**: This aggregation provides business insights into category performance.

22. **How do you optimize queries for a real-time dashboard showing user activity?**  
    **Answer**: Use indexes on frequently queried fields and limit fields in projections to reduce data transfer.  
    **Example**:  
    ```javascript
    const userActivitySchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
      action: String,
      timestamp: { type: Date, index: true }
    });
    const UserActivity = model("UserActivity", userActivitySchema);
    const activities = await UserActivity.find({ userId: userId })
      .select("action timestamp")
      .sort({ timestamp: -1 })
      .limit(10);
    ```
    **Explanation**: Optimized queries ensure fast dashboard updates in analytics platforms.

23. **How do you use Mongoose aggregation to find top customers by purchase amount?**  
    **Answer**: Group orders by user, sum totals, and sort to find top spenders.  
    **Example**:  
    ```javascript
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$total" }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $project: { name: "$user.name", totalSpent: 1 } }
    ]);
    ```
    **Explanation**: This identifies high-value customers for targeted marketing in e-commerce.

24. **How do you handle pagination in a Mongoose query for a product listing API?**  
    **Answer**: Use `skip` and `limit` with indexes for efficient pagination.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({ name: String, price: Number });
    productSchema.index({ price: 1 });
    const Product = model("Product", productSchema);
    const page = 2, limit = 10;
    const products = await Product.find()
      .sort({ price: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    ```
    **Explanation**: Pagination ensures scalable product listings in e-commerce APIs.

25. **How do you use Mongoose aggregation to calculate average order value per month?**  
    **Answer**: Use `$group` with date operators to aggregate orders by month and compute averages.  
    **Example**:  
    ```javascript
    const avgOrderValue = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$total" },
          count: { $sum: 1 }
        }
      },
      { $project: { month: "$_id", avgValue: { $divide: ["$total", "$count"] } } }
    ]);
    ```
    **Explanation**: This provides monthly business insights for financial reporting.

## Performance and Scalability

26. **How do you optimize a Mongoose schema for high-write throughput in a logging system?**  
    **Answer**: Use a lean schema, disable versioning, and enable write concern for speed.  
    **Example**:  
    ```javascript
    const logSchema = new Schema({
      message: String,
      level: String,
      timestamp: Date
    }, { versionKey: false, writeConcern: { w: 0 } });
    logSchema.index({ timestamp: 1 });
    const Log = model("Log", logSchema);
    ```
    **Explanation**: This optimizes logging systems for high-frequency event writes.

27. **How do you use Mongoose schema indexes to improve query performance in a search API?**  
    **Answer**: Create text or compound indexes on searched fields to speed up queries.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      name: String,
      description: String
    });
    productSchema.index({ name: "text", description: "text" });
    const Product = model("Product", productSchema);
    const results = await Product.find({ $text: { $search: "phone" } });
    ```
    **Explanation**: Text indexes enhance search performance in e-commerce or content APIs.

28. **How do you handle large datasets in Mongoose for an analytics platform?**  
    **Answer**: Use streaming or aggregation pipelines with batch processing to manage large data.  
    **Example**:  
    ```javascript
    const stream = UserActivity.find().cursor();
    stream.on("data", doc => console.log(doc));
    stream.on("end", () => console.log("Done"));
    ```
    **Explanation**: Streaming handles large datasets efficiently for analytics dashboards.

29. **How do you implement sharding in a Mongoose schema for a global e-commerce platform?**  
    **Answer**: Define a shard key (e.g., region) and configure MongoDB sharding.  
    **Example**:  
    ```javascript
    const orderSchema = new Schema({
      region: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      total: Number
    });
    orderSchema.index({ region: 1 }); // Shard key
    const Order = model("Order", orderSchema);
    ```
    **Explanation**: Sharding by region scales order data across global servers.

30. **How do you use Mongoose lean queries for a high-performance API?**  
    **Answer**: Use `.lean()` to return plain JavaScript objects, bypassing Mongoose overhead.  
    **Example**:  
    ```javascript
    const products = await Product.find().lean();
    console.log(products); // Plain objects
    ```
    **Explanation**: Lean queries improve performance in read-heavy APIs like product listings.

## Security and Data Integrity

31. **How do you secure sensitive data in a Mongoose schema for a healthcare system?**  
    **Answer**: Encrypt sensitive fields (e.g., PII) using a library like `mongoose-encryption`.  
    **Example**:  
    ```javascript
    const encrypt = require("mongoose-encryption");
    const patientSchema = new Schema({
      name: String,
      medicalRecord: { type: String, encrypt: true }
    });
    patientSchema.plugin(encrypt, { encryptionKey: "key1", signingKey: "key2" });
    const Patient = model("Patient", patientSchema);
    ```
    **Explanation**: Encryption ensures HIPAA compliance in healthcare applications.

32. **How do you prevent data corruption in a Mongoose schema for a financial system?**  
    **Answer**: Use transactions to ensure atomicity across multiple operations.  
    **Example**:  
    ```javascript
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Account.updateOne({ _id: from }, { $inc: { balance: -amount } }, { session });
      await Account.updateOne({ _id: to }, { $inc: { balance: amount } }, { session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    ```
    **Explanation**: Transactions ensure consistent fund transfers in banking systems.

33. **How do you implement role-based access control in a Mongoose schema for an enterprise app?**  
    **Answer**: Add a `role` field and use middleware to restrict access based on roles.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      role: { type: String, enum: ["admin", "user"], default: "user" }
    });
    userSchema.pre("find", function(next) {
      if (this.options.userRole !== "admin") {
        this.where({ role: "user" });
      }
      next();
    });
    const User = model("User", userSchema);
    ```
    **Explanation**: RBAC ensures secure data access in enterprise systems.

34. **How do you handle schema migrations in a Mongoose-based application?**  
    **Answer**: Use a migration library like `migrate-mongo` to update schemas and data.  
    **Example**:  
    ```javascript
    // migration.js
    module.exports.up = async db => {
      await db.collection("users").updateMany({}, { $set: { newField: "default" } });
    };
    ```
    **Explanation**: Migrations manage schema changes in production e-commerce systems.

35. **How do you enforce data retention policies in a Mongoose schema for a compliance system?**  
    **Answer**: Use TTL indexes to automatically delete documents after a retention period.  
    **Example**:  
    ```javascript
    const logSchema = new Schema({
      message: String,
      createdAt: { type: Date, expires: "30d" }
    });
    const Log = model("Log", logSchema);
    ```
    **Explanation**: TTL indexes ensure compliance with data retention laws in regulated industries.

## Business Scenario-Based Challenges

36. **How do you design a schema for a ride-sharing platform with driver and passenger details?**  
    **Answer**: Use separate schemas for drivers and passengers, with a `Ride` schema linking them.  
    **Example**:  
    ```javascript
    const rideSchema = new Schema({
      driverId: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
      passengerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["requested", "ongoing", "completed"], default: "requested" },
      pickupLocation: String,
      dropoffLocation: String
    });
    rideSchema.index({ driverId: 1, status: 1 });
    const Ride = model("Ride", rideSchema);
    ```
    **Explanation**: This schema supports ride tracking and status updates for ride-sharing apps.

37. **How do you model a schema for a loyalty program with points and rewards?**  
    **Answer**: Use a user schema with an embedded points history and reference to rewards.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      points: { type: Number, default: 0 },
      pointsHistory: [{
        points: Number,
        action: String,
        timestamp: { type: Date, default: Date.now }
      }],
      redeemedRewards: [{ type: Schema.Types.ObjectId, ref: "Reward" }]
    });
    const User = model("User", userSchema);
    ```
    **Explanation**: This tracks loyalty points and redemptions for retail businesses.

38. **How do you design a schema for an inventory system with stock alerts?**  
    **Answer**: Add a `stockThreshold` field and use middleware to trigger alerts on low stock.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      name: String,
      stock: { type: Number, min: 0 },
      stockThreshold: { type: Number, default: 10 }
    });
    productSchema.pre("save", function(next) {
      if (this.isModified("stock") && this.stock < this.stockThreshold) {
        console.log(`Low stock alert: ${this.name}`);
      }
      next();
    });
    const Product = model("Product", productSchema);
    ```
    **Explanation**: This supports inventory management with automated restocking alerts.

39. **How do you model a schema for a job board with applications and statuses?**  
    **Answer**: Use separate schemas for jobs and applications, with references and status tracking.  
    **Example**:  
    ```javascript
    const applicationSchema = new Schema({
      jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["applied", "interview", "rejected"], default: "applied" }
    });
    applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });
    const Application = model("Application", applicationSchema);
    ```
    **Explanation**: This supports job application tracking for recruitment platforms.

40. **How do you design a schema for a restaurant reservation system?**  
    **Answer**: Use a schema with references to restaurants and users, and embedded time slots for reservations.  
    **Example**:  
    ```javascript
    const reservationSchema = new Schema({
      restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      time: { type: Date, required: true },
      partySize: { type: Number, min: 1 }
    });
    reservationSchema.index({ restaurantId: 1, time: 1 }, { unique: true });
    const Reservation = model("Reservation", reservationSchema);
    ```
    **Explanation**: This prevents double bookings and supports restaurant management.

## Advanced Aggregation Scenarios

41. **How do you use Mongoose aggregation to analyze customer churn in a subscription service?**  
    **Answer**: Group subscriptions by status and date to calculate churn rates.  
    **Example**:  
    ```javascript
    const churn = await Subscription.aggregate([
      {
        $match: { status: "canceled" }
      },
      {
        $group: {
          _id: { $month: "$endDate" },
          churnCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    ```
    **Explanation**: This provides churn metrics for business retention strategies.

42. **How do you calculate average response time for support tickets using Mongoose?**  
    **Answer**: Use `$lookup` to join tickets with responses and compute time differences.  
    **Example**:  
    ```javascript
    const avgResponse = await Ticket.aggregate([
      {
        $lookup: {
          from: "responses",
          localField: "_id",
          foreignField: "ticketId",
          as: "responses"
        }
      },
      { $unwind: "$responses" },
      {
        $group: {
          _id: null,
          avgTime: {
            $avg: { $subtract: ["$responses.createdAt", "$createdAt"] }
          }
        }
      }
    ]);
    ```
    **Explanation**: This measures support team efficiency in customer service systems.

43. **How do you use Mongoose aggregation to find popular products by region?**  
    **Answer**: Join orders with products and group by region and product.  
    **Example**:  
    ```javascript
    const popularProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: { region: "$region", productId: "$product._id" },
          count: { $sum: "$items.quantity" }
        }
      },
      { $sort: { count: -1 } }
    ]);
    ```
    **Explanation**: This identifies top-selling products for regional marketing.

44. **How do you aggregate user engagement metrics for a content platform?**  
    **Answer**: Group interactions by user and action type to measure engagement.  
    **Example**:  
    ```javascript
    const engagement = await Interaction.aggregate([
      {
        $group: {
          _id: { userId: "$userId", action: "$action" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.userId",
          actions: { $push: { action: "$_id.action", count: "$count" } }
        }
      }
    ]);
    ```
    **Explanation**: This provides insights into user behavior for content strategies.

45. **How do you use Mongoose aggregation to track inventory turnover rates?**  
    **Answer**: Calculate sales frequency by product using order data.  
    **Example**:  
    ```javascript
    const turnover = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          firstSale: { $min: "$createdAt" },
          lastSale: { $max: "$createdAt" }
        }
      },
      {
        $project: {
          turnoverRate: {
            $divide: ["$totalSold", { $subtract: ["$lastSale", "$firstSale"] }]
          }
        }
      }
    ]);
    ```
    **Explanation**: This helps optimize stock levels in inventory systems.

## Complex Business Scenarios

46. **How do you design a schema for a supply chain management system with multiple suppliers?**  
    **Answer**: Use references for suppliers and products, with embedded stock details.  
    **Example**:  
    ```javascript
    const supplySchema = new Schema({
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
      stock: { type: Number, min: 0 },
      lastUpdated: { type: Date, default: Date.now }
    });
    supplySchema.index({ productId: 1, supplierId: 1 }, { unique: true });
    const Supply = model("Supply", supplySchema);
    ```
    **Explanation**: This tracks supplier-specific inventory for supply chain efficiency.

47. **How do you model a schema for a multi-currency e-commerce platform?**  
    **Answer**: Embed currency-specific pricing in the product schema.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      name: String,
      prices: [{
        currency: { type: String, enum: ["USD", "EUR", "GBP"], required: true },
        amount: { type: Number, required: true }
      }]
    });
    productSchema.index({ "prices.currency": 1 });
    const Product = model("Product", productSchema);
    ```
    **Explanation**: This supports global sales with currency-specific pricing.

48. **How do you design a schema for a customer feedback system with ratings and comments?**  
    **Answer**: Use a separate `Feedback` schema with references to products and users.  
    **Example**:  
    ```javascript
    const feedbackSchema = new Schema({
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, min: 1, max: 5 },
      comment: String
    });
    feedbackSchema.index({ productId: 1 });
    const Feedback = model("Feedback", feedbackSchema);
    ```
    **Explanation**: This supports product reviews in e-commerce platforms.

49. **How do you model a schema for a time-tracking system for freelancers?**  
    **Answer**: Use a schema with embedded time entries linked to projects and users.  
    **Example**:  
    ```javascript
    const timeEntrySchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
      entries: [{
        startTime: { type: Date, required: true },
        endTime: Date,
        duration: Number
      }]
    });
    timeEntrySchema.index({ userId: 1, projectId: 1 });
    const TimeEntry = model("TimeEntry", timeEntrySchema);
    ```
    **Explanation**: This tracks billable hours for freelance platforms.

50. **How do you design a schema for a real-time auction system?**  
    **Answer**: Use a schema with bids embedded and references to users and items.  
    **Example**:  
    ```javascript
    const auctionSchema = new Schema({
      itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
      endTime: { type: Date, required: true },
      bids: [{
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now }
      }]
    });
    auctionSchema.index({ itemId: 1, endTime: 1 });
    const Auction = model("Auction", auctionSchema);
    ```
    **Explanation**: This supports real-time bidding in auction platforms.

## Advanced Validation and Middleware

51. **How do you validate nested objects in a Mongoose schema for a configuration management system?**  
    **Answer**: Use nested schemas with custom validators for nested fields.  
    **Example**:  
    ```javascript
    const configSchema = new Schema({
      settings: {
        theme: { type: String, enum: ["light", "dark"], required: true },
        notifications: {
          email: { type: Boolean, default: true },
          sms: { type: Boolean, default: false }
        }
      }
    });
    configSchema.path("settings.notifications").validate(function(value) {
      return value.email || value.sms;
    }, "At least one notification method must be enabled");
    const Config = model("Config", configSchema);
    ```
    **Explanation**: This ensures valid configurations in enterprise systems.

52. **How do you use Mongoose middleware to enforce business rules in a billing system?**  
    **Answer**: Use `pre` middleware to validate billing logic, like invoice totals.  
    **Example**:  
    ```javascript
    const invoiceSchema = new Schema({
      items: [{ price: Number, quantity: Number }],
      total: Number
    });
    invoiceSchema.pre("save", function(next) {
      this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      next();
    });
    const Invoice = model("Invoice", invoiceSchema);
    ```
    **Explanation**: This ensures accurate invoice totals in financial systems.

53. **How do you implement audit logging in a Mongoose schema for a compliance system?**  
    **Answer**: Use `post` middleware to log changes to a separate audit collection.  
    **Example**:  
    ```javascript
    const auditSchema = new Schema({
      documentId: Schema.Types.ObjectId,
      collection: String,
      changes: Schema.Types.Mixed
    });
    const userSchema = new Schema({ name: String, email: String });
    userSchema.post("save", async function(doc) {
      await Audit.create({
        documentId: doc._id,
        collection: "users",
        changes: doc.toObject()
      });
    });
    const User = model("User", userSchema);
    const Audit = model("Audit", auditSchema);
    ```
    **Explanation**: This ensures compliance with audit requirements in regulated industries.

54. **How do you enforce unique constraints in a nested array for a project task schema?**  
    **Answer**: Use a custom validator to check uniqueness within the array.  
    **Example**:  
    ```javascript
    const projectSchema = new Schema({
      name: String,
      tasks: [{
        title: String,
        _id: false
      }]
    });
    projectSchema.path("tasks").validate(function(tasks) {
      const titles = tasks.map(task => task.title);
      return titles.length === new Set(titles).size;
    }, "Duplicate task titles not allowed");
    const Project = model("Project", projectSchema);
    ```
    **Explanation**: This ensures unique tasks in project management systems.

55. **How do you use Mongoose middleware to prevent overlapping bookings in a reservation system?**  
    **Answer**: Use `pre` middleware to check for conflicts before saving.  
    **Example**:  
    ```javascript
    const reservationSchema = new Schema({
      resourceId: { type: Schema.Types.ObjectId, ref: "Resource" },
      startTime: Date,
      endTime: Date
    });
    reservationSchema.pre("save", async function(next) {
      const conflict = await this.constructor.findOne({
        resourceId: this.resourceId,
        startTime: { $lt: this.endTime },
        endTime: { $gt: this.startTime }
      });
      if (conflict) return next(new Error("Overlapping reservation"));
      next();
    });
    const Reservation = model("Reservation", reservationSchema);
    ```
    **Explanation**: This prevents double bookings in event or resource management systems.

## Advanced Relationships

56. **How do you model a schema for a marketplace with buyer-seller transactions?**  
    **Answer**: Use a `Transaction` schema with references to buyers, sellers, and products.  
    **Example**:  
    ```javascript
    const transactionSchema = new Schema({
      buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      amount: Number
    });
    transactionSchema.index({ buyerId: 1, sellerId: 1 });
    const Transaction = model("Transaction", transactionSchema);
    ```
    **Explanation**: This supports secure transaction tracking in marketplaces.

57. **How do you design a schema for a content sharing platform with permissions?**  
    **Answer**: Use a schema with an embedded permissions array for granular access control.  
    **Example**:  
    ```javascript
    const contentSchema = new Schema({
      title: String,
      ownerId: { type: Schema.Types.ObjectId, ref: "User" },
      permissions: [{
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["read", "write"], required: true }
      }]
    });
    contentSchema.index({ ownerId: 1 });
    const Content = model("Content", contentSchema);
    ```
    **Explanation**: This supports collaborative content platforms with fine-grained access.

58. **How do you model a schema for a project portfolio with milestones and tasks?**  
    **Answer**: Use nested schemas for milestones and tasks with references to projects.  
    **Example**:  
    ```javascript
    const projectSchema = new Schema({
      name: String,
      milestones: [{
        title: String,
        tasks: [{
          description: String,
          status: { type: String, enum: ["pending", "completed"], default: "pending" }
        }]
      }]
    });
    const Project = model("Project", projectSchema);
    ```
    **Explanation**: This organizes complex project structures for portfolio management.

59. **How do you handle polymorphic relationships in a Mongoose schema for a notification system?**  
    **Answer**: Use a generic reference with a `refPath` to support multiple model types.  
    **Example**:  
    ```javascript
    const notificationSchema = new Schema({
      recipientId: { type: Schema.Types.ObjectId, ref: "User" },
      target: {
        type: Schema.Types.ObjectId,
        refPath: "targetModel"
      },
      targetModel: { type: String, enum: ["Post", "Comment"], required: true }
    });
    const Notification = model("Notification", notificationSchema);
    ```
    **Explanation**: This supports notifications for various entities in social platforms.

60. **How do you model a schema for a referral program with tracking?**  
    **Answer**: Use a schema with references to referrers and referees, tracking rewards.  
    **Example**:  
    ```javascript
    const referralSchema = new Schema({
      referrerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      refereeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      reward: { type: Number, default: 0 },
      status: { type: String, enum: ["pending", "completed"], default: "pending" }
    });
    referralSchema.index({ referrerId: 1, refereeId: 1 }, { unique: true });
    const Referral = model("Referral", referralSchema);
    ```
    **Explanation**: This tracks referrals for marketing campaigns.

## Performance Optimization

61. **How do you optimize Mongoose queries for a high-traffic e-commerce API?**  
    **Answer**: Use lean queries, selective fields, and indexes to reduce overhead.  
    **Example**:  
    ```javascript
    const products = await Product.find({ category: "electronics" })
      .select("name price")
      .lean();
    ```
    **Explanation**: This minimizes response time for product listings.

62. **How do you use Mongoose batch updates for inventory adjustments?**  
    **Answer**: Use `bulkWrite` to perform multiple updates efficiently.  
    **Example**:  
    ```javascript
    const operations = [
      { updateOne: { filter: { _id: productId1 }, update: { $inc: { stock: -1 } } } },
      { updateOne: { filter: { _id: productId2 }, update: { $inc: { stock: -2 } } } }
    ];
    await Product.bulkWrite(operations);
    ```
    **Explanation**: Batch updates reduce database round-trips in inventory systems.

63. **How do you implement caching with Mongoose for a dashboard API?**  
    **Answer**: Use Redis or an in-memory cache to store frequent query results.  
    **Example**:  
    ```javascript
    const redis = require("redis");
    const client = redis.createClient();
    const cacheKey = "dashboard:stats";
    const stats = await client.get(cacheKey);
    if (stats) return JSON.parse(stats);
    const data = await Order.aggregate([...]);
    await client.setEx(cacheKey, 3600, JSON.stringify(data));
    ```
    **Explanation**: Caching improves dashboard performance in analytics platforms.

64. **How do you use Mongoose to handle geospatial queries for a delivery system?**  
    **Answer**: Use a `2dsphere` index for location-based queries.  
    **Example**:  
    ```javascript
    const storeSchema = new Schema({
      name: String,
      location: { type: { type: String, enum: ["Point"] }, coordinates: [Number] }
    });
    storeSchema.index({ location: "2dsphere" });
    const Store = model("Store", storeSchema);
    const nearby = await Store.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 10000
        }
      }
    });
    ```
    **Explanation**: Geospatial queries optimize delivery routing in logistics.

65. **How do you optimize Mongoose schema design for time-series data in IoT?**  
    **Answer**: Use a schema with time-based bucketing to reduce document size.  
    **Example**:  
    ```javascript
    const sensorSchema = new Schema({
      deviceId: String,
      timestamp: Date,
      readings: [{ value: Number, time: Date }]
    });
    sensorSchema.index({ deviceId: 1, timestamp: 1 });
    const Sensor = model("Sensor", sensorSchema);
    ```
    **Explanation**: Bucketing optimizes storage for high-frequency IoT data.

## Security Scenarios

66. **How do you secure a Mongoose schema for a banking system?**  
    **Answer**: Encrypt sensitive fields and use transactions for critical operations.  
    **Example**:  
    ```javascript
    const accountSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      balance: { type: Number, encrypt: true }
    });
    accountSchema.plugin(require("mongoose-encryption"), { encryptionKey: "key" });
    const Account = model("Account", accountSchema);
    ```
    **Explanation**: Encryption and transactions ensure secure banking operations.

67. **How do you implement data masking in a Mongoose schema for a CRM?**  
    **Answer**: Use getters to mask sensitive fields like emails.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      email: {
        type: String,
        get: v => v.replace(/(.{2}).*@/, "$1***@")
      }
    }, { toJSON: { getters: true } });
    const User = model("User", userSchema);
    ```
    **Explanation**: Masking protects PII in CRM data exports.

68. **How do you prevent injection attacks in Mongoose queries for an API?**  
    **Answer**: Use Mongoose’s built-in sanitization and avoid raw MongoDB operators with user input.  
    **Example**:  
    ```javascript
    const safeQuery = await User.find({ name: { $eq: req.query.name } });
    ```
    **Explanation**: Sanitized queries prevent injection in public APIs.

69. **How do you enforce data access policies in a Mongoose schema for a multi-user app?**  
    **Answer**: Use query middleware to filter data based on user roles.  
    **Example**:  
    ```javascript
    const documentSchema = new Schema({
      ownerId: { type: Schema.Types.ObjectId, ref: "User" },
      content: String
    });
    documentSchema.pre("find", function(next) {
      this.where({ ownerId: this.options.userId });
      next();
    });
    const Document = model("Document", documentSchema);
    ```
    **Explanation**: This ensures users only access their own data in collaborative apps.

70. **How do you audit sensitive operations in a Mongoose schema for a financial app?**  
    **Answer**: Log operations using a separate audit collection in middleware.  
    **Example**:  
    ```javascript
    const transactionSchema = new Schema({
      amount: Number,
      userId: { type: Schema.Types.ObjectId, ref: "User" }
    });
    transactionSchema.post("save", async function(doc) {
      await Audit.create({ action: "transaction", documentId: doc._id });
    });
    const Transaction = model("Transaction", transactionSchema);
    ```
    **Explanation**: Auditing ensures compliance in financial systems.

## Complex Business Scenarios

71. **How do you design a schema for a crowdfunding platform with pledges and rewards?**  
    **Answer**: Use a schema with embedded pledges and references to rewards.  
    **Example**:  
    ```javascript
    const campaignSchema = new Schema({
      title: String,
      pledges: [{
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        amount: Number,
        rewardId: { type: Schema.Types.ObjectId, ref: "Reward" }
      }]
    });
    campaignSchema.index({ "pledges.userId": 1 });
    const Campaign = model("Campaign", campaignSchema);
    ```
    **Explanation**: This supports crowdfunding campaign tracking.

72. **How do you model a schema for a multi-vendor marketplace with ratings?**  
    **Answer**: Use separate schemas for vendors and ratings with references.  
    **Example**:  
    ```javascript
    const vendorSchema = new Schema({
      name: String
    });
    const ratingSchema = new Schema({
      vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
      rating: { type: Number, min: 1, max: 5 }
    });
    ratingSchema.index({ vendorId: 1 });
    const Vendor = model("Vendor", vendorSchema);
    const Rating = model("Rating", ratingSchema);
    ```
    **Explanation**: This supports vendor performance tracking in marketplaces.

73. **How do you design a schema for a healthcare appointment system?**  
    **Answer**: Use a schema with references to doctors and patients, and time slots.  
    **Example**:  
    ```javascript
    const appointmentSchema = new Schema({
      doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
      patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
      time: { type: Date, required: true }
    });
    appointmentSchema.index({ doctorId: 1, time: 1 }, { unique: true });
    const Appointment = model("Appointment", appointmentSchema);
    ```
    **Explanation**: This prevents double bookings in healthcare systems.

74. **How do you model a schema for a real-time chat system with message threads?**  
    **Answer**: Use a schema with embedded messages and references to users.  
    **Example**:  
    ```javascript
    const chatSchema = new Schema({
      participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
      messages: [{
        senderId: { type: Schema.Types.ObjectId, ref: "User" },
        content: String,
        timestamp: { type: Date, default: Date.now }
      }]
    });
    chatSchema.index({ participants: 1 });
    const Chat = model("Chat", chatSchema);
    ```
    **Explanation**: This supports threaded conversations in chat apps.

75. **How do you design a schema for a task automation system with dependencies?**  
    **Answer**: Use a schema with references to dependent tasks.  
    **Example**:  
    ```javascript
    const taskSchema = new Schema({
      name: String,
      dependencies: [{ type: Schema.Types.ObjectId, ref: "Task" }],
      status: { type: String, enum: ["pending", "completed"], default: "pending" }
    });
    taskSchema.index({ dependencies: 1 });
    const Task = model("Task", taskSchema);
    ```
    **Explanation**: This supports workflows with task dependencies in automation systems.

## Advanced Aggregation and Reporting

76. **How do you use Mongoose aggregation to generate sales reports by region?**  
    **Answer**: Group orders by region and sum totals.  
    **Example**:  
    ```javascript
    const salesReport = await Order.aggregate([
      {
        $group: {
          _id: "$region",
          totalSales: { $sum: "$total" }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);
    ```
    **Explanation**: This provides regional sales insights for business planning.

77. **How do you calculate customer lifetime value using Mongoose aggregation?**  
    **Answer**: Sum all orders per user over their account duration.  
    **Example**:  
    ```javascript
    const clv = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$total" },
          firstOrder: { $min: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          clv: {
            $divide: ["$totalSpent", { $subtract: [new Date(), "$firstOrder"] }]
          }
        }
      }
    ]);
    ```
    **Explanation**: This calculates CLV for targeted marketing strategies.

78. **How do you use Mongoose to track user retention rates?**  
    **Answer**: Aggregate user activity by cohort to measure retention.  
    **Example**:  
    ```javascript
    const retention = await UserActivity.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          activeUsers: { $addToSet: "$userId" }
        }
      },
      {
        $project: {
          month: "$_id",
          activeCount: { $size: "$activeUsers" }
        }
      }
    ]);
    ```
    **Explanation**: This tracks user engagement for subscription platforms.

79. **How do you aggregate order fulfillment times in a logistics system?**  
    **Answer**: Calculate time differences between order creation and delivery.  
    **Example**:  
    ```javascript
    const fulfillment = await Order.aggregate([
      {
        $match: { status: "delivered" }
      },
      {
        $project: {
          timeToFulfill: { $subtract: ["$updatedAt", "$createdAt"] }
        }
      },
      {
        $group: {
          _id: null,
          avgTime: { $avg: "$timeToFulfill" }
        }
      }
    ]);
    ```
    **Explanation**: This optimizes logistics operations by analyzing delivery efficiency.

80. **How do you use Mongoose aggregation to detect fraud in transactions?**  
    **Answer**: Flag transactions with unusual patterns, like high amounts or frequency.  
    **Example**:  
    ```javascript
    const fraudCheck = await Transaction.aggregate([
      {
        $group: {
          _id: "$userId",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $match: {
          $or: [{ count: { $gt: 10 } }, { totalAmount: { $gt: 10000 } }]
        }
      }
    ]);
    ```
    **Explanation**: This identifies potential fraud for financial systems.

## Complex Optimization Scenarios

81. **How do you optimize Mongoose for a real-time analytics dashboard?**  
    **Answer**: Use aggregation pipelines with caching and lean queries.  
    **Example**:  
    ```javascript
    const stats = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]).cache(3600); // Redis caching
    ```
    **Explanation**: This ensures fast data retrieval for real-time dashboards.

82. **How do you handle schema evolution in a Mongoose-based CRM?**  
    **Answer**: Use versioning and migrations to add new fields without breaking existing data.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      version: { type: Number, default: 1 },
      newField: { type: String, default: "default" }
    });
    const User = model("User", userSchema);
    ```
    **Explanation**: Schema evolution supports CRM upgrades without data loss.

83. **How do you optimize Mongoose for a high-read news feed API?**  
    **Answer**: Use projections, indexes, and caching for frequently accessed posts.  
    **Example**:  
    ```javascript
    const postSchema = new Schema({ title: String, content: String });
    postSchema.index({ createdAt: -1 });
    const Post = model("Post", postSchema);
    const posts = await Post.find().select("title").sort({ createdAt: -1 }).lean();
    ```
    **Explanation**: This ensures fast news feed rendering in social platforms.

84. **How do you implement rate limiting in Mongoose for an API?**  
    **Answer**: Track API usage with a schema and limit requests.  
    **Example**:  
    ```javascript
    const rateLimitSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      count: Number,
      resetTime: Date
    });
    rateLimitSchema.index({ userId: 1, resetTime: 1 });
    const RateLimit = model("RateLimit", rateLimitSchema);
    ```
    **Explanation**: This protects APIs from abuse in high-traffic systems.

85. **How do you use Mongoose to handle large-scale event logging?**  
    **Answer**: Use a capped collection for fixed-size logs.  
    **Example**:  
    ```javascript
    const logSchema = new Schema({
      message: String,
      timestamp: Date
    }, { capped: { size: 1024 * 1024, max: 1000 } });
    const Log = model("Log", logSchema);
    ```
    **Explanation**: Capped collections optimize storage for event logs.

## Real-World Business Scenarios

86. **How do you design a schema for a subscription box service with customizable items?**  
    **Answer**: Use embedded arrays for item selections with references to products.  
    **Example**:  
    ```javascript
    const subscriptionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" }, quantity: Number }]
    });
    const Subscription = model("Subscription", subscriptionSchema);
    ```
    **Explanation**: This supports personalized subscription boxes in retail.

87. **How do you model a schema for a real estate platform with property listings?**  
    **Answer**: Use a schema with embedded features and location data.  
    **Example**:  
    ```javascript
    const propertySchema = new Schema({
      address: String,
      location: { type: { type: String, enum: ["Point"] }, coordinates: [Number] },
      features: [{ name: String, value: String }]
    });
    propertySchema.index({ location: "2dsphere" });
    const Property = model("Property", propertySchema);
    ```
    **Explanation**: This supports property searches with geospatial filtering.

88. **How do you design a schema for a fitness app with workout plans?**  
    **Answer**: Use nested schemas for workouts and exercises.  
    **Example**:  
    ```javascript
    const planSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      workouts: [{
        name: String,
        exercises: [{ name: String, reps: Number, sets: Number }]
      }]
    });
    const Plan = model("Plan", planSchema);
    ```
    **Explanation**: This organizes workout plans for fitness apps.

89. **How do you model a schema for a travel booking system with itineraries?**  
    **Answer**: Use embedded itineraries with references to flights and hotels.  
    **Example**:  
    ```javascript
    const bookingSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      itinerary: [{
        flightId: { type: Schema.Types.ObjectId, ref: "Flight" },
        hotelId: { type: Schema.Types.ObjectId, ref: "Hotel" }
      }]
    });
    const Booking = model("Booking", bookingSchema);
    ```
    **Explanation**: This supports complex travel itineraries.

90. **How do you design a schema for a customer loyalty program with tiered benefits?**  
    **Answer**: Use a schema with tier levels and points tracking.  
    **Example**:  
    ```javascript
    const loyaltySchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      points: Number,
      tier: { type: String, enum: ["bronze", "silver", "gold"], default: "bronze" }
    });
    const Loyalty = model("Loyalty", loyaltySchema);
    ```
    **Explanation**: This supports tiered rewards in retail loyalty programs.

## Advanced Security and Compliance

91. **How do you implement GDPR-compliant data deletion in Mongoose?**  
    **Answer**: Use soft deletion with anonymization of PII.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      email: String,
      deletedAt: Date
    });
    userSchema.pre("deleteOne", async function(next) {
      await this.updateOne({ name: "Deleted", email: "deleted@example.com", deletedAt: new Date() });
      next();
    });
    const User = model("User", userSchema);
    ```
    **Explanation**: This ensures GDPR compliance by anonymizing user data.

92. **How do you secure Mongoose queries for a public API?**  
    **Answer**: Use strict field selection and sanitization.  
    **Example**:  
    ```javascript
    const users = await User.find().select("name -_id").lean();
    ```
    **Explanation**: This prevents exposure of sensitive fields in public APIs.

93. **How do you implement data encryption at rest in Mongoose?**  
    **Answer**: Use MongoDB’s client-side field-level encryption or plugins.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      ssn: { type: String, encrypt: true }
    });
    userSchema.plugin(require("mongoose-encryption"), { encryptionKey: "key" });
    const User = model("User", userSchema);
    ```
    **Explanation**: This secures sensitive data in regulated industries.

94. **How do you audit schema changes in a Mongoose-based system?**  
    **Answer**: Use a version history schema to track schema updates.  
    **Example**:  
    ```javascript
    const versionSchema = new Schema({
      collection: String,
      version: Number,
      changes: Schema.Types.Mixed
    });
    const Version = model("Version", versionSchema);
    ```
    **Explanation**: This ensures traceability for schema changes in enterprise systems.

95. **How do you enforce data integrity in a Mongoose schema for a payment gateway?**  
    **Answer**: Use transactions and validation to ensure consistent payments.  
    **Example**:  
    ```javascript
    const paymentSchema = new Schema({
      amount: { type: Number, required: true, min: 0 },
      status: { type: String, enum: ["pending", "completed"], default: "pending" }
    });
    const Payment = model("Payment", paymentSchema);
    ```
    **Explanation**: This ensures reliable payment processing.

## Final Scenarios

96. **How do you design a schema for a voting system with secure vote tracking?**  
    **Answer**: Use a schema with encrypted votes and references to users.  
    **Example**:  
    ```javascript
    const voteSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      candidateId: { type: Schema.Types.ObjectId, ref: "Candidate" },
      vote: { type: String, encrypt: true }
    });
    voteSchema.plugin(require("mongoose-encryption"), { encryptionKey: "key" });
    const Vote = model("Vote", voteSchema);
    ```
    **Explanation**: This ensures secure and anonymous voting.

97. **How do you model a schema for a subscription analytics platform?**  
    **Answer**: Track subscription metrics with embedded analytics data.  
    **Example**:  
    ```javascript
    const subscriptionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      metrics: [{
        month: Number,
        revenue: Number
      }]
    });
    const Subscription = model("Subscription", subscriptionSchema);
    ```
    **Explanation**: This supports subscription analytics for business insights.

98. **How do you design a schema for a document management system with version control?**  
    **Answer**: Use a schema with embedded version history.  
    **Example**:  
    ```javascript
    const documentSchema = new Schema({
      title: String,
      versions: [{
        content: String,
        version: Number,
        timestamp: Date
      }]
    });
    const Document = model("Document", documentSchema);
    ```
    **Explanation**: This supports document versioning in collaborative systems.

99. **How do you model a schema for a supply chain traceability system?**  
    **Answer**: Use a schema with embedded traceability events.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      name: String,
      traceability: [{
        event: String,
        location: String,
        timestamp: Date
      }]
    });
    const Product = model("Product", productSchema);
    ```
    **Explanation**: This tracks product movement in supply chains.

100. **How do you design a schema for a multi-tenant analytics platform?**  
     **Answer**: Use a `tenantId` with embedded analytics data and indexes.  
     **Example**:  
     ```javascript
     const analyticsSchema = new Schema({
       tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
       metrics: [{
         key: String,
         value: Number,
         timestamp: Date
       }]
     });
     analyticsSchema.index({ tenantId: 1, "metrics.key": 1 });
     const Analytics = model("Analytics", analyticsSchema);
     ```
     **Explanation**: This supports isolated analytics for SaaS platforms.