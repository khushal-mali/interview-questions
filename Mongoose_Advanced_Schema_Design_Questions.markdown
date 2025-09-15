# 100 Advanced Mongoose Interview Questions on Complex Schema Design for Business Scenarios

## Schema Design for Business Workflows

1. **How do you design a Mongoose schema for a project management system with task dependencies and milestones?**  
   **Answer**: Use a schema with embedded milestones and tasks, referencing dependent tasks for workflow tracking.  
   **Example**:  
   ```javascript
   const projectSchema = new Schema({
     name: { type: String, required: true },
     milestones: [{
       name: String,
       tasks: [{
         title: String,
         dependencies: [{ type: Schema.Types.ObjectId, ref: "Project.tasks" }],
         status: { type: String, enum: ["pending", "completed"], default: "pending" }
       }]
     }]
   });
   projectSchema.index({ "milestones.tasks._id": 1 });
   const Project = model("Project", projectSchema);
   ```
   **Explanation**: This schema supports complex project workflows with task dependencies, ideal for project management tools.

2. **How would you model a schema for a retail system with dynamic pricing based on customer segments?**  
   **Answer**: Use an embedded array for pricing rules tied to customer segments.  
   **Example**:  
   ```javascript
   const productSchema = new Schema({
     name: String,
     pricing: [{
       segment: { type: String, enum: ["premium", "standard"], required: true },
       price: { type: Number, required: true }
     }]
   });
   productSchema.index({ "pricing.segment": 1 });
   const Product = model("Product", productSchema);
   ```
   **Explanation**: This enables personalized pricing for retail customers based on their segment.

3. **How do you design a schema for a customer support system with ticket escalation rules?**  
   **Answer**: Include an embedded array for escalation history and rules for automatic escalation.  
   **Example**:  
   ```javascript
   const ticketSchema = new Schema({
     title: String,
     priority: { type: String, enum: ["low", "high"], default: "low" },
     escalations: [{
       level: { type: String, enum: ["team", "manager"], required: true },
       timestamp: { type: Date, default: Date.now }
     }]
   });
   ticketSchema.pre("save", function(next) {
     if (this.isModified("priority") && this.priority === "high") {
       this.escalations.push({ level: "manager" });
     }
     next();
   });
   const Ticket = model("Ticket", ticketSchema);
   ```
   **Explanation**: This automates ticket escalation in support systems for timely resolution.

4. **How would you model a schema for a subscription service with tiered access levels?**  
   **Answer**: Use a schema with a tier field and embedded permissions for access control.  
   **Example**:  
   ```javascript
   const subscriptionSchema = new Schema({
     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
     tier: { type: String, enum: ["basic", "pro", "enterprise"], required: true },
     permissions: [{ feature: String, allowed: Boolean }]
   });
   subscriptionSchema.index({ userId: 1, tier: 1 });
   const Subscription = model("Subscription", subscriptionSchema);
   ```
   **Explanation**: This supports tiered access in SaaS platforms, controlling feature availability.

5. **How do you design a schema for a warehouse management system with location-based inventory?**  
   **Answer**: Use a schema with embedded location data and stock levels for each warehouse.  
   **Example**:  
   ```javascript
   const inventorySchema = new Schema({
     productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
     warehouse: {
       location: { type: String, required: true },
       stock: { type: Number, min: 0 }
     }
   });
   inventorySchema.index({ productId: 1, "warehouse.location": 1 }, { unique: true });
   const Inventory = model("Inventory", inventorySchema);
   ```
   **Explanation**: This tracks inventory across multiple warehouse locations for logistics efficiency.

## Advanced Relationship Modeling

6. **How do you model a schema for a social platform with nested comment threads?**  
   **Answer**: Use a recursive schema for comments with a `parentId` for threading.  
   **Example**:  
   ```javascript
   const commentSchema = new Schema({
     postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
     content: String,
     parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null }
   }, { timestamps: true });
   commentSchema.index({ postId: 1, parentId: 1 });
   const Comment = model("Comment", commentSchema);
   ```
   **Explanation**: This supports threaded discussions in social media platforms.

7. **How do you design a schema for a B2B platform with company-to-user relationships?**  
   **Answer**: Use references for companies and users with a role-based structure.  
   **Example**:  
   ```javascript
   const companySchema = new Schema({
     name: String,
     users: [{
       userId: { type: Schema.Types.ObjectId, ref: "User" },
       role: { type: String, enum: ["admin", "member"], required: true }
     }]
   });
   companySchema.index({ "users.userId": 1 });
   const Company = model("Company", companySchema);
   ```
   **Explanation**: This supports B2B platforms with role-based access for company users.

8. **How do you model a schema for a marketplace with buyer-seller negotiations?**  
   **Answer**: Use a schema for negotiations with references to offers and counteroffers.  
   **Example**:  
   ```javascript
   const negotiationSchema = new Schema({
     buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
     sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
     productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
     offers: [{
       amount: Number,
       proposerId: { type: Schema.Types.ObjectId, ref: "User" },
       timestamp: Date
     }]
   });
   negotiationSchema.index({ buyerId: 1, sellerId: 1, productId: 1 });
   const Negotiation = model("Negotiation", negotiationSchema);
   ```
   **Explanation**: This tracks negotiation history for marketplace transactions.

9. **How do you design a schema for a learning management system with course prerequisites?**  
   **Answer**: Use a schema with references to prerequisite courses.  
   **Example**:  
   ```javascript
   const courseSchema = new Schema({
     title: String,
     prerequisites: [{ type: Schema.Types.ObjectId, ref: "Course" }],
     enrolledUsers: [{ type: Schema.Types.ObjectId, ref: "User" }]
   });
   courseSchema.index({ prerequisites: 1 });
   const Course = model("Course", courseSchema);
   ```
   **Explanation**: This ensures students complete prerequisites before enrolling.

10. **How do you model a schema for a supply chain system with multi-stage tracking?**  
    **Answer**: Use embedded stages with references to suppliers and products.  
    **Example**:  
    ```javascript
    const supplyChainSchema = new Schema({
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      stages: [{
        supplierId: { type: Schema.Types.ObjectId, ref: "Supplier" },
        stage: String,
        timestamp: Date
      }]
    });
    supplyChainSchema.index({ productId: 1 });
    const SupplyChain = model("SupplyChain", supplyChainSchema);
    ```
    **Explanation**: This tracks product movement through supply chain stages.

## Advanced Validation and Middleware

11. **How do you enforce business hours in a Mongoose schema for a booking system?**  
    **Answer**: Use a custom validator to restrict bookings to business hours.  
    **Example**:  
    ```javascript
    const bookingSchema = new Schema({
      time: {
        type: Date,
        required: true,
        validate: {
          validator: v => v.getHours() >= 9 && v.getHours() <= 17,
          message: "Bookings must be between 9 AM and 5 PM"
        }
      }
    });
    const Booking = model("Booking", bookingSchema);
    ```
    **Explanation**: This ensures bookings align with business hours in service industries.

12. **How do you use Mongoose middleware to enforce inventory limits in a retail system?**  
    **Answer**: Use `pre` middleware to check stock before saving orders.  
    **Example**:  
    ```javascript
    const orderSchema = new Schema({
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    });
    orderSchema.pre("save", async function(next) {
      const product = await Product.findById(this.productId);
      if (product.stock < this.quantity) {
        return next(new Error("Insufficient stock"));
      }
      await Product.updateOne({ _id: this.productId }, { $inc: { stock: -this.quantity } });
      next();
    });
    const Order = model("Order", orderSchema);
    ```
    **Explanation**: This prevents overselling in e-commerce platforms.

13. **How do you implement conditional validation in a Mongoose schema for a payment system?**  
    **Answer**: Use a custom validator based on payment type.  
    **Example**:  
    ```javascript
    const paymentSchema = new Schema({
      type: { type: String, enum: ["card", "wallet"], required: true },
      cardNumber: {
        type: String,
        required: function() { return this.type === "card"; },
        validate: {
          validator: v => /^\d{16}$/.test(v),
          message: "Invalid card number"
        }
      }
    });
    const Payment = model("Payment", paymentSchema);
    ```
    **Explanation**: This ensures valid payment details based on type.

14. **How do you use Mongoose middleware to log user activity in a CRM system?**  
    **Answer**: Use `post` middleware to log updates to a separate activity collection.  
    **Example**:  
    ```javascript
    const activitySchema = new Schema({
      userId: Schema.Types.ObjectId,
      action: String
    });
    ACTIVITY_SCHEMA
    const userSchema = new Schema({ name: String, email: String });
    userSchema.post("save", async function(doc) {
      await Activity.create({ userId: doc._id, action: "updated" });
    });
    const User = model("User", userSchema);
    const Activity = model("Activity", activitySchema);
    ```
    **Explanation**: This tracks user changes for CRM audit trails.

15. **How do you enforce unique constraints on nested fields in a Mongoose schema for a scheduling system?**  
    **Answer**: Use a custom validator to ensure unique nested fields.  
    **Example**:  
    ```javascript
    const scheduleSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      slots: [{
        startTime: Date,
        _id: false
      }]
    });
    scheduleSchema.path("slots").validate(function(slots) {
      const times = slots.map(slot => slot.startTime.getTime());
      return times.length === new Set(times).size;
    }, "Duplicate time slots not allowed");
    const Schedule = model("Schedule", scheduleSchema);
    ```
    **Explanation**: This prevents duplicate bookings in scheduling systems.

## Performance and Query Optimization

16. **How do you optimize Mongoose queries for a high-traffic e-commerce search API?**  
    **Answer**: Use text indexes and lean queries to reduce overhead.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({ name: String, description: String });
    productSchema.index({ name: "text", description: "text" });
    const Product = model("Product", productSchema);
    const results = await Product.find({ $text: { $search: "laptop" } })
      .select("name price")
      .lean();
    ```
    **Explanation**: This ensures fast searches in e-commerce platforms.

17. **How do you use Mongoose aggregation to calculate inventory turnover in a retail system?**  
    **Answer**: Aggregate order data to compute turnover rates.  
    **Example**:  
    ```javascript
    const turnover = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          period: { $subtract: [{ $max: "$createdAt" }, { $min: "$createdAt" }] }
        }
      },
      {
        $project: {
          turnoverRate: { $divide: ["$totalSold", "$period"] }
        }
      }
    ]);
    ```
    **Explanation**: This optimizes inventory management by analyzing stock movement.

18. **How do you implement efficient pagination in a Mongoose-based API for user lists?**  
    **Answer**: Use `skip` and `limit` with indexes on sorted fields.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({ name: String, createdAt: Date });
    userSchema.index({ createdAt: -1 });
    const User = model("User", userSchema);
    const page = 2, limit = 10;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    ```
    **Explanation**: This ensures scalable user listings in admin dashboards.

19. **How do you use Mongoose to handle geospatial queries for a delivery tracking system?**  
    **Answer**: Use a `2dsphere` index for location-based searches.  
    **Example**:  
    ```javascript
    const deliverySchema = new Schema({
      driverId: { type: Schema.Types.ObjectId, ref: "User" },
      location: { type: { type: String, enum: ["Point"] }, coordinates: [Number] }
    });
    deliverySchema.index({ location: "2dsphere" });
    const Delivery = model("Delivery", deliverySchema);
    const nearby = await Delivery.find({
      location: {
        $near: { $geometry: { type: "Point", coordinates: [lng, lat] }, $maxDistance: 5000 }
      }
    });
    ```
    **Explanation**: This optimizes delivery tracking in logistics platforms.

20. **How do you optimize Mongoose for a time-series analytics system?**  
    **Answer**: Use time-based bucketing with TTL indexes for efficient storage.  
    **Example**:  
    ```javascript
    const metricSchema = new Schema({
      timestamp: { type: Date, expires: "30d" },
      value: Number
    });
    metricSchema.index({ timestamp: 1 });
    const Metric = model("Metric", metricSchema);
    ```
    **Explanation**: This manages high-frequency analytics data in IoT or monitoring systems.

## Security and Compliance

21. **How do you implement data encryption in a Mongoose schema for a healthcare system?**  
    **Answer**: Use a plugin like `mongoose-encryption` for sensitive fields.  
    **Example**:  
    ```javascript
    const patientSchema = new Schema({
      name: String,
      medicalId: { type: String, encrypt: true }
    });
    patientSchema.plugin(require("mongoose-encryption"), { encryptionKey: "key1", signingKey: "key2" });
    const Patient = model("Patient", patientSchema);
    ```
    **Explanation**: This ensures HIPAA-compliant data protection.

22. **How do you enforce GDPR-compliant data anonymization in Mongoose?**  
    **Answer**: Use soft deletion with anonymization in middleware.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      email: String,
      deletedAt: Date
    });
    userSchema.pre("deleteOne", async function(next) {
      await this.updateOne({ name: "Anonymized", email: "deleted@example.com", deletedAt: new Date() });
      next();
    });
    const User = model("User", userSchema);
    ```
    **Explanation**: This complies with GDPR’s right to be forgotten.

23. **How do you secure Mongoose queries for a public-facing API?**  
    **Answer**: Use strict field selection and sanitization to prevent data leaks.  
    **Example**:  
    ```javascript
    const users = await User.find().select("name -_id").lean();
    ```
    **Explanation**: This limits exposure of sensitive fields in APIs.

24. **How do you implement role-based access control in a Mongoose schema for an enterprise app?**  
    **Answer**: Use middleware to filter data by user role.  
    **Example**:  
    ```javascript
    const documentSchema = new Schema({
      ownerId: { type: Schema.Types.ObjectId, ref: "User" },
      content: String,
      visibility: { type: String, enum: ["public", "private"], default: "private" }
    });
    documentSchema.pre("find", function(next) {
      if (this.options.userRole !== "admin") {
        this.where({ $or: [{ visibility: "public" }, { ownerId: this.options.userId }] });
      }
      next();
    });
    const Document = model("Document", documentSchema);
    ```
    **Explanation**: This restricts access in enterprise document systems.

25. **How do you audit sensitive operations in a Mongoose schema for a financial system?**  
    **Answer**: Log operations to a separate audit collection using middleware.  
    **Example**:  
    ```javascript
    const transactionSchema = new Schema({
      amount: Number,
      userId: { type: Schema.Types.ObjectId, ref: "User" }
    });
    transactionSchema.post("save", async function(doc) {
      await Audit.create({ action: "transaction", documentId: doc._id, details: { amount: doc.amount } });
    });
    const Transaction = model("Transaction", transactionSchema);
    const Audit = model("Audit", new Schema({ action: String, documentId: Schema.Types.ObjectId, details: Schema.Types.Mixed }));
    ```
    **Explanation**: This ensures compliance with financial regulations.

## Advanced Business Scenarios

26. **How do you design a schema for a job scheduling system with recurring tasks?**  
    **Answer**: Use a schema with recurrence rules and task details.  
    **Example**:  
    ```javascript
    const taskSchema = new Schema({
      name: String,
      recurrence: {
        frequency: { type: String, enum: ["daily", "weekly"], required: true },
        interval: Number
      },
      lastRun: Date
    });
    taskSchema.index({ lastRun: 1 });
    const Task = model("Task", taskSchema);
    ```
    **Explanation**: This supports automated task scheduling in workflow systems.

27. **How do you model a schema for a loyalty program with gamified rewards?**  
    **Answer**: Include points and badges with references to users.  
    **Example**:  
    ```javascript
    const loyaltySchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      points: { type: Number, default: 0 },
      badges: [{ name: String, earnedAt: Date }]
    });
    loyaltySchema.index({ userId: 1 });
    const Loyalty = model("Loyalty", loyaltySchema);
    ```
    **Explanation**: This enhances user engagement in retail loyalty programs.

28. **How do you design a schema for a logistics system with route optimization?**  
    **Answer**: Use geospatial data for routes and embedded delivery points.  
    **Example**:  
    ```javascript
    const routeSchema = new Schema({
      driverId: { type: Schema.Types.ObjectId, ref: "User" },
      waypoints: [{
        location: { type: { type: String, enum: ["Point"] }, coordinates: [Number] },
        orderId: { type: Schema.Types.ObjectId, ref: "Order" }
      }]
    });
    routeSchema.index({ "waypoints.location": "2dsphere" });
    const Route = model("Route", routeSchema);
    ```
    **Explanation**: This optimizes delivery routes in logistics platforms.

29. **How do you model a schema for a collaborative workspace with document locking?**  
    **Answer**: Use a schema with a lock status and user reference.  
    **Example**:  
    ```javascript
    const documentSchema = new Schema({
      title: String,
      lock: {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        lockedAt: Date
      }
    });
    documentSchema.pre("save", async function(next) {
      if (this.lock && this.lock.lockedAt < new Date(Date.now() - 30 * 60 * 1000)) {
        this.lock = null; // Auto-unlock after 30 minutes
      }
      next();
    });
    const Document = model("Document", documentSchema);
    ```
    **Explanation**: This prevents edit conflicts in collaborative workspaces.

30. **How do you design a schema for a customer onboarding system with progress tracking?**  
    **Answer**: Use embedded steps with completion status.  
    **Example**:  
    ```javascript
    const onboardingSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      steps: [{
        name: String,
        completed: { type: Boolean, default: false },
        completedAt: Date
      }]
    });
    onboardingSchema.index({ userId: 1 });
    const Onboarding = model("Onboarding", onboardingSchema);
    ```
    **Explanation**: This tracks onboarding progress for SaaS platforms.

## Advanced Aggregation and Analytics

31. **How do you use Mongoose aggregation to analyze customer retention in a subscription service?**  
    **Answer**: Group subscriptions by cohort and status to calculate retention rates.  
    **Example**:  
    ```javascript
    const retention = await Subscription.aggregate([
      {
        $group: {
          _id: { $month: "$startDate" },
          active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          retentionRate: { $divide: ["$active", "$total"] }
        }
      }
    ]);
    ```
    **Explanation**: This provides retention metrics for subscription businesses.

32. **How do you calculate average ticket resolution time using Mongoose aggregation?**  
    **Answer**: Compute time differences between ticket creation and resolution.  
    **Example**:  
    ```javascript
    const resolutionTime = await Ticket.aggregate([
      { $match: { status: "closed" } },
      {
        $project: {
          resolutionTime: { $subtract: ["$updatedAt", "$createdAt"] }
        }
      },
      {
        $group: {
          _id: null,
          avgResolutionTime: { $avg: "$resolutionTime" }
        }
      }
    ]);
    ```
    **Explanation**: This measures support team efficiency in customer service.

33. **How do you use Mongoose aggregation to track sales trends by product category?**  
    **Answer**: Join orders with products and group by category and time.  
    **Example**:  
    ```javascript
    const trends = await Order.aggregate([
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
          _id: { category: "$product.category", month: { $month: "$createdAt" } },
          totalSales: { $sum: "$items.quantity" }
        }
      }
    ]);
    ```
    **Explanation**: This provides sales insights for inventory planning.

34. **How do you aggregate user engagement metrics for a social platform?**  
    **Answer**: Group interactions by user and action type.  
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
    **Explanation**: This tracks user activity for platform analytics.

35. **How do you use Mongoose aggregation to detect anomalies in transaction data?**  
    **Answer**: Identify transactions exceeding standard deviation thresholds.  
    **Example**:  
    ```javascript
    const anomalies = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          avgAmount: { $avg: "$amount" },
          stdDev: { $stdDevPop: "$amount" }
        }
      },
      {
        $lookup: {
          from: "transactions",
          pipeline: [
            {
              $match: {
                $expr: {
                  $gt: ["$amount", { $add: ["$avgAmount", { $multiply: [2, "$stdDev"] }] }]
                }
              }
            }
          ],
          as: "anomalies"
        }
      }
    ]);
    ```
    **Explanation**: This detects potential fraud in financial systems.

## Scalability and Performance

36. **How do you optimize Mongoose for a high-write logging system?**  
    **Answer**: Use a capped collection and disable versioning for speed.  
    **Example**:  
    ```javascript
    const logSchema = new Schema({
      message: String,
      timestamp: Date
    }, { capped: { size: 1024 * 1024, max: 1000 }, versionKey: false });
    logSchema.index({ timestamp: 1 });
    const Log = model("Log", logSchema);
    ```
    **Explanation**: This handles high-frequency logs in monitoring systems.

37. **How do you implement sharding in a Mongoose schema for a global marketplace?**  
    **Answer**: Use a shard key like region for distributed data.  
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
    **Explanation**: Sharding scales order data for global e-commerce.

38. **How do you use Mongoose lean queries for a high-performance API?**  
    **Answer**: Use `.lean()` to bypass Mongoose overhead.  
    **Example**:  
    ```javascript
    const products = await Product.find({ category: "books" }).select("name price").lean();
    ```
    **Explanation**: Lean queries improve response times in read-heavy APIs.

39. **How do you handle large-scale data migrations in a Mongoose-based system?**  
    **Answer**: Use batch processing with a migration script.  
    **Example**:  
    ```javascript
    const migrate = async () => {
      const batchSize = 1000;
      let skip = 0;
      while (true) {
        const users = await User.find().skip(skip).limit(batchSize);
        if (!users.length) break;
        await User.updateMany(
          { _id: { $in: users.map(u => u._id) } },
          { $set: { newField: "default" } }
        );
        skip += batchSize;
      }
    };
    ```
    **Explanation**: This ensures scalable schema updates in production systems.

40. **How do you optimize Mongoose for a real-time dashboard?**  
    **Answer**: Use aggregation with caching and lean queries.  
    **Example**:  
    ```javascript
    const stats = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]).cache(3600); // Redis caching
    ```
    **Explanation**: This ensures fast data retrieval for analytics dashboards.

## Advanced Security Scenarios

41. **How do you implement field-level access control in a Mongoose schema?**  
    **Answer**: Use query middleware to filter sensitive fields based on user roles.  
    **Example**:  
    ```javascript
    const userSchema = new Schema({
      name: String,
      ssn: String
    });
    userSchema.pre("find", function(next) {
      if (this.options.userRole !== "admin") {
        this.select("-ssn");
      }
      next();
    });
    const User = model("User", userSchema);
    ```
    **Explanation**: This restricts sensitive data access in enterprise systems.

42. **How do you prevent SQL-like injection attacks in Mongoose queries?**  
    **Answer**: Use Mongoose’s sanitization and avoid raw MongoDB operators with user input.  
    **Example**:  
    ```javascript
    const safeQuery = await User.find({ email: { $eq: req.query.email } });
    ```
    **Explanation**: This prevents injection in public APIs.

43. **How do you implement data retention policies in a Mongoose schema?**  
    **Answer**: Use TTL indexes to auto-delete old data.  
    **Example**:  
    ```javascript
    const logSchema = new Schema({
      message: String,
      createdAt: { type: Date, expires: "7d" }
    });
    const Log = model("Log", logSchema);
    ```
    **Explanation**: This ensures compliance with data retention policies.

44. **How do you secure a Mongoose schema for a payment processing system?**  
    **Answer**: Encrypt sensitive fields and use transactions.  
    **Example**:  
    ```javascript
    const paymentSchema = new Schema({
      cardNumber: { type: String, encrypt: true },
      amount: Number
    });
    paymentSchema.plugin(require("mongoose-encryption"), { encryptionKey: "key" });
    const Payment = model("Payment", paymentSchema);
    ```
    **Explanation**: This secures payment data in financial systems.

45. **How do you implement audit trails for a Mongoose schema in a regulated industry?**  
    **Answer**: Log changes to a separate audit collection.  
    **Example**:  
    ```javascript
    const auditSchema = new Schema({ action: String, documentId: Schema.Types.ObjectId });
    const userSchema = new Schema({ name: String });
    userSchema.post("save", async function(doc) {
      await Audit.create({ action: "update", documentId: doc._id });
    });
    const User = model("User", userSchema);
    const Audit = model("Audit", auditSchema);
    ```
    **Explanation**: This ensures compliance in regulated industries.

## Complex Business Scenarios

46. **How do you design a schema for a real-time bidding system for ad auctions?**  
    **Answer**: Use a schema with embedded bids and references to advertisers.  
    **Example**:  
    ```javascript
    const auctionSchema = new Schema({
      adId: { type: Schema.Types.ObjectId, ref: "Ad", required: true },
      bids: [{
        advertiserId: { type: Schema.Types.ObjectId, ref: "User" },
        amount: Number,
        timestamp: Date
      }]
    });
    auctionSchema.index({ adId: 1 });
    const Auction = model("Auction", auctionSchema);
    ```
    **Explanation**: This supports real-time ad bidding platforms.

47. **How do you model a schema for a healthcare system with patient treatment plans?**  
    **Answer**: Use embedded plans with references to doctors and medications.  
    **Example**:  
    ```javascript
    const patientSchema = new Schema({
      name: String,
      treatmentPlans: [{
        doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },
        medications: [{ type: Schema.Types.ObjectId, ref: "Medication" }],
        startDate: Date
      }]
    });
    const Patient = model("Patient", patientSchema);
    ```
    **Explanation**: This organizes patient care in healthcare systems.

48. **How do you design a schema for a content recommendation system?**  
    **Answer**: Track user interactions with content references.  
    **Example**:  
    ```javascript
    const interactionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      contentId: { type: Schema.Types.ObjectId, ref: "Content" },
      action: { type: String, enum: ["view", "like"] }
    });
    interactionSchema.index({ userId: 1, contentId: 1 });
    const Interaction = model("Interaction", interactionSchema);
    ```
    **Explanation**: This supports personalized content recommendations.

49. **How do you model a schema for a multi-tenant e-learning platform?**  
    **Answer**: Use a `tenantId` with course references.  
    **Example**:  
    ```javascript
    const courseSchema = new Schema({
      tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
      title: String,
      students: [{ type: Schema.Types.ObjectId, ref: "User" }]
    });
    courseSchema.index({ tenantId: 1 });
    const Course = model("Course", courseSchema);
    ```
    **Explanation**: This isolates course data for multi-tenant e-learning systems.

50. **How do you design a schema for a fleet management system with vehicle maintenance logs?**  
    **Answer**: Use embedded maintenance logs with vehicle references.  
    **Example**:  
    ```javascript
    const vehicleSchema = new Schema({
      vin: String,
      maintenanceLogs: [{
        service: String,
        date: Date,
        cost: Number
      }]
    });
    const Vehicle = model("Vehicle", vehicleSchema);
    ```
    **Explanation**: This tracks vehicle maintenance for fleet management.

## Advanced Validation Scenarios

51. **How do you validate cross-document constraints in a Mongoose schema for a booking system?**  
    **Answer**: Use `pre` middleware to check for conflicts across documents.  
    **Example**:  
    ```javascript
    const bookingSchema = new Schema({
      resourceId: { type: Schema.Types.ObjectId, ref: "Resource" },
      startTime: Date,
      endTime: Date
    });
    bookingSchema.pre("save", async function(next) {
      const conflict = await this.constructor.findOne({
        resourceId: this.resourceId,
        startTime: { $lt: this.endTime },
        endTime: { $gt: this.startTime }
      });
      if (conflict) return next(new Error("Booking conflict"));
      next();
    });
    const Booking = model("Booking", bookingSchema);
    ```
    **Explanation**: This prevents overlapping bookings in resource management.

52. **How do you enforce budget limits in a Mongoose schema for a project expense system?**  
    **Answer**: Use middleware to validate expenses against a budget.  
    **Example**:  
    ```javascript
    const projectSchema = new Schema({
      name: String,
      budget: Number,
      expenses: [{ amount: Number, description: String }]
    });
    projectSchema.pre("save", function(next) {
      const totalExpense = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      if (totalExpense > this.budget) {
        return next(new Error("Expenses exceed budget"));
      }
      next();
    });
    const Project = model("Project", projectSchema);
    ```
    **Explanation**: This ensures financial control in project management.

53. **How do you implement conditional required fields in a Mongoose schema for a payment system?**  
    **Answer**: Use dynamic `required` validators based on conditions.  
    **Example**:  
    ```javascript
    const paymentSchema = new Schema({
      type: { type: String, enum: ["card", "bank"], required: true },
      bankAccount: {
        type: String,
        required: function() { return this.type === "bank"; }
      }
    });
    const Payment = model("Payment", paymentSchema);
    ```
    **Explanation**: This ensures valid payment details based on type.

54. **How do you use Mongoose middleware to enforce data consistency in an inventory system?**  
    **Answer**: Validate stock levels before order updates.  
    **Example**:  
    ```javascript
    const orderSchema = new Schema({
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    });
    orderSchema.pre("save", async function(next) {
      const product = await Product.findById(this.productId);
      if (product.stock < this.quantity) {
        return next(new Error("Out of stock"));
      }
      next();
    });
    const Order = model("Order", orderSchema);
    ```
    **Explanation**: This prevents invalid inventory updates in retail.

55. **How do you validate hierarchical data in a Mongoose schema for an org chart?**  
    **Answer**: Use a custom validator to prevent circular references.  
    **Example**:  
    ```javascript
    const employeeSchema = new Schema({
      name: String,
      managerId: { type: Schema.Types.ObjectId, ref: "Employee" }
    });
    employeeSchema.pre("save", async function(next) {
      if (this.managerId) {
        const manager = await Employee.findById(this.managerId);
        if (manager && manager.managerId === this._id) {
          return next(new Error("Circular reference detected"));
        }
      }
      next();
    });
    const Employee = model("Employee", employeeSchema);
    ```
    **Explanation**: This ensures valid org structures in HR systems.

## Advanced Analytics Scenarios

56. **How do you use Mongoose aggregation to track customer lifetime value?**  
    **Answer**: Sum orders per user and divide by account duration.  
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
        $project: {
          clv: { $divide: ["$totalSpent", { $subtract: [new Date(), "$firstOrder"] }] }
        }
      }
    ]);
    ```
    **Explanation**: This supports targeted marketing in e-commerce.

57. **How do you calculate churn rates using Mongoose aggregation?**  
    **Answer**: Group subscriptions by status and cohort.  
    **Example**:  
    ```javascript
    const churn = await Subscription.aggregate([
      {
        $group: {
          _id: { $year: "$startDate" },
          canceled: { $sum: { $cond: [{ $eq: ["$status", "canceled"] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          churnRate: { $divide: ["$canceled", "$total"] }
        }
      }
    ]);
    ```
    **Explanation**: This measures retention for subscription services.

58. **How do you aggregate delivery performance metrics in a logistics system?**  
    **Answer**: Calculate average delivery times by driver.  
    **Example**:  
    ```javascript
    const performance = await Delivery.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$driverId",
          avgTime: { $avg: { $subtract: ["$completedAt", "$createdAt"] } }
        }
      }
    ]);
    ```
    **Explanation**: This optimizes driver performance in logistics.

59. **How do you use Mongoose aggregation to track product popularity?**  
    **Answer**: Count order items by product.  
    **Example**:  
    ```javascript
    const popularity = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          count: { $sum: "$items.quantity" }
        }
      },
      { $sort: { count: -1 } }
    ]);
    ```
    **Explanation**: This informs inventory decisions in retail.

60. **How do you analyze user engagement patterns with Mongoose aggregation?**  
    **Answer**: Group interactions by user and time period.  
    **Example**:  
    ```javascript
    const engagement = await Interaction.aggregate([
      {
        $group: {
          _id: { userId: "$userId", week: { $week: "$timestamp" } },
          count: { $sum: 1 }
        }
      }
    ]);
    ```
    **Explanation**: This tracks user activity for social platforms.

## Advanced Performance Scenarios

61. **How do you optimize Mongoose for a high-read analytics API?**  
    **Answer**: Use lean queries and caching.  
    **Example**:  
    ```javascript
    const redis = require("redis");
    const client = redis.createClient();
    const cacheKey = "analytics:stats";
    const stats = await client.get(cacheKey);
    if (stats) return JSON.parse(stats);
    const data = await Order.find().select("total").lean();
    await client.setEx(cacheKey, 3600, JSON.stringify(data));
    ```
    **Explanation**: This ensures fast analytics in dashboards.

62. **How do you implement batch processing in a Mongoose-based system for order updates?**  
    **Answer**: Use `bulkWrite` for efficient updates.  
    **Example**:  
    ```javascript
    const operations = orders.map(order => ({
      updateOne: {
        filter: { _id: order._id },
        update: { $set: { status: "processed" } }
      }
    }));
    await Order.bulkWrite(operations);
    ```
    **Explanation**: This scales order processing in e-commerce.

63. **How do you use Mongoose to handle time-series data in a monitoring system?**  
    **Answer**: Use bucketing with TTL indexes.  
    **Example**:  
    ```javascript
    const metricSchema = new Schema({
      deviceId: String,
      metrics: [{ value: Number, timestamp: Date }]
    }, { expires: "30d" });
    metricSchema.index({ deviceId: 1, "metrics.timestamp": 1 });
    const Metric = model("Metric", metricSchema);
    ```
    **Explanation**: This optimizes storage for IoT monitoring.

64. **How do you implement sharding for a Mongoose schema in a global CRM?**  
    **Answer**: Use a shard key like region.  
    **Example**:  
    ```javascript
    const customerSchema = new Schema({
      region: { type: String, required: true },
      name: String
    });
    customerSchema.index({ region: 1 }); // Shard key
    const Customer = model("Customer", customerSchema);
    ```
    **Explanation**: Sharding scales CRM data globally.

65. **How do you optimize Mongoose for a real-time notification system?**  
    **Answer**: Use indexes and lean queries for fast delivery.  
    **Example**:  
    ```javascript
    const notificationSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      message: String
    });
    notificationSchema.index({ userId: 1 });
    const Notification = model("Notification", notificationSchema);
    const notifications = await Notification.find({ userId }).lean();
    ```
    **Explanation**: This ensures fast notification delivery.

## Complex Business Scenarios

66. **How do you design a schema for a multi-tenant ticketing system?**  
    **Answer**: Use a `tenantId` with ticket details.  
    **Example**:  
    ```javascript
    const ticketSchema = new Schema({
      tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
      title: String,
      status: { type: String, enum: ["open", "closed"], default: "open" }
    });
    ticketSchema.index({ tenantId: 1, status: 1 });
    const Ticket = model("Ticket", ticketSchema);
    ```
    **Explanation**: This isolates tickets for multi-tenant support systems.

67. **How do you model a schema for a real estate platform with property amenities?**  
    **Answer**: Use embedded amenities with details.  
    **Example**:  
    ```javascript
    const propertySchema = new Schema({
      address: String,
      amenities: [{ name: String, available: Boolean }]
    });
    const Property = model("Property", propertySchema);
    ```
    **Explanation**: This supports detailed property listings.

68. **How do you design a schema for a subscription box service with dynamic preferences?**  
    **Answer**: Use a `Map` for user preferences.  
    **Example**:  
    ```javascript
    const subscriptionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      preferences: { type: Map, of: String }
    });
    const Subscription = model("Subscription", subscriptionSchema);
    ```
    **Explanation**: This supports personalized subscription boxes.

69. **How do you model a schema for a collaborative project management tool?**  
    **Answer**: Use references for teams and tasks.  
    **Example**:  
    ```javascript
    const projectSchema = new Schema({
      name: String,
      team: [{ type: Schema.Types.ObjectId, ref: "User" }],
      tasks: [{ title: String, assignedTo: { type: Schema.Types.ObjectId, ref: "User" } }]
    });
    projectSchema.index({ team: 1 });
    const Project = model("Project", projectSchema);
    ```
    **Explanation**: This supports collaborative workflows.

70. **How do you design a schema for a travel itinerary planner?**  
    **Answer**: Use embedded itinerary items with references to services.  
    **Example**:  
    ```javascript
    const itinerarySchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      items: [{
        serviceId: { type: Schema.Types.ObjectId, refPath: "items.serviceType" },
        serviceType: { type: String, enum: ["Flight", "Hotel"] }
      }]
    });
    const Itinerary = model("Itinerary", itinerarySchema);
    ```
    **Explanation**: This organizes complex travel plans.

## Advanced Security and Compliance

71. **How do you implement PCI compliance in a Mongoose schema for payments?**  
    **Answer**: Encrypt card details and use transactions.  
    **Example**:  
    ```javascript
    const paymentSchema = new Schema({
      cardNumber: { type: String, encrypt: true },
      amount: Number
    });
    paymentSchema.plugin(require("mongoose-encryption"), { encryptionKey: "key" });
    const Payment = model("Payment", paymentSchema);
    ```
    **Explanation**: This ensures secure payment processing.

72. **How do you enforce data access policies in a Mongoose schema for a SaaS platform?**  
    **Answer**: Filter data by tenant in middleware.  
    **Example**:  
    ```javascript
    const dataSchema = new Schema({
      tenantId: { type: Schema.Types.ObjectId, required: true },
      content: String
    });
    dataSchema.pre("find", function(next) {
      this.where({ tenantId: this.options.tenantId });
      next();
    });
    const Data = model("Data", dataSchema);
    ```
    **Explanation**: This isolates tenant data in SaaS applications.

73. **How do you implement data masking in a Mongoose schema for a CRM?**  
    **Answer**: Use getters to mask sensitive fields.  
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
    **Explanation**: This protects PII in CRM exports.

74. **How do you audit schema migrations in a Mongoose-based system?**  
    **Answer**: Log migration details to a separate collection.  
    **Example**:  
    ```javascript
    const migrationSchema = new Schema({
      collection: String,
      changes: Schema.Types.Mixed,
      timestamp: Date
    });
    const Migration = model("Migration", migrationSchema);
    ```
    **Explanation**: This ensures traceability for schema changes.

75. **How do you secure Mongoose queries against injection in a public API?**  
    **Answer**: Use Mongoose’s built-in sanitization.  
    **Example**:  
    ```javascript
    const products = await Product.find({ name: { $eq: req.query.name } });
    ```
    **Explanation**: This prevents injection attacks in APIs.

## Final Business Scenarios

76. **How do you design a schema for a subscription analytics platform with usage tracking?**  
    **Answer**: Use embedded usage metrics.  
    **Example**:  
    ```javascript
    const subscriptionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      usage: [{ feature: String, count: Number, timestamp: Date }]
    });
    const Subscription = model("Subscription", subscriptionSchema);
    ```
    **Explanation**: This tracks feature usage for analytics.

77. **How do you model a schema for a customer feedback system with sentiment analysis?**  
    **Answer**: Include sentiment scores in feedback.  
    **Example**:  
    ```javascript
    const feedbackSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      comment: String,
      sentiment: { type: String, enum: ["positive", "negative", "neutral"] }
    });
    feedbackSchema.index({ userId: 1 });
    const Feedback = model("Feedback", feedbackSchema);
    ```
    **Explanation**: This supports sentiment-based customer insights.

78. **How do you design a schema for a multi-tenant inventory system?**  
    **Answer**: Use a `tenantId` with inventory details.  
    **Example**:  
    ```javascript
    const inventorySchema = new Schema({
      tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      stock: Number
    });
    inventorySchema.index({ tenantId: 1, productId: 1 });
    const Inventory = model("Inventory", inventorySchema);
    ```
    **Explanation**: This isolates inventory for multi-tenant retail.

79. **How do you model a schema for a time-tracking system with billable hours?**  
    **Answer**: Use embedded time entries with billing rates.  
    **Example**:  
    ```javascript
    const timeTrackingSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      entries: [{
        startTime: Date,
        endTime: Date,
        rate: Number
      }]
    });
    const TimeTracking = model("TimeTracking", timeTrackingSchema);
    ```
    **Explanation**: This supports billing for freelance platforms.

80. **How do you design a schema for a real-time voting system?**  
    **Answer**: Use a schema with encrypted votes.  
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
    **Explanation**: This ensures secure voting in election systems.

81. **How do you model a schema for a customer onboarding system with dynamic steps?**  
    **Answer**: Use a `Map` for dynamic onboarding steps.  
    **Example**:  
    ```javascript
    const onboardingSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      steps: { type: Map, of: { completed: Boolean, completedAt: Date } }
    });
    const Onboarding = model("Onboarding", onboardingSchema);
    ```
    **Explanation**: This supports flexible onboarding workflows.

82. **How do you design a schema for a multi-vendor marketplace with ratings?**  
    **Answer**: Use separate schemas for vendors and ratings.  
    **Example**:  
    ```javascript
    const vendorSchema = new Schema({ name: String });
    const ratingSchema = new Schema({
      vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
      score: { type: Number, min: 1, max: 5 }
    });
    ratingSchema.index({ vendorId: 1 });
    const Vendor = model("Vendor", vendorSchema);
    const Rating = model("Rating", ratingSchema);
    ```
    **Explanation**: This tracks vendor performance in marketplaces.

83. **How do you model a schema for a healthcare appointment system with reminders?**  
    **Answer**: Use embedded reminders with scheduling details.  
    **Example**:  
    ```javascript
    const appointmentSchema = new Schema({
      patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
      time: Date,
      reminders: [{ time: Date, sent: Boolean }]
    });
    appointmentSchema.index({ patientId: 1, time: 1 });
    const Appointment = model("Appointment", appointmentSchema);
    ```
    **Explanation**: This supports automated reminders in healthcare.

84. **How do you design a schema for a content management system with versioned drafts?**  
    **Answer**: Use embedded drafts with version numbers.  
    **Example**:  
    ```javascript
    const contentSchema = new Schema({
      title: String,
      drafts: [{ version: Number, content: String, timestamp: Date }]
    });
    const Content = model("Content", contentSchema);
    ```
    **Explanation**: This supports content versioning in CMS platforms.

85. **How do you model a schema for a logistics system with multi-stop deliveries?**  
    **Answer**: Use embedded stops with geospatial data.  
    **Example**:  
    ```javascript
    const deliverySchema = new Schema({
      driverId: { type: Schema.Types.ObjectId, ref: "User" },
      stops: [{
        location: { type: { type: String, enum: ["Point"] }, coordinates: [Number] },
        orderId: { type: Schema.Types.ObjectId, ref: "Order" }
      }]
    });
    deliverySchema.index({ "stops.location": "2dsphere" });
    const Delivery = model("Delivery", deliverySchema);
    ```
    **Explanation**: This optimizes multi-stop delivery routes.

## Advanced Performance and Analytics

86. **How do you optimize Mongoose for a real-time chat system?**  
    **Answer**: Use indexes and lean queries for fast message retrieval.  
    **Example**:  
    ```javascript
    const chatSchema = new Schema({
      participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
      messages: [{ content: String, timestamp: Date }]
    });
    chatSchema.index({ participants: 1, "messages.timestamp": 1 });
    const Chat = model("Chat", chatSchema);
    const messages = await Chat.find({ participants: userId }).select("messages").lean();
    ```
    **Explanation**: This ensures fast chat message delivery.

87. **How do you use Mongoose aggregation to track inventory stock levels?**  
    **Answer**: Aggregate stock changes by product.  
    **Example**:  
    ```javascript
    const stockLevels = await Inventory.aggregate([
      {
        $group: {
          _id: "$productId",
          totalStock: { $sum: "$stock" }
        }
      }
    ]);
    ```
    **Explanation**: This monitors stock for inventory management.

88. **How do you calculate customer acquisition cost using Mongoose aggregation?**  
    **Answer**: Aggregate marketing spend and new users by campaign.  
    **Example**:  
    ```javascript
    const cac = await Campaign.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "campaignId",
          as: "users"
        }
      },
      {
        $project: {
          cost: "$budget",
          userCount: { $size: "$users" },
          cac: { $divide: ["$budget", { $size: "$users" }] }
        }
      }
    ]);
    ```
    **Explanation**: This informs marketing strategies.

89. **How do you use Mongoose to track user activity for a gamified platform?**  
    **Answer**: Aggregate actions by user and type.  
    **Example**:  
    ```javascript
    const activity = await Action.aggregate([
      {
        $group: {
          _id: { userId: "$userId", action: "$action" },
          count: { $sum: 1 }
        }
      }
    ]);
    ```
    **Explanation**: This tracks engagement in gamified apps.

90. **How do you optimize Mongoose for a high-traffic content API?**  
    **Answer**: Use lean queries and caching.  
    **Example**:  
    ```javascript
    const content = await Content.find().select("title content").lean().cache(3600);
    ```
    **Explanation**: This ensures fast content delivery in CMS platforms.

## Final Scenarios

91. **How do you design a schema for a multi-tenant analytics dashboard?**  
    **Answer**: Use a `tenantId` with embedded metrics.  
    **Example**:  
    ```javascript
    const analyticsSchema = new Schema({
      tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
      metrics: [{ key: String, value: Number }]
    });
    analyticsSchema.index({ tenantId: 1 });
    const Analytics = model("Analytics", analyticsSchema);
    ```
    **Explanation**: This isolates analytics for SaaS dashboards.

92. **How do you model a schema for a subscription service with usage limits?**  
    **Answer**: Track usage with embedded counters.  
    **Example**:  
    ```javascript
    const subscriptionSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      usage: [{ feature: String, count: Number, limit: Number }]
    });
    const Subscription = model("Subscription", subscriptionSchema);
    ```
    **Explanation**: This enforces feature limits in SaaS platforms.

93. **How do you design a schema for a real-time auction system with bid history?**  
    **Answer**: Use embedded bids with timestamps.  
    **Example**:  
    ```javascript
    const auctionSchema = new Schema({
      itemId: { type: Schema.Types.ObjectId, ref: "Item" },
      bids: [{ userId: { type: Schema.Types.ObjectId, ref: "User" }, amount: Number, timestamp: Date }]
    });
    auctionSchema.index({ itemId: 1 });
    const Auction = model("Auction", auctionSchema);
    ```
    **Explanation**: This tracks bids in auction platforms.

94. **How do you model a schema for a fitness app with workout tracking?**  
    **Answer**: Use embedded workouts with exercise details.  
    **Example**:  
    ```javascript
    const workoutSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      workouts: [{ name: String, exercises: [{ name: String, reps: Number }] }]
    });
    const Workout = model("Workout", workoutSchema);
    ```
    **Explanation**: This tracks fitness progress in apps.

95. **How do you design a schema for a customer support system with SLAs?**  
    **Answer**: Include SLA deadlines and status tracking.  
    **Example**:  
    ```javascript
    const ticketSchema = new Schema({
      title: String,
      slaDeadline: Date,
      status: { type: String, enum: ["open", "closed"], default: "open" }
    });
    ticketSchema.index({ slaDeadline: 1 });
    const Ticket = model("Ticket", ticketSchema);
    ```
    **Explanation**: This ensures SLA compliance in support systems.

96. **How do you model a schema for a real-time collaboration tool with versioned edits?**  
    **Answer**: Use embedded edit history.  
    **Example**:  
    ```javascript
    const documentSchema = new Schema({
      title: String,
      edits: [{ userId: { type: Schema.Types.ObjectId, ref: "User" }, content: String, timestamp: Date }]
    });
    const Document = model("Document", documentSchema);
    ```
    **Explanation**: This supports collaborative editing in tools.

97. **How do you design a schema for a supply chain system with batch tracking?**  
    **Answer**: Use embedded batch details.  
    **Example**:  
    ```javascript
    const productSchema = new Schema({
      name: String,
      batches: [{ batchId: String, quantity: Number, expiry: Date }]
    });
    const Product = model("Product", productSchema);
    ```
    **Explanation**: This tracks product batches in supply chains.

98. **How do you model a schema for a travel booking system with multi-leg trips?**  
    **Answer**: Use embedded legs with service references.  
    **Example**:  
    ```javascript
    const tripSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      legs: [{
        serviceId: { type: Schema.Types.ObjectId, refPath: "legs.serviceType" },
        serviceType: { type: String, enum: ["Flight", "Hotel"] }
      }]
    });
    const Trip = model("Trip", tripSchema);
    ```
    **Explanation**: This organizes multi-leg travel bookings.

99. **How do you design a schema for a loyalty program with tiered rewards?**  
    **Answer**: Include tiers and reward tracking.  
    **Example**:  
    ```javascript
    const loyaltySchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      tier: { type: String, enum: ["silver", "gold"], default: "silver" },
      rewards: [{ name: String, redeemedAt: Date }]
    });
    const Loyalty = model("Loyalty", loyaltySchema);
    ```
    **Explanation**: This supports tiered loyalty programs.

100. **How do you model a schema for a real-time inventory system with alerts?**  
     **Answer**: Use middleware for low-stock alerts.  
     **Example**:  
     ```javascript
     const inventorySchema = new Schema({
       productId: { type: Schema.Types.ObjectId, ref: "Product" },
       stock: Number,
       threshold: Number
     });
     inventorySchema.pre("save", function(next) {
       if (this.stock < this.threshold) {
         console.log(`Low stock alert for product ${this.productId}`);
       }
       next();
     });
     const Inventory = model("Inventory", inventorySchema);
     ```
     **Explanation**: This ensures timely inventory alerts in retail.