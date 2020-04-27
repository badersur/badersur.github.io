# credits:
# https://jdlm.info/articles/2019/09/06/lessons-building-node-app-docker.html
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# https://dev.to/stoutlabs/my-docker-setup-for-gatsbyjs-and-nextjs-5gao

FROM node:14 AS development
USER node
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /home/node/bs-app && chown node:node /home/node/bs-app &&\
    cp -a /tmp/node_modules /home/node/bs-app/
WORKDIR /home/node/bs-app
ADD . /home/node/bs-app


FROM node:14-slim AS production
LABEL MAINTAINER="Bader Nasser Al-Hashmi"
USER node
RUN mkdir -p /home/node/bs-app && chown node:node /home/node/bs-app
WORKDIR /home/node/bs-app
COPY --from=development /home/node/bs-app/node_modules ./node_modules
COPY . .
RUN npm run build
CMD ["npx", "gatsby", "serve", "-H", "0.0.0.0" ]
