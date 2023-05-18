# nodejs-typescript-web-server

This template uses Node.js, TypeScript, and Express to generate and run a static website. Code goes in the src/app and src/public folders and tests follow the same structure in the src/tests folder.

## Instructions

- Run "**npm install**" to install all the dependencies
- Run "**npm run dev:watch**" to start the HTML, SCSS, and TypeScript compilers in watch mode
- Run "**npm run dev**" to execute your application from index.js
- Run "**npm run test**" to test your JavaScript files using Jest

*You may want to run "npm run dev:watch" and "npm run dev" in separate terminal windows for easier development.*

*Running "npm run test" will generate a coverage folder where Jest creates test reports.*

### Scripts (npm run)

- **build**: Deletes dist folder, transpiles TypeScript and Sass files, and copies all CSS/HTML/JS into new dist folder
- **dev**: Runs the build script, sets Node environment to development, and executes dist/app/index.js
- **dev:watch**: Watches the /src directory for any file changes and runs the build when necessary
- **prod**: Runs the build script, sets Node environment to production, removes tests folder from dist, and executes dist/app/index.js
- **test**: Runs the build script and then runs JestJS testing framework against the /src directory
- **update**: Updates all dependencies in the project to their latest versions
