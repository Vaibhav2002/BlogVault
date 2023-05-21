# **BlogVault** Backend

## Technical details 💡

- BlogVault's Backend is created using NodeJS, ExpressJS, MongoDB and Redis.
- BlogVault uses [PassportJS](http://www.passportjs.org) for all authentication methods like Email-password and Social
  Sign-ins.
- BlogVault's backend has the feature to upload images, and it also scales down the images for better storage and
  performance.
- BlogVault's backend **checks images for their type**, so no one can upload other files with image extensions.
- BlogVault uses [Redis](https://redis.io) for caching and storing sessions.
- BlogVault's backend is deployed on my own **Server using [Nginx](https://www.nginx.com)**.
- BlogVault **validates emails** by sending verification emails using Nodemailer.
- BlogVault's Rest APIs are protected using **Rete Limiting**, so its not possible to spam the APIs and cause a DDOS
  attack.

## Tech Stack

- [NodeJs](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [ExpressJs](https://expressjs.com) - Fast, un-opinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com) - MongoDB is a general purpose, document-based, distributed database built for
  modern application developers and for the cloud era.
- [Redis](https://redis.io) - Redis is an open source (BSD licensed), in-memory data structure store, used as a
  database, cache, and message broker.
- [PassportJs](http://www.passportjs.org) - Passport is authentication middleware for Node.js. Extremely flexible and
  modular, Passport can be unobtrusively dropped in to any Express-based web application.
- [Nodemailer](https://nodemailer.com) - Nodemailer is a module for Node.js applications to allow easy as cake email
  sending.
- [Multer](https://github.com/expressjs/multer) - Multer is a node.js middleware for handling multipart/form-data, which
  is primarily used for uploading files.
- [Sharp](https://sharp.pixelplumbing.com) - The typical use case for this high speed Node.js module is to convert large
  images in common formats to smaller, web-friendly JPEG, PNG, WebP and AVIF images of varying dimensions.
- [Bcrypt](https://github.com/dcodeIO/bcrypt.js) - A library to help you hash passwords.
- [Express Session](https://www.npmjs.com/package/express-session) - Simple session middleware for Express.
- [yup](https://github.com/jquense/yup) - Yup is a JavaScript schema builder for value parsing and validation.
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js.
- [Http Errors](https://www.npmjs.com/package/http-errors) - Create HTTP errors for Express, Koa, Connect, etc. with
  ease.
- [Lodash](https://lodash.com) - A modern JavaScript utility library delivering modularity, performance & extras.

## Package Structure

```
src
.
├── config                      # Config files for PassportJs, Redis and more
├── controllers                 # Controller files for handling API Routes
├── datasources                 # Datasouces for handing Database related operations
├── middlewares                 # Middleware files for handling API Routes
├── models                      # Models for handling data
|   └── entities                # Database Entities and Schemas for handling data
|   
├── routes                      # Routes for handling API Routes
├── utils                       # Utility functions for the project
└── validation                  # Yup validation schemas for validating API Requests
```

## Project Setup

### Prerequisites

- [Google Client ID and Secret](https://developers.google.com/identity/protocols/oauth2) - You need to create a Google
  OAuth 2.0 Client ID and Secret for Google Sign-in (for callback or redirect url write the redirect URL you used in
  PassportJS Google OAuth2 Route)
- [GitHub Client ID and Secret](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) -
  You need to create a GitHub OAuth 2.0 Client ID and Secret for GitHub Sign-in (for callback or redirect url write the
  redirect URL you used in PassportJS GitHub OAuth2 Route)
- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/) - You need to create a
  MongoDB Instance and get its Connection String for connecting to MongoDB
- [Mailing Provider](https://nodemailer.com/smtp/) - You can use any transactional Email provider, here I've
  used [Send in Blue](https://www.sendinblue.com) for sending verification emails


1) Clone this project. You can directly download the source code .zip file, or you can use the git clone command in
   terminal
2) Once successful, open your preferred IDE and run some tasks and write some setup code.
3) Navigate to backend directory
4) Run the following commands in your terminal

    ```
    npm install
    ```

5) Create a .env file in the root directory of the project and add the following environment variables

    ```
    NODE_ENV="development"           # or production
    PORT=8080                        # or any other port
    MONGO_CONNECTION_STRING=         # Your MongoDB Connection String
    WEBSITE_URL=                     # Your Website URL or http://localhost:3000 for development
    SERVER_URL=                      # Your Server URL or http://localhost:<port> for development
    PWD_SALTING_ROUNDS=10            # Number of rounds for salting password
    SESSION_SECRET=                  # Your Session Secret, could be any random string
    
    GOOGLE_CLIENT_ID=                # Your Google Client ID
    GOOGLE_CLIENT_SECRET=            # Your Google Client Secret
    
    GITHUB_CLIENT_ID=                # Your Github Client ID
    GITHUB_CLIENT_SECRET=            # Your Github Client Secret
    
    SMTP_HOST=                       # Your SMTP Host of your email provider
    SMTP_PORT=                       # Your SMTP Port of your email provider
    SMTP_EMAIL=                      # Your SMTP Email you entered in your email provider
    SMTP_PWD=                        # Your SMTP Password you entered in your email provider
    ```

6) Run the following command in your terminal

    ```
    npm start
    ```

7) Hurray! Now your backend server is running on the port you specified in the .env file