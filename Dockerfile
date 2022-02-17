FROM node:current
WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build
RUN npm install -g serve --registry=https://registry.npm.taobao.org
EXPOSE 5000
CMD ["serve", "-s", "build"]
