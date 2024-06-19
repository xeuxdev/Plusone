# PlusOne Coding Assessment 2: Create a blogging platform

**Project Name:** PlusOne Blog

**Description:**

This project is a blog application that empowers users to create, manage, and interact with content. Here's what you can expect:

- User Management: Sign up, log in, and log out functionalities
- Content Creation: Craft compelling blog posts using a user-friendly interface with markdown support for rich text formatting.
- Post Management: Create, read, update, and delete blog posts with ease. Edit your existing content and keep your blog fresh.
- Commenting System: Allow users to leave comments on blog posts. This creates a dynamic platform for community interaction.
- Search Functionality: Find specific content quickly using a built-in search function. Users can easily locate relevant posts based on keywords or topics.
- Backend: The application is powered by a secure and efficient backend API that handles user authentication and blog post management seamlessly.

To view the live site, [Click here](https://plusone-eight.vercel.app/)

**Table of Contents:**

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Built With](#built-with)

## Prerequisites

- Node.js installed on your computer. To install visit [Node.js](https://nodejs.org/en)
- A local or hosted instance of the `mysql` database.

## Getting Started

This section provides instructions on how to set up and run the project locally.

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/xeuxdev/Plusone.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd [your-project-name]
   ```

3. **Install Dependencies:**

cd into the frontend and backend folders, then run:

```bash
pnpm install  # or yarn install or npm install
```

4. **Setup Environment Variables**

in the respective folders, create a `.env` file and insert the following:

- Frontend

  ```bash
  VITE_API_URL="http://localhost:3000/api/v1"
  VITE_UPLOAD_PRESET="---" # your cloudinary upload preset
  VITE_UPLOAD_CLOUD_NAME="your-cloudinary-cloud-name"
  ```

- Backend

  ```bash
  PORT=3000
  DATABASE_URL="mysql://<username>:<password>@<host>/<database-name>"
  JWT_SECRET="your-secret-here"
  FRONTEND_URL="http://localhost:5173" # link to frontend app, don't add a trailing `/`
  ```

- To generate the `JWT_SECRET`, you can run this command in your terminal.

  ```bash
  openssl rand  --hex 32
  ```

5. **(Optional) Start the Development Server:**

- Frontend

  - cd into the frontend folder

    ```bash
    cd frontend
    ```

  - start the server

    ```bash
    pnpm dev # or yarn dev or npm run dev
    ```

- Backend

  - cd into the backend folder

    ```bash
    cd backend
    ```

  - start the server

    ```bash
    pnpm dev # or yarn dev or npm run dev
    ```

  This will typically start a development server that allows you to test the project locally.

## Usage

- Sign up, Login & Logout
- Create, Read, Update, Delete Blog posts
- Search for blog posts (all users)
- view blog posts (all users)
- commenting system (available to all users)

## Built With

- Frontend
  - React
  - TailwindCSS
- Backend
  - Node.js
  - Express.js
- Database
  - MySQL

## Overview of the Approach

So a brief overview of my approach to building this app is as follows:

### **The Project setup**

I Opted to use a monorepo style for the codebase where i have a frontend and backend folder separately. This was because it is easy to manage them in a single repo as well as to deploy to separate services. For the database, i used a local database when developing and a hosted database on [Render](https://render.com) for the live site.

- **Frontend**:
  - initialized a new project with vite & TypeScript, setup tailwind for styling and Shadcn UI for composable, reuseable and fully customizable components.
- **Backend**:

  - Set up an Express.js project with TypeScript, opted to use prisma as an ORM, since i could switch databases with minimal efforts.

- **Database**:
  - Set up MySQL for the relational database, created a seed file and seeded the database with placeholder data.

### **Backend Development**

- **Folder Structure**:
  - I wanted to keep this very simple so I setup the files i would need, the controllers, the routes, middleware, configs and utility functions,
- **Middleware**:
  - Implement middleware for request parsing and user verification.
- **API Endpoints**:
  - Create RESTful API endpoints using Express.js under the routes folder for user management and CRUD operations on blog posts.
- **Authentication**:
  - Implement user authentication using JWT (JSON Web Tokens)
- **Database Interaction**:
  - Used prisma ORM to safely interact with the database under the controllers which handle the requests and return responses.

### **Frontend Development**

- A component should have minimal business with / knowledge of how the data it displays is fetched, the way the mutations work, queries and mutations are handled in their own custom hooks. A central place for all api paths to make it easy for future changes without breaking.

- **Folder Structure**:
  - /pages -> for all pages,
  - /components -> for any kind of components (reuseable / single use).
  - /api -> for api integrating functions and hooks.
  - /hooks -> for hooks.
  - /lib -> for interfacing with external libraries and for utility functions.
  - /providers -> for components that wrap the app with context.
  - /store -> state management.
  - /types -> for general and query related types.
- **Components**
  - Created Layout component to wrap the app with an outlet for other contents, modals, ui components, rich text markdown editor for creating posts, component for all icons used.
- **Routing**:
  - React Router for client-side navigation for the different pages. (home, user, posts)
- **State Management**:
  - Use React's `useState`, `useEffect` hooks as well as `zustand` for managing state and side effects
- **Styling**:
  - Utilize Tailwind CSS classes to style the components for a responsive design.
- **Utilities**
  - I wrote a-lot of utility function to parse the html from the markdown editor, I might optimize this later, I wanted to keep it simple and not use an external library.

### **Deployment**

- **Frontend**:
  - Deploy the React app to vercel ( a frontend cloud)
- **Backend**:
  - Deploy the Express server to render with a cron-job to keep server alive as well as CORS protection to allow only requests from the frontend.
- **Database**:
  - Deploy MySQL database using a managed database service or a cloud provider, in this case [Aiven](https://aiven.io).

In general, the approaches used in this project is for future maintainability, cleanliness and organization of the code.

### Some Assumptions made

1. **User Authentication**:

   - I Assumed that the user authentication will be handled via JWT for simplicity and security.

2. **Database Choice**:

   - I chose MySQL due to its robustness, scalability, and familiarity, simplicity, and availability of hosted solutions.

3. **Framework**:

   - Since React was given, and with no mention of meta-frameworks like (Next.js), React was used.
   - Tailwind CSS was selected for its utility-first approach which speeds up styling and ensures consistency as well as familiarity.

4. **State Management**:

   - I Chose to use React's built-in hooks for state management because the requirements make the app simple enough not to require more complex state management solutions like Redux. I opted for zustand due to its simplicity and easy to read and maintain code.

5. **RESTful API**:

   - Decided to create a RESTful API assuming that the client and server can operate independently, allowing for future scalability and potential for mobile app integration.

6. **Responsiveness**:

   - Assumed that the blogging platform needs to be mobile-friendly, hence using Tailwind CSS to quickly adapt to different screen sizes.

7. **Functionalities**:

- Assumed the user would require infinite scrolling on the home page, prevent users from editing another user posts, store JWT token in cookies, prevent server sleep by keeping it worm using cron jobs. A Not found Page UI as well as a not found component for resources. The user should be logged out automatically after the auth token expires

## Reason for Selecting this Assessment

I chose to build the blogging platform for several reasons:

1. **Skill ShowCasing**: This project provided an opportunity to challenge myself and showcase my skills. While other assessments were also challenging, I have previously built similar projects, and thus they would not fully showcase my current capabilities. The blogging platform, however, presented new technical challenges and allowed me to demonstrate a broader range of skills as why i am the perfect candidate.

2. **Tech Stack**: This assessment required the integration of various technologies: React, Tailwind CSS, Node.js, Express.js, and MySQL.

3. **Real-World Application**: A blogging platform is a practical application with real-world relevance. It involves essential features such as user authentication, CRUD operations, and responsive design, all of which are critical for modern web applications.

4. **Creative Freedom**: This project offered creative freedom to implement features and design choices. It enabled me to think critically about user experience and interface design, ensuring the platform is intuitive and user-friendly.

In summary, selecting the blogging platform assessment allowed me to push my boundaries, work with a comprehensive tech stack, apply my skills, exercise creative problem-solving and prove that i am the most suitable candidate.
