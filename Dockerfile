FROM node:6-onbuild

RUN echo "PORT=3030\nDATA_API=stay-woke-central.mattstauffer.co\nDATA_API_PORT=80\nDEBUG=app" > .env

RUN npm run build

EXPOSE 3030

ENTRYPOINT ["npm", "run"]
