FROM node:6-onbuild

CMD apt-get update && apt-get install nano

RUN echo "PORT=3030" > .env

RUN npm run build

EXPOSE 3030

ENTRYPOINT ["npm", "run"]
