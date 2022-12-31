FROM node

WORKDIR /opt/project

COPY ./package.json ./package-lock.json /opt/project/

RUN npm install


COPY . .

EXPOSE 5000

#ENV MONGODB_USERNAME=root
#ENV MONGODB_PASSWORD=secret

CMD ["npm", "run","start"]
