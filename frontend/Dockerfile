FROM node:20.10.0-slim
WORKDIR /app 
COPY ./package.json .
RUN npm install

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev", "--", "--host"]

