FROM node:16.13.1-alpine
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
RUN npm install
RUN yarn
COPY --chown=node . .
CMD [ "node", "./app.js" ]
