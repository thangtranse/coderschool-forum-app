# Coderschool Forum App

# Technology

**Node.js** uses an event-driven, non-blocking I/O model, which allows it to handle a large number of requests efficiently. This makes it well-suited for building high-performance web applications, such as discussion forums, where a large number of users may be concurrently posting and reading content.

**GraphQL** and **MongoDB** are good choices for building a discussion forum app because they offer several benefits:

1. GraphQL:
    - Flexible data querying: GraphQL allows you to define exactly what data you need, reducing the amount of data transferred over the network and making it easier to fetch the exact data required for each component in your app.
    - Efficient and fast: GraphQL can be faster and more efficient than REST APIs for certain types of applications, as it allows you to fetch all of the required data in a single request, rather than multiple requests.
    - Strong type system: GraphQL has a strong type system that makes it easier to catch errors and ensure that your data is always valid.
    - Easy to maintain: GraphQL makes it easy to evolve your API over time, as you can add new fields and types without breaking existing client code.

2. MongoDB:
    - Document-oriented data storage: MongoDB is a document-oriented database, which makes it easy to store and retrieve semi-structured data, such as posts and comments in a discussion forum app.
    - Scalability: MongoDB is designed to scale horizontally, allowing you to easily add more capacity as your discussion forum grows.
    - High performance: MongoDB is designed to be fast and efficient, making it a good choice for storing and retrieving data in real-time.
    - Flexible querying: MongoDB supports flexible and powerful querying, making it easy to retrieve data for your discussion forum app.

In conclusion, **GraphQL** and **MongoDB** are good choices for building a discussion forum app because they offer flexible, efficient, and scalable solutions for querying and storing data.

1. NodeJS
2. GraphQL
3. MongoDb
4. Redis
5. ReactJS
6. Material-UI


# Data model

1. Accounts:
    - Email (String) - Required
    - Password (String) - Required
    - Name (String) - Optional
    - CreatedAt (Date) - Required
    - UpdatedAt (Date) - Required

2. Posts:

    - Title (String) - Required
    - Text (String) - Optional
    - Author (Reference to Accounts) - Required
    - Tags (Array of Strings) - Optional
    - CreatedAt (Date) - Required
    - UpdatedAt (Date) - Required
    - Upvotes (Number) - Required
    - Downvotes (Number) - Required

3. PostComments:

    - Text (String) - Required
    - Author (Reference to Accounts) - Required
    - Post (Reference to Posts) - Required
    - ReplyTo (Reference to PostComments) - Optional
    - CreatedAt (Date) - Required
    - UpdatedAt (Date) - Required
    - Upvotes (Number) - Required
    - Downvotes (Number) - Required
