1. What was the most challenging part of building this API?
The most challenging part was configuring TypeScript decorator metadata options (experimentalDecorators and emitDecoratorMetadata) so that TypeORM could properly interpret the entity classes, along with managing clean asynchronous error handling across all CRUD endpoints.

2. How does TypeORM make database operations easier compared to raw SQL?
TypeORM maps database tables directly to TypeScript classes (entities) and provides built-in repository methods like find, save, and remove. This removes the need to write manual SQL query strings, minimizes syntax errors, and adds compile-time type safety.

3. Why is it important to exclude the password field from API responses? How did you implement this?
Excluding passwords prevents sensitive user credentials from being exposed in client responses, logs, or network traffic. This was implemented by setting select: false on the password column in the entity and using object destructuring in the controller to strip the password before sending the response.

4. Describe a scenario where you would need to use database transactions instead of individual operations.
Transactions are necessary during operations like an e-commerce checkout, where you must create an order and decrease inventory stock simultaneously. If decreasing stock fails, the transaction rolls back the order creation to keep the database consistent.

5. What is the difference between synchronize: true and migrations? When should you use each?
synchronize: true automatically updates database tables to match entity definitions on app startup and should be used only during local development. Migrations use version-controlled scripts for explicit, incremental schema updates and should be used in production to protect data.

6. If you had to add a Product entity with a relationship to User (a user can have many products), how would you modify the code?
You would create a Product entity using a @ManyToOne decorator pointing to the User, add a corresponding @OneToMany relation property inside the User entity, and include the Product entity in the data source configuration.

7. What security improvements would you make before deploying this API to production? (Hint: password hashing, rate limiting, authentication, etc.)
You should implement password hashing with bcrypt, set up authentication using JSON Web Tokens (JWT), add rate limiting to prevent spam and brute-force attacks, and apply robust input validation.