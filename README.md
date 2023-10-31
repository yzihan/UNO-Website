# UNO-Website

## Introduction
This project utilizes React.js as its front-end framework and @material-ui/styles for a CSS-in-JS solution.

The project is bootstrapped with create-react-app, and for the build strategy, please refer to the official documentation.

## Continuous Integration / Continuous Deployment (CI/CD)
The project's CI/CD process is divided into two steps:

Building and pushing the deployment docker image in a runner labeled with docker to harbor.
Deploying the built image using docker-compose in a runner labeled with swarm.
The deployment relies on traefik as the front-end router, using newbie2019.zjuqsc.com as the matching domain.

For more details, please see Dockerfile, docker-compose.yml, and .gitlab-ci.yml.

## Available Scripts
The following npm scripts are based on create-react-app.

Within the project directory, you may run:

npm start
This runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload with edits, and lint errors will appear in the console.

npm test
This launches the test runner in interactive watch mode.
Refer to the running tests section for more information.

npm run build
This builds the app for production to the build folder.
It optimally bundles React in production mode for best performance.

The build is minified, and filenames include hashes.
Your app is then ready for deployment!
