# 100 Most Asked Backend Development Interview Questions with Detailed Explanations

## Programming Fundamentals

1. **What is the difference between compiled and interpreted languages?**  
   **Explanation**: Compiled languages (e.g., C++, Java) are translated into machine code before execution, offering faster runtime but requiring compilation. Interpreted languages (e.g., Python, JavaScript) are executed line-by-line, providing flexibility but slower performance. Backend developers choose based on performance needs.

2. **Explain the concept of garbage collection.**  
   **Explanation**: Garbage collection automatically reclaims memory from unused objects, reducing memory leaks. Languages like Java and Python use it. It involves mark-and-sweep or reference counting algorithms, but can introduce latency in high-performance systems.

3. **What is a lambda function, and when is it useful?**  
   **Explanation**: A lambda function is an anonymous, inline function defined for short-term use, often in functional programming. In Python, `lambda x: x*2` doubles a value. It’s useful for one-off operations in map, filter, or event handlers, but overuse reduces readability.

4. **What is the difference between static and dynamic typing?**  
   **Explanation**: Static typing (e.g., Java) requires variable types to be declared at compile-time, catching errors early. Dynamic typing (e.g., Python) determines types at runtime, offering flexibility but risking runtime errors. Backend systems often use static typing for robustness.

5. **What is a pure function, and why is it important?**  
   **Explanation**: A pure function produces the same output for the same input and has no side effects (e.g., modifying external state). It enhances predictability and testability, crucial for scalable backend systems using functional programming paradigms.

## Data Structures and Algorithms

6. **How does a trie data structure work?**  
   **Explanation**: A trie (prefix tree) stores strings as a tree where each node represents a character, enabling efficient prefix-based searches (e.g., autocomplete). Operations like insert and search are O(m), where m is the string length, but it uses more memory than other structures.

7. **What is the difference between a binary tree and a binary search tree?**  
   **Explanation**: A binary tree has nodes with at most two children, with no specific order. A binary search tree (BST) orders nodes such that left children are smaller and right children are larger, enabling efficient searching. BSTs are used in indexing and sorting.

8. **Explain the sliding window technique.**  
   **Explanation**: The sliding window technique optimizes problems involving arrays or strings by maintaining a dynamic window of elements, reducing time complexity from O(n²) to O(n). Example: Finding the longest substring with unique characters in a string.

9. **What is a graph, and how is it traversed?**  
   **Explanation**: A graph is a set of nodes connected by edges, used in networks or social graphs. Traversal methods include Depth-First Search (DFS) and Breadth-First Search (BFS), with time complexity O(V + E) for V vertices and E edges. DFS uses recursion or a stack; BFS uses a queue.

10. **How would you implement a least recently used (LRU) cache?**  
    **Explanation**: An LRU cache evicts the least recently used item when full. Implement it using a hash map (O(1) lookup) and a doubly linked list (O(1) insertion/deletion). On access, move the item to the front; on overflow, remove the tail. Example: Caching API responses.

## Databases

11. **What is a foreign key, and why is it used?**  
    **Explanation**: A foreign key is a column in one table that references the primary key of another, enforcing referential integrity. It’s used to maintain relationships (e.g., orders linking to customers) but can slow writes due to constraint checks.

12. **What is a database transaction, and why is it important?**  
    **Explanation**: A transaction is a sequence of operations treated as a single unit, ensuring data consistency (e.g., transferring money). It follows ACID properties, critical for reliability in banking or e-commerce systems where partial updates could cause errors.

13. **What is denormalization, and when is it used?**  
    **Explanation**: Denormalization intentionally introduces redundancy to improve read performance, often in data warehouses or NoSQL databases. It’s used when read-heavy queries outweigh write costs, but it increases storage and update complexity.

14. **What is the difference between a primary key and a unique key?**  
    **Explanation**: A primary key uniquely identifies each record and cannot be null, while a unique key ensures uniqueness but allows nulls (in some databases). Primary keys are used for record identification; unique keys enforce constraints like unique emails.

15. **What is a materialized view, and how does it differ from a regular view?**  
    **Explanation**: A materialized view stores query results physically, updating periodically, unlike a regular view, which is a virtual table recomputed on access. Materialized views improve performance for complex queries but require storage and refresh management.

## APIs and Web Services

16. **What is gRPC, and how does it differ from REST?**  
    **Explanation**: gRPC is a high-performance RPC framework using HTTP/2 and Protocol Buffers. Unlike REST, which is resource-based and uses JSON, gRPC is action-based, faster, and supports bidirectional streaming, ideal for microservices with strict performance needs.

17. **What is the purpose of an API gateway?**  
    **Explanation**: An API gateway acts as a reverse proxy, routing requests to backend services, handling authentication, rate limiting, and monitoring. It simplifies client interactions and centralizes cross-cutting concerns, used in systems like AWS API Gateway.

18. **What is the difference between SOAP and REST?**  
    **Explanation**: SOAP is a protocol with strict standards, using XML for messaging, often in enterprise systems. REST is an architectural style, using JSON/HTTP, simpler and more flexible. REST is preferred for web APIs due to its scalability and ease of use.

19. **What is HATEOAS in REST APIs?**  
    **Explanation**: HATEOAS (Hypermedia as the Engine of Application State) includes links in API responses to guide clients on possible actions (e.g., next page, delete resource). It makes APIs self-discoverable but adds complexity, often underused in practice.

20. **What is the purpose of an API specification like OpenAPI?**  
    **Explanation**: An API specification (e.g., OpenAPI/Swagger) defines the structure, endpoints, and data formats of an API, enabling automated documentation, testing, and client generation. It ensures consistency and clarity in API development.

## System Design

21. **How would you design a file storage system like Dropbox?**  
    **Explanation**: Key components include a chunked file storage system (e.g., S3), metadata database (e.g., DynamoDB), client sync logic, and conflict resolution. Use sharding for scalability, versioning for updates, and encryption for security.

22. **What is a content delivery network (CDN), and how does it work?**  
    **Explanation**: A CDN caches static content (e.g., images, videos) on edge servers closer to users, reducing latency. It uses DNS to route requests to the nearest server. CDNs like Cloudflare also provide security and load balancing.

23. **What is the difference between eventual and strong consistency?**  
    **Explanation**: Strong consistency ensures all reads reflect the latest write, ideal for critical systems like banking. Eventual consistency allows temporary inconsistencies for better availability, used in NoSQL databases like DynamoDB for non-critical data.

24. **How would you design a chat application like WhatsApp?**  
    **Explanation**: Use WebSockets for real-time messaging, a message queue (e.g., Kafka) for delivery, and a database (e.g., Cassandra) for storage. Implement end-to-end encryption, group chat support, and read receipts with scalable infrastructure.

25. **What is a load balancer’s sticky session?**  
    **Explanation**: Sticky sessions route a user’s requests to the same server based on session ID, ensuring session continuity. It’s used in stateful applications but can cause uneven load distribution, mitigated by stateless designs or session stores like Redis.

## Security

26. **What is XSS, and how can it be prevented?**  
    **Explanation**: Cross-Site Scripting (XSS) injects malicious scripts into web pages viewed by users. Prevention includes sanitizing inputs, escaping outputs, and using Content Security Policy (CSP) headers. Libraries like DOMPurify help sanitize HTML.

27. **What is a man-in-the-middle (MITM) attack, and how is it mitigated?**  
    **Explanation**: MITM attacks intercept communication between client and server. Mitigation includes using HTTPS with TLS, certificate pinning, and HSTS to enforce secure connections. Public key infrastructure ensures trusted certificates.

28. **What is a secure hash algorithm, and why is it used?**  
    **Explanation**: A secure hash algorithm (e.g., SHA-256) generates a fixed-length, irreversible hash from input data, used for password storage, data integrity, and digital signatures. It ensures data cannot be reverse-engineered, unlike encryption.

29. **What is the principle of least privilege in security?**  
    **Explanation**: The principle of least privilege grants users or processes only the permissions needed for their tasks. In backend systems, it limits database access, API permissions, or server roles, reducing the impact of breaches.

30. **What is a security token, and how is it used?**  
    **Explanation**: A security token (e.g., JWT, OAuth token) is a credential used to authenticate or authorize users. It’s included in API requests to verify identity or permissions, ensuring secure access to resources in distributed systems.

## Concurrency and Multithreading

31. **What is a mutex, and how does it differ from a semaphore?**  
    **Explanation**: A mutex (mutual exclusion) locks a resource for exclusive access by one thread, preventing race conditions. A semaphore controls access with a counter, allowing multiple threads. Mutexes are simpler for single-resource locking.

32. **What is thread starvation, and how can it be avoided?**  
    **Explanation**: Thread starvation occurs when a thread is perpetually denied resources due to higher-priority threads. Avoidance includes fair scheduling, priority queues, or lock-free algorithms to ensure all threads get access.

33. **What is the dining philosophers problem?**  
    **Explanation**: This concurrency problem illustrates deadlock and resource contention, where philosophers need shared forks to eat. Solutions include resource hierarchy, timeouts, or using a waiter to allocate resources, demonstrating synchronization techniques.

34. **What is a condition variable, and how is it used?**  
    **Explanation**: A condition variable allows threads to wait for a condition to become true, used with a mutex. It’s efficient for signaling events (e.g., producer-consumer). In Java, `wait()` and `notify()` serve similar purposes.

35. **What is the difference between a process fork and a thread spawn?**  
    **Explanation**: Forking creates a new process with separate memory, used in systems like Unix for parallel tasks. Spawning a thread creates a lightweight execution unit within the same process, sharing memory, used for concurrent tasks in web servers.

## Networking

36. **What is the OSI model, and how does it relate to backend development?**  
    **Explanation**: The OSI model defines seven layers (Physical to Application) for network communication. Backend developers focus on the Application layer (e.g., HTTP) and Transport layer (e.g., TCP), ensuring reliable API and service communication.

37. **What is a WebSocket, and when is it used?**  
    **Explanation**: WebSocket provides full-duplex, persistent communication over a single connection, unlike HTTP’s request-response model. It’s used in real-time applications like chat, gaming, or live notifications, implemented in frameworks like Socket.IO.

38. **What is NAT, and how does it affect backend systems?**  
    **Explanation**: Network Address Translation (NAT) maps private IP addresses to public ones, enabling multiple devices to share a single public IP. In backend systems, NAT can complicate direct connections (e.g., WebRTC), requiring STUN/TURN servers.

39. **What is the difference between IPv4 and IPv6?**  
    **Explanation**: IPv4 uses 32-bit addresses (e.g., 192.168.0.1), limited to 4.3 billion addresses. IPv6 uses 128-bit addresses, supporting vastly more devices. Backend systems must support IPv6 for future-proofing as IPv4 addresses deplete.

40. **What is a reverse DNS lookup, and why is it used?**  
    **Explanation**: A reverse DNS lookup resolves an IP address to a domain name, opposite of standard DNS. It’s used in backend systems for security (e.g., verifying email servers) or logging to map IPs to meaningful names.

## Performance Optimization

41. **What is query optimization in databases?**  
    **Explanation**: Query optimization improves database query performance by selecting the best execution plan. Techniques include indexing, rewriting queries, or using query hints. Tools like MySQL’s EXPLAIN or PostgreSQL’s ANALYZE help identify inefficiencies.

42. **What is connection keep-alive, and why is it important?**  
    **Explanation**: Connection keep-alive reuses TCP connections for multiple HTTP requests, reducing latency and resource usage. It’s critical for high-traffic backend systems to improve performance, enabled via HTTP headers like `Connection: keep-alive`.

43. **What is database partitioning, and how does it differ from sharding?**  
    **Explanation**: Partitioning divides a single database table into smaller parts within one server (e.g., by range or hash). Sharding distributes data across multiple servers. Partitioning improves local performance; sharding enhances scalability.

44. **What is the role of a profiler in performance optimization?**  
    **Explanation**: A profiler analyzes code execution to identify bottlenecks (e.g., slow functions, memory leaks). Tools like Java’s VisualVM or Python’s cProfile help backend developers optimize CPU, memory, or I/O usage for better performance.

45. **What is batch processing, and when is it used?**  
    **Explanation**: Batch processing handles large data volumes in groups, reducing overhead. It’s used in backend systems for tasks like ETL (Extract, Transform, Load), log analysis, or billing calculations, often with tools like Apache Spark.

## Testing and Debugging

46. **What is property-based testing?**  
    **Explanation**: Property-based testing generates random inputs to verify code properties (e.g., a sorting function always returns sorted output). Tools like QuickCheck (Haskell) or Hypothesis (Python) ensure robustness but require defining clear properties.

47. **What is a smoke test, and why is it used?**  
    **Explanation**: A smoke test verifies the basic functionality of a system to ensure it’s stable enough for further testing. In backend development, it checks critical endpoints or database connectivity before full regression testing.

48. **What is the difference between black-box and white-box testing?**  
    **Explanation**: Black-box testing focuses on inputs and outputs without knowing the code’s internals, ideal for API testing. White-box testing examines code structure, used for unit tests. Both ensure backend reliability but differ in visibility.

49. **What is log aggregation, and why is it important?**  
    **Explanation**: Log aggregation collects logs from multiple services into a centralized system (e.g., ELK Stack, Splunk) for analysis. It’s critical in distributed systems to debug issues, monitor performance, and detect anomalies across microservices.

50. **What is chaos engineering, and how is it applied?**  
    **Explanation**: Chaos engineering intentionally introduces failures (e.g., shutting down servers) to test system resilience. Tools like Chaos Monkey help backend teams ensure fault tolerance and high availability in production environments.

## Frameworks and Tools

51. **What is Flask, and how does it differ from Django?**  
    **Explanation**: Flask is a lightweight Python web framework for building APIs with minimal setup, offering flexibility. Django is a full-stack framework with built-in features like ORM and admin panels. Flask suits small projects; Django suits complex applications.

52. **What is Express.js, and why is it popular?**  
    **Explanation**: Express.js is a minimal Node.js framework for building web servers and APIs. Its popularity stems from simplicity, middleware support, and compatibility with JavaScript ecosystems, making it ideal for real-time or RESTful applications.

53. **What is the role of a build tool like Maven or Gradle?**  
    **Explanation**: Build tools automate dependency management, compilation, testing, and deployment. Maven uses XML for configuration; Gradle uses Groovy/Kotlin for flexibility. They streamline backend development for Java projects, ensuring consistency.

54. **What is GraphQL, and how is it implemented in backend systems?**  
    **Explanation**: GraphQL is a query language allowing clients to request specific data. Backend implementation involves defining a schema, resolvers, and a server (e.g., Apollo). It reduces over-fetching compared to REST but requires careful query optimization.

55. **What is Ansible, and how is it used in backend deployment?**  
    **Explanation**: Ansible is an automation tool for configuring and deploying servers using YAML playbooks. In backend development, it automates server setup, application deployment, and configuration management, ensuring consistent environments.

## Cloud and DevOps

56. **What is a container orchestrator, and why is it used?**  
    **Explanation**: A container orchestrator (e.g., Kubernetes, Docker Swarm) manages container deployment, scaling, and networking. It’s used in backend systems to ensure high availability, load balancing, and fault tolerance for microservices.

57. **What is the difference between a public and private cloud?**  
    **Explanation**: A public cloud (e.g., AWS, Azure) is shared infrastructure managed by providers, offering scalability but less control. A private cloud is dedicated to one organization, providing control and security but higher costs. Hybrid clouds combine both.

58. **What is a serverless function, and how is it implemented?**  
    **Explanation**: A serverless function (e.g., AWS Lambda) runs code in response to events without managing servers. Implementation involves defining triggers (e.g., HTTP requests) and writing stateless code, ideal for event-driven backend tasks.

59. **What is the role of a CI/CD pipeline in backend development?**  
    **Explanation**: A CI/CD pipeline automates code integration, testing, and deployment, reducing errors and speeding delivery. Tools like Jenkins or GitLab CI run tests, build artifacts, and deploy to production, ensuring reliable backend updates.

60. **What is blue-green deployment vs. canary deployment?**  
    **Explanation**: Blue-green deployment switches traffic between two identical environments for zero-downtime updates. Canary deployment releases updates to a small user subset first, monitoring for issues. Both minimize risk in backend deployments.

## Error Handling and Logging

61. **What is structured logging, and why is it preferred?**  
    **Explanation**: Structured logging formats logs as structured data (e.g., JSON) rather than plain text, enabling easier parsing and analysis. It’s preferred in backend systems for integration with tools like Logstash or Splunk, improving debugging in distributed environments.

62. **What is an error boundary in backend systems?**  
    **Explanation**: An error boundary catches and handles errors to prevent system crashes, often implemented in middleware (e.g., Express error handlers). It logs errors, returns user-friendly responses, and maintains system stability.

63. **What is the difference between fatal and non-fatal errors?**  
    **Explanation**: Fatal errors (e.g., database connection loss) cause system failure, requiring immediate attention. Non-fatal errors (e.g., invalid user input) are recoverable, handled with retries or user feedback. Backend systems prioritize logging both for analysis.

64. **What is a health check endpoint, and why is it used?**  
    **Explanation**: A health check endpoint (e.g., `/health`) returns the status of a backend service, used by load balancers or monitoring tools to verify availability. It checks dependencies like databases or caches, ensuring system reliability.

65. **What is the role of a fallback mechanism in error handling?**  
    **Explanation**: A fallback mechanism provides alternative behavior when a primary operation fails (e.g., using cached data if a database query fails). It improves resilience in backend systems, ensuring graceful degradation under failure.

## Scalability and Distributed Systems

66. **What is a distributed lock, and when is it used?**  
    **Explanation**: A distributed lock (e.g., using Redis or ZooKeeper) synchronizes access to shared resources across multiple servers. It’s used in distributed systems to prevent race conditions, like ensuring only one instance processes a task.

67. **What is the difference between a monolithic and SOA architecture?**  
    **Explanation**: Monolithic architecture combines all functionality into one application, simplifying development but limiting scalability. Service-Oriented Architecture (SOA) organizes services around business functions, enabling reuse and scalability but increasing complexity.

68. **What is a message broker, and how does it differ from a message queue?**  
    **Explanation**: A message broker (e.g., RabbitMQ) routes and transforms messages between producers and consumers, while a message queue stores messages for processing. Brokers offer advanced routing; queues focus on ordered delivery.

69. **What is the role of a distributed cache?**  
    **Explanation**: A distributed cache (e.g., Redis, Memcached) stores data across multiple nodes, improving performance and scalability in distributed systems. It’s used for session storage, query caching, or rate limiting in backend applications.

70. **What is a consensus algorithm, and why is it important?**  
    **Explanation**: A consensus algorithm (e.g., Raft, Paxos) ensures agreement among distributed nodes on a single state, critical for data consistency in systems like ZooKeeper or etcd. It’s used in leader election or replicated databases.

## Authentication and Authorization

71. **What is SAML, and how does it work?**  
    **Explanation**: Security Assertion Markup Language (SAML) enables single sign-on by exchanging XML-based assertions between an identity provider and service provider. It’s used in enterprise systems for secure, federated authentication across applications.

72. **What is a refresh token, and how is it used?**  
    **Explanation**: A refresh token is a long-lived credential used to obtain new access tokens without re-authentication. In OAuth, it’s stored securely and sent to the authorization server to refresh short-lived access tokens, enhancing security.

73. **What is attribute-based access control (ABAC)?**  
    **Explanation**: ABAC grants access based on attributes (e.g., user role, location) rather than fixed roles. It offers fine-grained control, used in complex backend systems to enforce policies like “only managers in the US can access X.”

74. **What is multi-factor authentication (MFA)?**  
    **Explanation**: MFA requires multiple verification methods (e.g., password, SMS code, biometrics) to authenticate users, enhancing security. Backend systems implement MFA via libraries or services like Auth0, critical for sensitive applications.

75. **What is token revocation, and why is it needed?**  
    **Explanation**: Token revocation invalidates tokens (e.g., JWT, OAuth) before expiration, used when a user logs out or a token is compromised. It requires a revocation list or database, ensuring unauthorized access is prevented.

## Advanced Topics

76. **What is a circuit breaker’s half-open state?**  
    **Explanation**: In the circuit breaker pattern, the half-open state allows limited requests to a recovering service to test its health. If successful, the circuit closes; if not, it reopens. It prevents overwhelming a recovering system.

77. **What is CQRS, and when is it used?**  
    **Explanation**: Command Query Responsibility Segregation (CQRS) separates read and write operations into different models, improving scalability and performance. It’s used in complex systems (e.g., e-commerce) where read and write patterns differ significantly.

78. **What is a distributed tracing system?**  
    **Explanation**: Distributed tracing (e.g., Jaeger, Zipkin) tracks requests across microservices, providing visibility into latency and errors. It’s critical for debugging and optimizing performance in distributed backend systems.

79. **What is the role of a service registry in microservices?**  
    **Explanation**: A service registry (e.g., Eureka, Consul) maintains a dynamic list of service instances and their locations, enabling service discovery. It supports load balancing and fault tolerance in microservices architectures.

80. **What is a domain-driven design (DDD)?**  
    **Explanation**: DDD aligns software design with business domains, using concepts like entities, aggregates, and bounded contexts. It’s used in complex backend systems to ensure code reflects business logic, improving maintainability.

## Practical Coding Questions

81. **Write a function to check if a string is a palindrome in Java.**  
    **Explanation**: Use two pointers (start and end) to compare characters, ignoring case and non-alphanumeric characters. Time complexity is O(n), space O(1) for in-place checks. Handle edge cases like empty strings or single characters.

82. **Implement a REST API endpoint in Spring Boot to create a user.**  
    **Explanation**: Use `@PostMapping` with Spring Boot, validate input with `@Valid`, and save to a database using JPA. Return appropriate HTTP status codes (e.g., 201 Created). Include error handling for duplicate users or invalid data.

83. **Write a SQL query to find duplicate emails in a table.**  
    **Explanation**: Use `SELECT email, COUNT(*) as count FROM users GROUP BY email HAVING count > 1;`. This groups emails and filters for duplicates. Optimize with an index on the email column for large datasets.

84. **Implement a queue using two stacks in Python.**  
    **Explanation**: Use one stack for enqueue (push) and another for dequeue (pop after transferring from the first stack). Enqueue is O(1), dequeue is O(n) amortized. Ensure thread safety for concurrent access in backend systems.

85. **Write code to validate an email address format in Node.js.**  
    **Explanation**: Use a regular expression (e.g., `/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/`) to validate email format. Include edge case handling and return meaningful errors. Libraries like `validator` can simplify the task.

## Problem-Solving and Scenarios

86. **How would you handle a database outage in production?**  
    **Explanation**: Implement failover to a replica database, use caching to serve stale data, and notify users of degraded functionality. Log the outage, investigate root causes, and restore the primary database with minimal data loss.

87. **What steps would you take to optimize a slow webpage load?**  
    **Explanation**: Profile backend APIs, optimize database queries, and cache static content with a CDN. Compress responses (e.g., Gzip), minimize payload size, and use asynchronous processing to reduce server load.

88. **How would you secure sensitive data in a backend system?**  
    **Explanation**: Encrypt data at rest (e.g., AES-256) and in transit (HTTPS/TLS). Use environment variables for secrets, implement least privilege access, and regularly rotate keys. Audit logs track access to sensitive data.

89. **How would you design a recommendation system?**  
    **Explanation**: Use collaborative filtering or content-based algorithms, storing user preferences in a database (e.g., Redis for speed). Process data with machine learning (e.g., TensorFlow) or simple rules, and cache results for performance.

90. **What would you do if an API endpoint is returning incorrect data?**  
    **Explanation**: Check logs and input data, reproduce the issue in a test environment, and verify business logic. Use debugging tools to trace the error, fix the code, and add tests to prevent regression. Communicate with stakeholders if needed.

## Miscellaneous

91. **What is the role of an API client library?**  
    **Explanation**: An API client library provides a programmatic interface to interact with an API, abstracting HTTP requests. It simplifies integration for developers, improves maintainability, and is generated from specs like OpenAPI.

92. **What is a service-level agreement (SLA)?**  
    **Explanation**: An SLA defines the expected performance and availability of a service (e.g., 99.9% uptime). In backend systems, SLAs guide infrastructure design, monitoring, and incident response to meet business requirements.

93. **What is the difference between a hot and cold standby?**  
    **Explanation**: A hot standby is a fully operational backup system ready to take over instantly, used for high-availability systems. A cold standby requires manual setup, used for cost savings but with longer recovery times.

94. **What is API throttling, and how is it implemented?**  
    **Explanation**: API throttling limits the number of requests a client can make to prevent overload. It’s implemented using rate-limiting algorithms (e.g., token bucket) in middleware or API gateways like Kong, returning 429 on excess.

95. **What is the purpose of a load test?**  
    **Explanation**: A load test simulates high traffic to measure system performance under stress. Tools like JMeter or Locust help identify bottlenecks, ensuring backend systems scale effectively for peak usage.

96. **What is a feature flag, and how is it used?**  
    **Explanation**: A feature flag toggles functionality without code changes, enabling gradual rollouts or A/B testing. In backend systems, it’s implemented with configuration files or services like LaunchDarkly, improving deployment flexibility.

97. **What is the difference between a database trigger and a stored procedure?**  
    **Explanation**: A trigger automatically executes on database events (e.g., insert), while a stored procedure is explicitly called. Triggers enforce rules (e.g., updating logs), while stored procedures handle complex logic, both reducing application code.

98. **What is a sidecar pattern in microservices?**  
    **Explanation**: The sidecar pattern deploys a helper container alongside a main application container to handle cross-cutting concerns (e.g., logging, monitoring). It’s used in Kubernetes to modularize functionality without modifying the main app.

99. **What is the role of a reverse proxy in microservices?**  
    **Explanation**: A reverse proxy routes client requests to appropriate microservices, providing load balancing, caching, and security. Tools like NGINX or Traefik simplify routing and authentication in distributed systems.

100. **What is the importance of documentation in backend development?**  
     **Explanation**: Documentation ensures maintainability, onboarding, and API usability. It includes code comments, API specs (e.g., OpenAPI), and architecture diagrams. Tools like Swagger or Confluence centralize documentation for team collaboration.