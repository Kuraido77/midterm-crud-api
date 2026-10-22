## Reflection Questions

### 1. What was the most challenging part of building this API?
The most challenging part was ensuring strict type safety and parameter handling in Express route controllers while configuring TypeORM v0.3 migration workflows. Explicitly casting `req.params.userId as string` to prevent type mismatches inside `parseInt()` and properly structuring entity relationships required precise variable scoping.

### 2. How does TypeORM make database operations easier compared to raw SQL?
TypeORM abstracts SQL queries into TypeScript object methods (`find()`, `findOne()`, `save()`, `remove()`). Instead of writing verbose SQL `INSERT` or `JOIN` statements and manually mapping rows to objects, TypeORM automatically converts database rows into strongly typed TypeScript class instances and manages table relationships automatically.

### 3. Why is it important to exclude the password field from API responses? How did you implement this?
Excluding passwords prevents sensitive credentials from leaking in API response payloads, browser histories, or network logs. This was implemented at two levels:
1. Setting `{ select: false }` on the `@Column()` decorator in `User.ts`.
2. Using object destructuring (`const { password: _, ...userWithoutPassword } = savedUser`) inside controller methods before returning JSON responses.

### 4. Describe a scenario where you would need to use database transactions instead of individual operations.
A financial transaction or order checkout scenario requires database transactions. For instance, creating an order, deducting store inventory, and creating a billing record must all succeed together. If deducting inventory fails, `AppDataSource.transaction()` ensures the created order is completely rolled back to maintain data consistency.

### 5. What is the difference between `synchronize: true` and migrations? When should you use each?
- `synchronize: true`: Automatically mutates the database schema to match entities on application start. It should only be used in local development because it can inadvertently drop tables or rename columns, causing irreversible data loss.
- **Migrations**: Version-controlled SQL script files containing explicit `up()` and `down()` methods. Migrations provide audit trails, allow safe rollbacks, and must be used in production environments.

### 6. If you had to add a `Comment` entity (tasks can have many comments), how would you modify the code?
1. Create `src/entities/Comment.ts` with properties (`id`, `content`, `createdAt`), a `@ManyToOne(() => Task, task => task.comments)` relation, and a `@JoinColumn({ name: 'taskId' })` decorator.
2. Update `src/entities/Task.ts` by adding `@OneToMany(() => Comment, comment => comment.task) comments!: Comment[];`.
3. Register `Comment` in `src/config/data-source.ts`.
4. Run `npm run migration:generate -- src/migrations/AddCommentEntity` and apply it with `npm run migration:run`.

### 7. What security improvements would you make before deploying this API to production?
1. **Password Hashing:** Hash passwords using `bcrypt` or `argon2` before saving them to the database.
2. **Authentication & Authorization:** Implement JWT (JSON Web Tokens) or session-based authentication to protect routes.
3. **Input Validation & Sanitization:** Integrate validation middleware like `zod` or `class-validator`.
4. **Security Headers & Rate Limiting:** Add `helmet` to set secure HTTP headers and `express-rate-limit` to prevent brute-force attacks.

### 8. Why did you need to add the `!` (definite assignment operator) to your entity properties?
With TypeScript's `strictPropertyInitialization` flag enabled in `tsconfig.json`, TypeScript expects class properties to be initialized in the constructor. The `!` operator informs the TypeScript compiler that TypeORM will handle the property initialization at runtime when hydrating entities from database records.

### 9. What are the benefits of explicitly defining column types (e.g., `type: 'varchar'`) in your entities?
Explicit column types ensure reliable database column mapping across different runtimes (`ts-node`, `tsx`, compiled JS) and database drivers. It avoids relying on decorator metadata reflection, which can fail or produce inaccurate database column types during production builds.

### 10. How do relationships in TypeORM differ from foreign keys in raw SQL? What are the advantages?
In raw SQL, foreign keys enforce referential integrity at the database layer, but loading related data requires manual `INNER JOIN` or `LEFT JOIN` queries. In TypeORM, relationship decorators (`@OneToMany`, `@ManyToOne`) map relational foreign keys directly to object properties, allowing nested data loading via options like `relations: ['tasks']`.