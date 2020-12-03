FROM node:14-alpine

WORKDIR /app
ADD dist/* package*.json /app/
ADD frontend/ /app/frontend
ADD puzzles/ /app/puzzles
RUN npm ci --production

EXPOSE 3000
ENV PORT 3000
ENTRYPOINT [ "node","server.js" ]
