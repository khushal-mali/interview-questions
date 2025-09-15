# 100 MongoDB and Mongoose Questions on Data Fetching and Schema Design

This document provides 100 questions with detailed answers on MongoDB data fetching and schema design, using the MongoDB Node.js driver for the first 30 questions and Mongoose for the remaining 70. The questions cover simple to complex scenarios, including basic queries, advanced filtering, aggregation pipelines, and schema design strategies (from simple key-value structures to complex nested and referenced schemas). Each question includes explanations, code examples, real-world use cases, pitfalls, and key takeaways.

## MongoDB Basics with Native Driver (Questions 1–30)

### 1. What is data fetching in MongoDB, and how is it performed with the Node.js driver?
**Answer**:  
Data fetching in MongoDB involves querying collections to retrieve documents matching specific criteria. The MongoDB Node.js driver uses methods like `find`, `findOne`, and `aggregate` to fetch data. Queries are built using filter objects, and results are returned as cursors or single documents.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchData() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({ age: { $gt: 25 } }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchData();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ age: { $gt: 25 } });
```
**Real-World Use Case**: Retrieving users for a targeted marketing campaign.  
**Pitfalls**: Large queries without indexes can be slow; always close connections to avoid leaks.  
**Key Takeaway**: The MongoDB driver provides flexible data fetching, but performance depends on indexing and query optimization.

### 2. How do you define a simple schema in MongoDB?  
**Answer**:  
MongoDB is schema-less, but a schema can be implicitly defined by the structure of inserted documents. A simple schema includes basic fields (e.g., strings, numbers) without complex relationships.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertSimpleSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("users").insertOne({
      name: "Alice",
      age: 30,
      email: "alice@example.com"
    });
    console.log("Simple schema document inserted");
  } finally {
    await client.close();
  }
}
insertSimpleSchema();
```
**Real-World Use Case**: Storing basic user profiles for a registration system.  
**Pitfalls**: Without validation, inconsistent data can be inserted; consider schema validation.  
**Key Takeaway**: Simple schemas are easy to define but require validation for consistency.

### 3. How do you fetch a single document using `findOne`?  
**Answer**:  
The `findOne` method retrieves the first document matching a filter, returning `null` if none match.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchOne() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const user = await db.collection("users").findOne({ email: "alice@example.com" });
    console.log(user);
  } finally {
    await client.close();
  }
}
fetchOne();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.findOne({ email: "alice@example.com" });
```
**Real-World Use Case**: Fetching a user by email for login authentication.  
**Pitfalls**: Ensure the filter is specific to avoid unexpected results; use indexes for speed.  
**Key Takeaway**: `findOne` is efficient for single-document retrieval.

### 4. How do you fetch multiple documents using `find`?  
**Answer**:  
The `find` method returns a cursor for all matching documents, which can be converted to an array with `toArray` or iterated with `forEach`.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchMany() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({ age: { $gte: 25 } }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchMany();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ age: { $gte: 25 } });
```
**Real-World Use Case**: Listing all users in a specific age range for analytics.  
**Pitfalls**: Large result sets can consume memory; use `limit` or streaming.  
**Key Takeaway**: `find` is versatile but requires optimization for large datasets.

### 5. How do you define a schema with embedded documents?  
**Answer**:  
Embedded documents store related data within a single document, ideal for one-to-few relationships. The schema is defined by nesting objects or arrays.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertEmbeddedSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("users").insertOne({
      name: "Bob",
      address: { city: "New York", zip: 10001 },
      hobbies: ["reading", "gaming"]
    });
    console.log("Embedded schema inserted");
  } finally {
    await client.close();
  }
}
insertEmbeddedSchema();
```
**Real-World Use Case**: Storing user addresses within profiles for quick access.  
**Pitfalls**: Large embedded arrays can hit the 16MB document limit; avoid over-embedding.  
**Key Takeaway**: Embedded schemas improve read performance but require size management.

### 6. How do you fetch documents with specific fields using projection?  
**Answer**:  
Projection specifies which fields to include (`1`) or exclude (`0`) in query results, reducing data transfer.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchWithProjection() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({ age: { $gt: 25 } }, {
      projection: { name: 1, email: 1, _id: 0 }
    }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchWithProjection();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ age: { $gt: 25 } }, { name: 1, email: 1, _id: 0 });
```
**Real-World Use Case**: Retrieving only user names and emails for a contact list.  
**Pitfalls**: Excluding `_id` requires explicit `{ _id: 0 }`; mixing include/exclude fields is invalid.  
**Key Takeaway**: Projection optimizes data fetching by reducing payload size.

### 7. How do you sort fetched documents?  
**Answer**:  
The `sort` method orders results by specified fields (1 for ascending, -1 for descending).  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function sortDocs() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find().sort({ age: -1 }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
sortDocs();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find().sort({ age: -1 });
```
**Real-World Use Case**: Displaying users by age for a leaderboard.  
**Pitfalls**: Sorting without an index is slow; create indexes on sorted fields.  
**Key Takeaway**: Sorting enhances result presentation but requires indexing for performance.

### 8. How do you limit and skip documents for pagination?  
**Answer**:  
Use `limit` to restrict the number of documents and `skip` to bypass documents, enabling pagination.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function paginateDocs() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const page = 2, pageSize = 10;
    const users = await db.collection("users").find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
paginateDocs();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find().skip(10).limit(10);
```
**Real-World Use Case**: Paginating user lists in a web application.  
**Pitfalls**: Large skips are inefficient; consider range-based pagination for large datasets.  
**Key Takeaway**: Pagination with `skip` and `limit` is simple but needs optimization for scale.

### 9. How do you define a schema with references?  
**Answer**:  
Referenced schemas store relationships using `_id` values pointing to documents in other collections, suitable for one-to-many or many-to-many relationships.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient, ObjectId } = require("mongodb");
async function insertReferencedSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const address = await db.collection("addresses").insertOne({
      city: "New York",
      zip: 10001
    });
    await db.collection("users").insertOne({
      name: "Charlie",
      addressId: address.insertedId
    });
    console.log("Referenced schema inserted");
  } finally {
    await client.close();
  }
}
insertReferencedSchema();
```
**Real-World Use Case**: Linking users to addresses in separate collections for modularity.  
**Pitfalls**: Requires multiple queries to fetch related data; ensure indexes on reference fields.  
**Key Takeaway**: Referenced schemas reduce duplication but increase query complexity.

### 10. How do you fetch documents with query operators?  
**Answer**:  
Query operators (e.g., `$eq`, `$gt`, `$in`) allow precise filtering of documents based on conditions.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchWithOperators() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({
      age: { $gte: 25, $lte: 35 },
      hobbies: { $in: ["gaming"] }
    }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchWithOperators();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ age: { $gte: 25, $lte: 35 }, hobbies: { $in: ["gaming"] } });
```
**Real-World Use Case**: Filtering users by age and interests for targeted ads.  
**Pitfalls**: Complex operators can slow queries without indexes; test queries for accuracy.  
**Key Takeaway**: Query operators enable expressive filtering but require proper indexing.

### 11. How do you fetch documents with logical operators?  
**Answer**:  
Logical operators (`$and`, `$or`, `$not`, `$nor`) combine conditions for complex queries.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchWithLogicalOperators() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({
      $or: [
        { age: { $gt: 30 } },
        { hobbies: "gaming" }
      ]
    }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchWithLogicalOperators();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ $or: [{ age: { $gt: 30 } }, { hobbies: "gaming" }] });
```
**Real-World Use Case**: Finding users who are either over 30 or gamers for a survey.  
**Pitfalls**: Overusing logical operators can complicate queries; simplify where possible.  
**Key Takeaway**: Logical operators add flexibility to queries but should be optimized.

### 12. How do you define a schema with arrays?  
**Answer**:  
Arrays in a schema store lists of values (e.g., strings, objects) within a document, ideal for one-to-few relationships.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertArraySchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("users").insertOne({
      name: "Dave",
      hobbies: ["reading", "gaming", "coding"],
      scores: [{ subject: "math", score: 90 }, { subject: "science", score: 85 }]
    });
    console.log("Array schema inserted");
  } finally {
    await client.close();
  }
}
insertArraySchema();
```
**Real-World Use Case**: Storing user hobbies or test scores in a profile.  
**Pitfalls**: Large arrays can increase document size; consider referencing for large lists.  
**Key Takeaway**: Arrays are flexible for small lists but need size management.

### 13. How do you query array fields?  
**Answer**:  
Use operators like `$in`, `$all`, or dot notation to query array fields.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function queryArray() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({
      hobbies: { $all: ["reading", "gaming"] }
    }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
queryArray();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ hobbies: { $all: ["reading", "gaming"] } });
```
**Real-World Use Case**: Finding users with specific hobbies for recommendations.  
**Pitfalls**: Array queries can be slow without indexes; use `$all` carefully for exact matches.  
**Key Takeaway**: Array queries are powerful but require indexing for performance.

### 14. How do you fetch nested document fields?  
**Answer**:  
Use dot notation to query or project fields within embedded documents.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchNested() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find(
      { "address.city": "New York" },
      { projection: { "address.city": 1, name: 1, _id: 0 } }
    ).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchNested();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ "address.city": "New York" }, { "address.city": 1, name: 1, _id: 0 });
```
**Real-World Use Case**: Retrieving users by city for location-based services.  
**Pitfalls**: Deep nesting can complicate queries; ensure proper indexing.  
**Key Takeaway**: Dot notation simplifies nested field access but needs careful schema design.

### 15. How do you define a schema with validation rules?  
**Answer**:  
MongoDB supports JSON Schema validation to enforce document structure at the collection level.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function createValidatedSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email"],
          properties: {
            name: { bsonType: "string" },
            email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
            age: { bsonType: "int", minimum: 18 }
          }
        }
      }
    });
    console.log("Validated collection created");
  } finally {
    await client.close();
  }
}
createValidatedSchema();
```
**Example (MongoDB Shell)**:  
```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        age: { bsonType: "int", minimum: 18 }
      }
    }
  }
});
```
**Real-World Use Case**: Ensuring user documents have valid emails for registration.  
**Pitfalls**: Strict validation can reject valid data; test schemas thoroughly.  
**Key Takeaway**: JSON Schema enforces data integrity at the database level.

### 16. How do you fetch documents using regex?  
**Answer**:  
The `$regex` operator matches string fields against regular expressions for pattern-based searches.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchWithRegex() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({
      name: { $regex: "^A", $options: "i" }
    }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchWithRegex();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ name: { $regex: "^A", $options: "i" } });
```
**Real-World Use Case**: Searching for users with names starting with “A” (case-insensitive).  
**Pitfalls**: Regex queries can be slow without text indexes; avoid overuse.  
**Key Takeaway**: `$regex` enables flexible string searches but needs optimization.

### 17. How do you define a schema for one-to-many relationships?  
**Answer**:  
One-to-many relationships can be modeled by embedding an array of sub-documents or referencing IDs in another collection. Embedding is preferred for small, frequently accessed data.  
**Example (Node.js Driver, Embedded)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertOneToMany() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("users").insertOne({
      name: "Eve",
      orders: [
        { item: "Book", price: 20 },
        { item: "Pen", price: 5 }
      ]
    });
    console.log("One-to-many schema inserted");
  } finally {
    await client.close();
  }
}
insertOneToMany();
```
**Real-World Use Case**: Storing a user’s orders within their profile for quick access.  
**Pitfalls**: Large arrays can exceed document limits; consider referencing for many items.  
**Key Takeaway**: Embedding simplifies one-to-many queries but requires size management.

### 18. How do you fetch documents with array element matching?  
**Answer**:  
Use operators like `$elemMatch` to match specific elements in an array based on multiple conditions.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchArrayElement() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const users = await db.collection("users").find({
      orders: {
        $elemMatch: { item: "Book", price: { $gt: 10 } }
      }
    }).toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
fetchArrayElement();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.find({ orders: { $elemMatch: { item: "Book", price: { $gt: 10 } } } });
```
**Real-World Use Case**: Finding users with specific order criteria (e.g., expensive books).  
**Pitfalls**: `$elemMatch` can be slow without proper indexing; index array fields if needed.  
**Key Takeaway**: `$elemMatch` enables precise array queries but requires optimization.

### 19. How do you define a schema for many-to-many relationships?  
**Answer**:  
Many-to-many relationships are modeled using references, with arrays of IDs or a junction collection for complex relationships.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient, ObjectId } = require("mongodb");
async function insertManyToMany() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const user = await db.collection("users").insertOne({
      name: "Frank",
      groupIds: [new ObjectId(), new ObjectId()]
    });
    await db.collection("groups").insertOne({
      name: "Admins",
      userIds: [user.insertedId]
    });
    console.log("Many-to-many schema inserted");
  } finally {
    await client.close();
  }
}
insertManyToMany();
```
**Real-World Use Case**: Managing users and groups in an access control system.  
**Pitfalls**: Requires multiple queries to resolve relationships; index reference fields.  
**Key Takeaway**: Many-to-many relationships offer flexibility but increase query complexity.

### 20. How do you perform a text search in MongoDB?  
**Answer**:  
Text search requires a text index and uses the `$text` operator to find documents matching keywords.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function textSearch() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("articles").createIndex({ content: "text" });
    const articles = await db.collection("articles").find({
      $text: { $search: "MongoDB tutorial" }
    }).toArray();
    console.log(articles);
  } finally {
    await client.close();
  }
}
textSearch();
```
**Example (MongoDB Shell)**:  
```javascript
db.articles.createIndex({ content: "text" });
db.articles.find({ $text: { $search: "MongoDB tutorial" } });
```
**Real-World Use Case**: Searching blog posts for specific topics.  
**Pitfalls**: Text indexes are resource-intensive; only one per collection.  
**Key Takeaway**: Text search is powerful but requires careful index management.

### 21. How do you define a schema for geospatial data?  
**Answer**:  
Geospatial schemas store location data using GeoJSON (e.g., `Point`, `Polygon`) with a `2dsphere` index for queries.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertGeoSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("places").insertOne({
      name: "Cafe",
      location: { type: "Point", coordinates: [-73.975, 40.757] }
    });
    console.log("Geospatial schema inserted");
  } finally {
    await client.close();
  }
}
insertGeoSchema();
```
**Real-World Use Case**: Storing restaurant locations for a mapping app.  
**Pitfalls**: Requires valid GeoJSON format; invalid coordinates cause errors.  
**Key Takeaway**: Geospatial schemas enable location-based queries but require proper formatting.

### 22. How do you fetch nearby locations using geospatial queries?  
**Answer**:  
Use `$near` or `$geoNear` with a `2dsphere` index to find documents near a point.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchGeoNear() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("places").createIndex({ location: "2dsphere" });
    const places = await db.collection("places").find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [-73.975, 40.757] },
          $maxDistance: 1000
        }
      }
    }).toArray();
    console.log(places);
  } finally {
    await client.close();
  }
}
fetchGeoNear();
```
**Example (MongoDB Shell)**:  
```javascript
db.places.createIndex({ location: "2dsphere" });
db.places.find({
  location: { $near: { $geometry: { type: "Point", coordinates: [-73.975, 40.757] }, $maxDistance: 1000 } }
});
```
**Real-World Use Case**: Finding nearby restaurants in a location-based app.  
**Pitfalls**: Requires a `2dsphere` index; large datasets need optimization.  
**Key Takeaway**: Geospatial queries are powerful for location data but require indexing.

### 23. How do you define a schema with nested arrays?  
**Answer**:  
Nested arrays store arrays within arrays, suitable for hierarchical data like order items with details.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertNestedArraySchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("orders").insertOne({
      user: "Grace",
      items: [
        { product: "Book", details: [{ color: "Blue" }, { size: "A5" }] },
        { product: "Pen", details: [{ color: "Black" }] }
      ]
    });
    console.log("Nested array schema inserted");
  } finally {
    await client.close();
  }
}
insertNestedArraySchema();
```
**Real-World Use Case**: Storing order details with multiple attributes (e.g., colors, sizes).  
**Pitfalls**: Deep nesting complicates queries and increases document size.  
**Key Takeaway**: Nested arrays are flexible but should be used sparingly to avoid complexity.

### 24. How do you query nested arrays?  
**Answer**:  
Use dot notation or `$elemMatch` to query elements within nested arrays.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function queryNestedArray() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const orders = await db.collection("orders").find({
      "items.details.color": "Blue"
    }).toArray();
    console.log(orders);
  } finally {
    await client.close();
  }
}
queryNestedArray();
```
**Example (MongoDB Shell)**:  
```javascript
db.orders.find({ "items.details.color": "Blue" });
```
**Real-World Use Case**: Finding orders with specific product attributes.  
**Pitfalls**: Complex nested queries can be slow; index nested fields if needed.  
**Key Takeaway**: Nested array queries require precise syntax and indexing.

### 25. How do you fetch distinct values?  
**Answer**:  
The `distinct` method returns unique values for a specified field.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchDistinct() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const cities = await db.collection("users").distinct("address.city");
    console.log(cities);
  } finally {
    await client.close();
  }
}
fetchDistinct();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.distinct("address.city");
```
**Real-World Use Case**: Listing all cities where users are located.  
**Pitfalls**: Distinct queries on large collections can be slow; index the field.  
**Key Takeaway**: `distinct` is useful for unique value extraction but needs indexing.

### 26. How do you define a schema for time-series data?  
**Answer**:  
Time-series schemas store timestamped data, often with a `timestamp` field and metadata, optimized with MongoDB’s time-series collections (MongoDB 5.0+).  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertTimeSeriesSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.createCollection("sensors", {
      timeseries: { timeField: "timestamp", metaField: "metadata", granularity: "minutes" }
    });
    await db.collection("sensors").insertOne({
      timestamp: new Date(),
      metadata: { sensorId: "S1" },
      value: 25.5
    });
    console.log("Time-series schema inserted");
  } finally {
    await client.close();
  }
}
insertTimeSeriesSchema();
```
**Real-World Use Case**: Storing IoT sensor readings over time.  
**Pitfalls**: Time-series collections have specific constraints; ensure compatibility.  
**Key Takeaway**: Time-series schemas optimize storage for temporal data.

### 27. How do you fetch time-series data?  
**Answer**:  
Query time-series collections using standard `find` or aggregation, often filtering by `timestamp`.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchTimeSeries() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const readings = await db.collection("sensors").find({
      timestamp: { $gte: new Date("2023-01-01") },
      metadata: { sensorId: "S1" }
    }).toArray();
    console.log(readings);
  } finally {
    await client.close();
  }
}
fetchTimeSeries();
```
**Example (MongoDB Shell)**:  
```javascript
db.sensors.find({ timestamp: { $gte: ISODate("2023-01-01") }, metadata: { sensorId: "S1" } });
```
**Real-World Use Case**: Analyzing sensor data for a specific period.  
**Pitfalls**: Large time ranges can return many documents; use aggregation for summaries.  
**Key Takeaway**: Time-series queries benefit from optimized storage and indexing.

### 28. How do you use the aggregation framework for data fetching?  
**Answer**:  
The aggregation framework processes data through a pipeline of stages (e.g., `$match`, `$group`) for complex data fetching and transformation.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function aggregateData() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const result = await db.collection("orders").aggregate([
      { $match: { status: "shipped" } },
      { $group: { _id: "$userId", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}
aggregateData();
```
**Example (MongoDB Shell)**:  
```javascript
db.orders.aggregate([
  { $match: { status: "shipped" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```
**Real-World Use Case**: Calculating total sales per user for reporting.  
**Pitfalls**: Complex pipelines can be slow; use `$match` early and index fields.  
**Key Takeaway**: Aggregation is powerful for complex data fetching but requires optimization.

### 29. How do you define a complex schema with mixed types?  
**Answer**:  
A complex schema includes mixed data types (e.g., strings, numbers, arrays, objects, mixed types) to handle varied data.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function insertComplexSchema() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    await db.collection("products").insertOne({
      name: "Laptop",
      price: 999.99,
      specs: { cpu: "i7", ram: "16GB" },
      tags: ["electronics", "portable"],
      metadata: { mixed: true } // Mixed type
    });
    console.log("Complex schema inserted");
  } finally {
    await client.close();
  }
}
insertComplexSchema();
```
**Real-World Use Case**: Storing product details with varied attributes.  
**Pitfalls**: Mixed types can lead to inconsistent data; use validation where possible.  
**Key Takeaway**: Complex schemas offer flexibility but need careful management.

### 30. How do you fetch data with `$lookup` for joins?  
**Answer**:  
The `$lookup` stage performs a left outer join to combine documents from another collection.  
**Example (Node.js Driver)**:  
```javascript
const { MongoClient } = require("mongodb");
async function fetchWithLookup() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const db = client.db("mydb");
    const result = await db.collection("users").aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "orders"
        }
      }
    ]).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}
fetchWithLookup();
```
**Example (MongoDB Shell)**:  
```javascript
db.users.aggregate([
  { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }
]);
```
**Real-World Use Case**: Fetching user profiles with their orders for a dashboard.  
**Pitfalls**: Joins are slower than embedded data; index foreign keys.  
**Key Takeaway**: `$lookup` enables relational queries but should be optimized.

## Mongoose: Data Fetching and Schema Design (Questions 31–100)

### 31. How do you define a simple schema with Mongoose?  
**Answer**:  
Mongoose uses a `Schema` to define document structure, including data types and validation rules.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number
});
const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = new User({ name: "Alice", email: "alice@example.com", age: 30 });
  await user.save();
  console.log("User created:", user);
}
createUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Defining user profiles for a web application.  
**Pitfalls**: Missing required fields causes validation errors; ensure all required fields are set.  
**Key Takeaway**: Mongoose schemas enforce structure and simplify validation.

### 32. How do you fetch a single document with Mongoose?  
**Answer**:  
Use `Model.findOne` to retrieve the first document matching a query.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model("User", userSchema);

async function fetchOne() {
  const user = await User.findOne({ email: "alice@example.com" });
  console.log(user);
}
fetchOne().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Fetching a user for authentication.  
**Pitfalls**: Returns `null` if no match; handle null cases in code.  
**Key Takeaway**: `findOne` is intuitive for single-document retrieval.

### 33. How do you fetch multiple documents with Mongoose?  
**Answer**:  
Use `Model.find` to retrieve all matching documents as an array.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", userSchema);

async function fetchMany() {
  const users = await User.find({ age: { $gt: 25 } });
  console.log(users);
}
fetchMany().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Listing users for a dashboard.  
**Pitfalls**: Large result sets can impact performance; use `limit` or indexes.  
**Key Takeaway**: `find` is versatile for fetching multiple documents.

### 34. How do you define an embedded schema in Mongoose?  
**Answer**:  
Use nested objects or arrays in a Mongoose schema to embed sub-documents.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  address: {
    city: { type: String, required: true },
    zip: Number
  },
  hobbies: [String]
});
const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = new User({
    name: "Bob",
    address: { city: "New York", zip: 10001 },
    hobbies: ["reading", "gaming"]
  });
  await user.save();
  console.log("User with embedded schema:", user);
}
createUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing user addresses within profiles.  
**Pitfalls**: Large embedded data can hit the 16MB limit; validate sub-document fields.  
**Key Takeaway**: Embedded schemas simplify reads but require size management.

### 35. How do you fetch documents with projection in Mongoose?  
**Answer**:  
Use the `select` method or second argument in `find`/`findOne` to include/exclude fields.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, email: String, age: Number });
const User = mongoose.model("User", userSchema);

async function fetchWithProjection() {
  const users = await User.find({ age: { $gt: 25 } }).select("name email -_id");
  console.log(users);
}
fetchWithProjection().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Retrieving minimal user data for an API response.  
**Pitfalls**: Excluding `_id` requires explicit `-_id`; invalid projections cause errors.  
**Key Takeaway**: Projection reduces data transfer for efficiency.

### 36. How do you sort documents with Mongoose?  
**Answer**:  
Use the `sort` method to order results by field (1 for ascending, -1 for descending).  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", userSchema);

async function sortDocs() {
  const users = await User.find().sort({ age: -1 });
  console.log(users);
}
sortDocs().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Sorting users by age for a leaderboard.  
**Pitfalls**: Sorting without indexes is slow; ensure indexes on sorted fields.  
**Key Takeaway**: Mongoose’s `sort` method simplifies result ordering.

### 37. How do you implement pagination with Mongoose?  
**Answer**:  
Use `skip` and `limit` methods for pagination in queries.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", userSchema);

async function paginateDocs() {
  const page = 2, pageSize = 10;
  const users = await User.find().skip((page - 1) * pageSize).limit(pageSize);
  console.log(users);
}
paginateDocs().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Paginating user lists in a web app.  
**Pitfalls**: Large skips are inefficient; consider range-based pagination.  
**Key Takeaway**: Pagination is straightforward with Mongoose but needs optimization.

### 38. How do you define a schema with references in Mongoose?  
**Answer**:  
Use `ref` in the schema to reference documents in another collection, typically with `ObjectId`.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const addressSchema = new mongoose.Schema({ city: String, zip: Number });
const userSchema = new mongoose.Schema({
  name: String,
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
});
const Address = mongoose.model("Address", addressSchema);
const User = mongoose.model("User", userSchema);

async function createReferenced() {
  const address = new Address({ city: "New York", zip: 10001 });
  await address.save();
  const user = new User({ name: "Charlie", addressId: address._id });
  await user.save();
  console.log("Referenced schema created");
}
createReferenced().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Linking users to addresses for modularity.  
**Pitfalls**: Requires population for fetching referenced data; index `ref` fields.  
**Key Takeaway**: Referenced schemas reduce duplication but need population.

### 39. How do you fetch referenced documents with Mongoose?  
**Answer**:  
Use `populate` to fetch referenced documents in a query.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const addressSchema = new mongoose.Schema({ city: String, zip: Number });
const userSchema = new mongoose.Schema({
  name: String,
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
});
const Address = mongoose.model("Address", addressSchema);
const User = mongoose.model("User", userSchema);

async function fetchPopulated() {
  const user = await User.findOne({ name: "Charlie" }).populate("addressId");
  console.log(user);
}
fetchPopulated().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Displaying user profiles with addresses.  
**Pitfalls**: Population adds query overhead; limit populated fields for performance.  
**Key Takeaway**: `populate` simplifies fetching referenced data but requires optimization.

### 40. How do you use query operators with Mongoose?  
**Answer**:  
Mongoose supports MongoDB query operators (e.g., `$gt`, `$in`) in `find` and other methods.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, age: Number, hobbies: [String] });
const User = mongoose.model("User", userSchema);

async function fetchWithOperators() {
  const users = await User.find({
    age: { $gte: 25, $lte: 35 },
    hobbies: { $in: ["gaming"] }
  });
  console.log(users);
}
fetchWithOperators().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Filtering users by age and hobbies for targeting.  
**Pitfalls**: Ensure indexes on queried fields; complex operators can slow queries.  
**Key Takeaway**: Mongoose makes query operators intuitive but needs indexing.

### 41. How do you define a schema with validation in Mongoose?  
**Answer**:  
Mongoose schemas support built-in and custom validation rules for fields.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^.+@.+\..+$/,
    unique: true
  },
  age: { type: Number, min: 18 }
});
const User = mongoose.model("User", userSchema);

async function createValidatedUser() {
  try {
    const user = new User({ name: "Dave", email: "dave@example.com", age: 20 });
    await user.save();
    console.log("Validated user created");
  } catch (err) {
    console.error("Validation error:", err.message);
  }
}
createValidatedUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Ensuring valid user data during registration.  
**Pitfalls**: Validation errors halt saves; handle errors gracefully.  
**Key Takeaway**: Mongoose validation ensures data integrity at the application level.

### 42. How do you fetch documents with logical operators in Mongoose?  
**Answer**:  
Use logical operators (`$and`, `$or`) in Mongoose queries for complex conditions.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, age: Number, hobbies: [String] });
const User = mongoose.model("User", userSchema);

async function fetchWithLogical() {
  const users = await User.find({
    $or: [{ age: { $gt: 30 } }, { hobbies: "gaming" }]
  });
  console.log(users);
}
fetchWithLogical().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Finding users meeting multiple criteria for analytics.  
**Pitfalls**: Complex logical queries can be slow; simplify and index where possible.  
**Key Takeaway**: Logical operators enhance query flexibility in Mongoose.

### 43. How do you define a schema with arrays in Mongoose?  
**Answer**:  
Define arrays in Mongoose schemas using square brackets with a type or sub-schema.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  hobbies: [String],
  scores: [{ subject: String, score: Number }]
});
const User = mongoose.model("User", userSchema);

async function createArrayUser() {
  const user = new User({
    name: "Eve",
    hobbies: ["reading", "gaming"],
    scores: [{ subject: "math", score: 90 }, { subject: "science", score: 85 }]
  });
  await user.save();
  console.log("User with arrays created");
}
createArrayUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing user hobbies or test scores.  
**Pitfalls**: Large arrays increase document size; consider referencing for large lists.  
**Key Takeaway**: Mongoose arrays are easy to define but need size management.

### 44. How do you query array fields in Mongoose?  
**Answer**:  
Use operators like `$in`, `$all`, or `$elemMatch` in Mongoose queries for arrays.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, hobbies: [String] });
const User = mongoose.model("User", userSchema);

async function queryArray() {
  const users = await User.find({ hobbies: { $all: ["reading", "gaming"] } });
  console.log(users);
}
queryArray().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Finding users with specific hobbies.  
**Pitfalls**: Array queries can be slow without indexes; use sparingly for large arrays.  
**Key Takeaway**: Mongoose simplifies array queries with MongoDB operators.

### 45. How do you fetch nested document fields in Mongoose?  
**Answer**:  
Use dot notation in queries or `select` to access nested fields.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  address: { city: String, zip: Number }
});
const User = mongoose.model("User", userSchema);

async function fetchNested() {
  const users = await User.find({ "address.city": "New York" }).select("name address.city -_id");
  console.log(users);
}
fetchNested().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Retrieving users by city for targeting.  
**Pitfalls**: Deep nesting complicates queries; index nested fields.  
**Key Takeaway**: Dot notation in Mongoose simplifies nested field access.

### 46. How do you define a schema with nested sub-documents in Mongoose?  
**Answer**:  
Use nested schemas or objects to define sub-documents in Mongoose.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const orderSchema = new mongoose.Schema({
  item: String,
  price: Number
});
const userSchema = new mongoose.Schema({
  name: String,
  orders: [orderSchema]
});
const User = mongoose.model("User", userSchema);

async function createSubDocUser() {
  const user = new User({
    name: "Frank",
    orders: [{ item: "Book", price: 20 }, { item: "Pen", price: 5 }]
  });
  await user.save();
  console.log("User with sub-documents created");
}
createSubDocUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing user orders within profiles.  
**Pitfalls**: Large sub-documents can hit size limits; validate sub-document fields.  
**Key Takeaway**: Sub-documents enhance embedded data structure in Mongoose.

### 47. How do you query sub-documents in Mongoose?  
**Answer**:  
Use dot notation or `$elemMatch` to query sub-documents.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  orders: [{ item: String, price: Number }]
});
const User = mongoose.model("User", userSchema);

async function querySubDoc() {
  const users = await User.find({
    orders: { $elemMatch: { item: "Book", price: { $gt: 10 } } }
  });
  console.log(users);
}
querySubDoc().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Finding users with specific order details.  
**Pitfalls**: Sub-document queries can be slow; index array fields.  
**Key Takeaway**: Mongoose simplifies sub-document queries with dot notation.

### 48. How do you perform text searches with Mongoose?  
**Answer**:  
Create a text index and use `$text` with `find` for full-text searches.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const articleSchema = new mongoose.Schema({ content: String }, { indexes: [{ key: { content: "text" } }] });
const Article = mongoose.model("Article", articleSchema);

async function textSearch() {
  const articles = await Article.find({ $text: { $search: "MongoDB tutorial" } });
  console.log(articles);
}
textSearch().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Searching articles for keywords.  
**Pitfalls**: Text indexes are resource-intensive; limit to one per collection.  
**Key Takeaway**: Mongoose supports text searches with proper indexing.

### 49. How do you define a schema for geospatial data in Mongoose?  
**Answer**:  
Use `type: "Point"` and `2dsphere` index for geospatial data.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const placeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }
  }
}, { indexes: [{ key: { location: "2dsphere" } }] });
const Place = mongoose.model("Place", placeSchema);

async function createGeoPlace() {
  const place = new Place({
    name: "Cafe",
    location: { type: "Point", coordinates: [-73.975, 40.757] }
  });
  await place.save();
  console.log("Geospatial place created");
}
createGeoPlace().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing locations for a mapping app.  
**Pitfalls**: Invalid GeoJSON causes errors; ensure proper coordinates.  
**Key Takeaway**: Mongoose simplifies geospatial schemas with built-in support.

### 50. How do you fetch geospatial data with Mongoose?  
**Answer**:  
Use `$near` or `$geoNear` with a `2dsphere` index to fetch nearby locations.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const placeSchema = new mongoose.Schema({
  name: String,
  location: { type: { type: String, enum: ["Point"] }, coordinates: [Number] }
}, { indexes: [{ key: { location: "2dsphere" } }] });
const Place = mongoose.model("Place", placeSchema);

async function fetchGeoNear() {
  const places = await Place.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [-73.975, 40.757] },
        $maxDistance: 1000
      }
    }
  });
  console.log(places);
}
fetchGeoNear().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Finding nearby points of interest.  
**Pitfalls**: Requires a `2dsphere` index; large datasets need optimization.  
**Key Takeaway**: Mongoose makes geospatial queries straightforward.

### 51. How do you define a schema with nested arrays in Mongoose?  
**Answer**:  
Use nested schemas or arrays to define nested arrays for hierarchical data.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const orderSchema = new mongoose.Schema({
  product: String,
  details: [{ key: String, value: String }]
});
const userSchema = new mongoose.Schema({
  name: String,
  orders: [orderSchema]
});
const User = mongoose.model("User", userSchema);

async function createNestedArrayUser() {
  const user = new User({
    name: "Grace",
    orders: [
      { product: "Book", details: [{ key: "color", value: "Blue" }, { key: "size", value: "A5" }] },
      { product: "Pen", details: [{ key: "color", value: "Black" }] }
    ]
  });
  await user.save();
  console.log("Nested array user created");
}
createNestedArrayUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing orders with detailed attributes.  
**Pitfalls**: Deep nesting complicates queries and increases size; avoid excessive nesting.  
**Key Takeaway**: Nested arrays are powerful but require careful design.

### 52. How do you query nested arrays in Mongoose?  
**Answer**:  
Use dot notation or `$elemMatch` for nested array queries.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  orders: [{ product: String, details: [{ key: String, value: String }] }]
});
const User = mongoose.model("User", userSchema);

async function queryNestedArray() {
  const users = await User.find({ "orders.details.value": "Blue" });
  console.log(users);
}
queryNestedArray().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Finding orders with specific attributes.  
**Pitfalls**: Nested queries can be slow; index nested fields.  
**Key Takeaway**: Mongoose simplifies nested array queries with dot notation.

### 53. How do you define a schema with custom validation in Mongoose?  
**Answer**:  
Use `validate` to define custom validation logic for fields.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    validate: {
      validator: v => /^.+@.+\..+$/.test(v),
      message: "Invalid email"
    }
  }
});
const User = mongoose.model("User", userSchema);

async function createCustomValidatedUser() {
  try {
    const user = new User({ name: "Hank", email: "invalid" });
    await user.save();
  } catch (err) {
    console.error("Validation error:", err.message);
  }
}
createCustomValidatedUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Custom email validation for user registration.  
**Pitfalls**: Complex validators can slow saves; keep logic efficient.  
**Key Takeaway**: Custom validation enhances schema flexibility.

### 54. How do you fetch distinct values with Mongoose?  
**Answer**:  
Use `distinct` to retrieve unique values for a field.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, address: { city: String } });
const User = mongoose.model("User", userSchema);

async function fetchDistinct() {
  const cities = await User.distinct("address.city");
  console.log(cities);
}
fetchDistinct().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Listing unique cities for analytics.  
**Pitfalls**: Slow on large collections; index the field.  
**Key Takeaway**: `distinct` simplifies unique value retrieval.

### 55. How do you define a schema for time-series data in Mongoose?  
**Answer**:  
Use a time-series collection with `timeseries` options in Mongoose (MongoDB 5.0+).  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const sensorSchema = new mongoose.Schema({
  timestamp: Date,
  metadata: { sensorId: String },
  value: Number
}, {
  timeseries: { timeField: "timestamp", metaField: "metadata", granularity: "minutes" }
});
const Sensor = mongoose.model("Sensor", sensorSchema);

async function createTimeSeries() {
  const sensor = new Sensor({
    timestamp: new Date(),
    metadata: { sensorId: "S1" },
    value: 25.5
  });
  await sensor.save();
  console.log("Time-series data created");
}
createTimeSeries().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing IoT sensor data.  
**Pitfalls**: Time-series collections have specific constraints; ensure compatibility.  
**Key Takeaway**: Mongoose supports time-series schemas for optimized temporal data.

### 56. How do you fetch time-series data with Mongoose?  
**Answer**:  
Query time-series data using `find` or aggregation with `timestamp` filters.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const sensorSchema = new mongoose.Schema({
  timestamp: Date,
  metadata: { sensorId: String },
  value: Number
}, { timeseries: { timeField: "timestamp", metaField: "metadata" } });
const Sensor = mongoose.model("Sensor", sensorSchema);

async function fetchTimeSeries() {
  const readings = await Sensor.find({
    timestamp: { $gte: new Date("2023-01-01") },
    "metadata.sensorId": "S1"
  });
  console.log(readings);
}
fetchTimeSeries().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Analyzing sensor readings over time.  
**Pitfalls**: Large time ranges can be slow; use aggregation for summaries.  
**Key Takeaway**: Mongoose simplifies time-series queries.

### 57. How do you perform aggregation with Mongoose?  
**Answer**:  
Use `Model.aggregate` to execute aggregation pipelines.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const orderSchema = new mongoose.Schema({ userId: String, amount: Number, status: String });
const Order = mongoose.model("Order", orderSchema);

async function aggregateData() {
  const result = await Order.aggregate([
    { $match: { status: "shipped" } },
    { $group: { _id: "$userId", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } }
  ]);
  console.log(result);
}
aggregateData().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Summarizing user purchases for reports.  
**Pitfalls**: Complex pipelines can be slow; optimize with `$match` and indexes.  
**Key Takeaway**: Mongoose’s aggregation API is powerful and intuitive.

### 58. How do you define a schema with mixed types in Mongoose?  
**Answer**:  
Use `Schema.Types.Mixed` for fields with variable types.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const productSchema = new mongoose.Schema({
  name: String,
  metadata: mongoose.Schema.Types.Mixed
});
const Product = mongoose.model("Product", productSchema);

async function createMixedType() {
  const product = new Product({
    name: "Laptop",
    metadata: { rating: 4.5, inStock: true, tags: ["electronics"] }
  });
  await product.save();
  console.log("Mixed type product created");
}
createMixedType().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing flexible product metadata.  
**Pitfalls**: Mixed types lack validation; use cautiously to avoid inconsistency.  
**Key Takeaway**: `Mixed` types offer flexibility but require careful management.

### 59. How do you fetch data with `$lookup` in Mongoose?  
**Answer**:  
Use `aggregate` with `$lookup` and `populate` for referenced data.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const orderSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, amount: Number });
const userSchema = new mongoose.Schema({ name: String });
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

async function fetchWithLookup() {
  const result = await User.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "userId",
        as: "orders"
      }
    }
  ]);
  console.log(result);
}
fetchWithLookup().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Joining users with orders for reporting.  
**Pitfalls**: `$lookup` is slower than `populate`; use `populate` for simpler cases.  
**Key Takeaway**: Mongoose supports `$lookup` for complex joins.

### 60. How do you define a schema with default values in Mongoose?  
**Answer**:  
Use the `default` property to set default field values.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", userSchema);

async function createDefaultUser() {
  const user = new User({ name: "Ivy" });
  await user.save();
  console.log("User with default createdAt:", user);
}
createDefaultUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Setting creation timestamps for records.  
**Pitfalls**: Defaults don’t apply if fields are explicitly set; ensure correct default logic.  
**Key Takeaway**: Defaults simplify schema initialization.

### 61. How do you fetch data with regex in Mongoose?  
**Answer**:  
Use `$regex` in queries for pattern-based searches.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);

async function fetchWithRegex() {
  const users = await User.find({ name: { $regex: "^A", $options: "i" } });
  console.log(users);
}
fetchWithRegex().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Searching names starting with “A”.  
**Pitfalls**: Regex queries can be slow; use text indexes for full-text search.  
**Key Takeaway**: Mongoose supports regex for flexible searches.

### 62. How do you define a schema for one-to-many relationships in Mongoose?  
**Answer**:  
Use an array of sub-documents or references for one-to-many relationships.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  orders: [{ item: String, price: Number }]
});
const User = mongoose.model("User", userSchema);

async function createOneToMany() {
  const user = new User({
    name: "Jill",
    orders: [{ item: "Book", price: 20 }, { item: "Pen", price: 5 }]
  });
  await user.save();
  console.log("One-to-many user created");
}
createOneToMany().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Storing user orders in profiles.  
**Pitfalls**: Large arrays can hit size limits; consider referencing for many items.  
**Key Takeaway**: Mongoose simplifies one-to-many relationships with arrays.

### 63. How do you fetch documents with array element matching in Mongoose?  
**Answer**:  
Use `$elemMatch` or array operators for precise array matching.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  orders: [{ item: String, price: Number }]
});
const User = mongoose.model("User", userSchema);

async function fetchArrayElement() {
  const users = await User.find({
    orders: { $elemMatch: { item: "Book", price: { $gt: 10 } } }
  });
  console.log(users);
}
fetchArrayElement().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Finding users with specific orders.  
**Pitfalls**: Slow without indexes; index array fields.  
**Key Takeaway**: `$elemMatch` enables precise array queries in Mongoose.

### 64. How do you define a schema for many-to-many relationships in Mongoose?  
**Answer**:  
Use arrays of `ObjectId` references or a separate model for junction data.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const groupSchema = new mongoose.Schema({ name: String });
const userSchema = new mongoose.Schema({
  name: String,
  groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
});
const Group = mongoose.model("Group", groupSchema);
const User = mongoose.model("User", userSchema);

async function createManyToMany() {
  const group = new Group({ name: "Admins" });
  await group.save();
  const user = new User({ name: "Karl", groupIds: [group._id] });
  await user.save();
  console.log("Many-to-many relationship created");
}
createManyToMany().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Managing users and groups in access control.  
**Pitfalls**: Requires population; index reference fields.  
**Key Takeaway**: Mongoose simplifies many-to-many relationships with references.

### 65. How do you fetch many-to-many related data in Mongoose?  
**Answer**:  
Use `populate` to fetch referenced documents in many-to-many relationships.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
});
const User = mongoose.model("User", userSchema);

async function fetchManyToMany() {
  const users = await User.find().populate("groupIds");
  console.log(users);
}
fetchManyToMany().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Displaying user groups in a dashboard.  
**Pitfalls**: Population adds overhead; limit populated fields.  
**Key Takeaway**: `populate` simplifies many-to-many data fetching.

### 66. How do you define a schema with indexes in Mongoose?  
**Answer**:  
Use the `index` method or `indexes` option to create indexes for query performance.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: String,
  email: String
}, { indexes: [{ key: { email: 1 }, unique: true }] });
const User = mongoose.model("User", userSchema);

async function createIndexedUser() {
  const user = new User({ name: "Liam", email: "liam@example.com" });
  await user.save();
  console.log("Indexed user created");
}
createIndexedUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Indexing emails for fast lookups.  
**Pitfalls**: Too many indexes slow writes; analyze query patterns.  
**Key Takeaway**: Mongoose indexes improve query performance.

### 67. How do you fetch data with aggregation and `$match` in Mongoose?  
**Answer**:  
Use `$match` in an aggregation pipeline to filter documents.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", userSchema);

async function aggregateMatch() {
  const result = await User.aggregate([
    { $match: { age: { $gte: 25 } } }
  ]);
  console.log(result);
}
aggregateMatch().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Filtering users for analytics.  
**Pitfalls**: Broad `$match` can process many documents; use indexes.  
**Key Takeaway**: `$match` optimizes aggregation by reducing input.

### 68. How do you define a schema with required fields in Mongoose?  
**Answer**:  
Use `required: true` to enforce mandatory fields.  
**Example (Mongoose)**:  
```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

async function createRequiredUser() {
  try {
    const user = new User({ name: "Mia" }); // Missing email
    await user.save();
  } catch (err) {
    console.error("Validation error:", err.message);
  }
}
createRequiredUser().then(() => mongoose.connection.close());
```
**Real-World Use Case**: Ensuring critical user data is present.  
**Pitfalls**: Missing required fields causes errors;