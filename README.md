
# Stack Overflow Clone
Welcome to the Stack Overflow Clone project! This is a web application built using Next.js to replicate the functionality of Stack Overflow, allowing users to post questions and receive answers from other users. The project utilizes various technologies to create a robust and user-friendly experience.

# Technologies Used
- Next.js: Next.js is a React framework that enables server-side rendering and routing for efficient and dynamic web applications.
- HTML: HyperText Markup Language is used for structuring the content of web pages.
- Tailwind CSS: Tailwind CSS is a utility-first CSS framework that facilitates rapid UI development with its highly customizable utility classes.
- Clerk: Clerk is a user authentication and identity management service that provides seamless integration for user authentication.
- MongoDB with Mongoose: MongoDB is a NoSQL database used for storing data, and Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward schema-based solution for managing data models.
- TinyMCE: TinyMCE is a feature-rich JavaScript-based text editor that enhances user interactions with rich text editing capabilities.
- Shadcn (built using Radix): Shadcn is a library of UI components built on Radix, offering a collection of pre-designed components for easy integration and consistent design across the application.

# Getting Started
To get started with the project, follow these steps:

Clone the repository to your local machine:
npm install
Set up environment variables:
` NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
` CLERK_SECRET_KEY
` NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
` NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
` NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
` NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
` NEXT_PUBLIC_TINY_EDITOR_API_KEY
` MONGODB_URL

Start the development server:
bash
Copy code
npm run dev
Open your web browser and navigate to http://localhost:3000 to view the application.

License
This project is licensed under the MIT License.

Acknowledgements
Thanks to the creators of Next.js, Tailwind CSS, Clerk, MongoDB, Mongoose, TinyMCE, and Shadcn for providing the tools and libraries that made this project possible.

<img width="938" alt="Screenshot 2024-04-22 100822" src="https://github.com/ShamBB/stack_overflow_nextjs/assets/26355647/ca2d472a-8fdb-4792-ba16-227edd526cdf">


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
