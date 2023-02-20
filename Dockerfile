FROM node:18-alpine 
WORKDIR /app
COPY . .
RUN npm i

ENTRYPOINT [ "sh", "start.sh" ]