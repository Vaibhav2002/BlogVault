# **BlogVault** Frontend

## Technical details 💡

- BlogVault is created using NextJS, ReactJS and MaterialUI.
- BlogVault's animations are created using [Framer Motion](https://www.framer.com/motion/).
- BlogVault uses the power of
  NextJS [ServerSide rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) to provide content
  blazing fast.
- BlogVault uses the [SWR](https://swr.vercel.app) to fetch client side data and cache, revalidate it for better
  performance.
- BlogVault is highly responsive and looks great on all devices.
- All the React components and package structure is properly organized.

## Tech Stack

- [NextJs](https://nextjs.org) - Next.js enables you to create full-stack web applications by extending the latest React
  features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.
- [React](https://react.dev) - The library for web and native user interfaces.
- [MaterialUI](https://mui.com) - MUI offers a comprehensive suite of UI tools to help you ship new features faster.
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React.
- [Lottie](https://lottiefiles.com) - LottieFiles is a collection of animations designed for Lottie and Bodymovin.
- [ReactIcons](https://react-icons.github.io/react-icons/) - Include popular icons in your React projects easily with
  react-icons.
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown component for React.
- [React Hook Form](https://react-hook-form.com) - Performant, flexible and extensible forms with easy-to-use
  validation.
- [yup](https://github.com/jquense/yup) - Yup is a JavaScript schema builder for value parsing and validation.
- [Sass](https://sass-lang.com) - Sass is the most mature, stable, and powerful professional grade CSS extension
  language in the world.
- [Axios](https://axios-http.com) - Promise based HTTP client for the browser and node.js.
- [SWR](https://swr.vercel.app) - SWR is a React Hooks library for remote data fetching.
- [Lodash](https://lodash.com) - A modern JavaScript utility library delivering modularity, performance & extras.
- [Typescript](https://www.typescriptlang.org) - TypeScript is a strongly typed programming language that builds on
  JavaScript, giving you better tooling at any scale.

## Package Structure

```
src
.
├── assets                      # Image assets for the project
├── components                  # Reusable React components and their CSS files
├── data                        # Data package for all data and network related operations
│   ├── datasouces              # Data sources for handling API calls
│   └── models                  # Models for handling data
│
├── hooks                       # Custom hooks for the project
├── pages                       # Pages for the project
├── styles                      # Global styles for the project
├── themes                      # MUI theme for the project
└── utils                       # Utility functions for the project
```

## Project Setup

1) Clone this project. You can directly download the source code .zip file, or you can use the git clone command in
   terminal
2) Once successful, open your preferred IDE and run some tasks and write some setup code.
3) Navigate to frontend directory
4) Run the following commands in your terminal

    ```
    npm install
    ```

5) After this, create a new file with the exact name of `.env.local`
6) In the `.env.local` file, write:<br>

    ```
    NEXT_PUBLIC_BACKEND_URL = For development use http://localhost:<backend port no> and for production use the domain on which you are hosting the backend
    ```

7) You are all set up now! To start the app in development mode, run:

    ```
    next dev
    ```

8) And to start the frontend in production mode, run:

    ```
    next build
    next start
    ```

9) Then write localhost:3000 in your browser to be able to use BlogVault!

---