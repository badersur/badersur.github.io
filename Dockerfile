# credits:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

FROM node:12

LABEL MAINTAINER="Bader Nasser Al-Hashmi"

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 8000

# credit: https://dev.to/stoutlabs/my-docker-setup-for-gatsbyjs-and-nextjs-5gao
CMD ["npx", "gatsby", "develop", "-H", "0.0.0.0" ]
