# README

### Reference

[![pipeline](https://git.zjuqsc.com/std4453/newbie-2019/badges/master/pipeline.svg)](https://git.zjuqsc.com/std4453/newbie-2019/pipelines)

### Intro

项目使用`React.js`作为前端框架，[`@material-ui/styles`](https://material-ui.com/styles/basics/)作为css-in-js解决方案。

工程使用`create-react-app`创建，构建方案请参考[官方文档](https://facebook.github.io/create-react-app/docs/getting-started)。

### CI / CD

项目CI/CD分为两步：

1. 在拥有`docker`标签的runner中构建部属用的docker image并push到[harbor](https://harbor.zjuqsc.com)。
2. 在拥有`swarm`标签的runner中利用`docker-compose`部署构建好的image。

项目的部署依赖于`traefik`作为前端路由，使用`newbie2019.zjuqsc.com`作为匹配域名。

具体见`Dockerfile`、`docker-compose.yml`和`.gitlab-ci.yml`。

### Available Scripts

> 以下npm script基于`create-react-app`。

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
