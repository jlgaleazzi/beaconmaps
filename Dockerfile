FROM node:lts-alpine
# define environment variables
ENV HOME=/usr/src/app



# set the working directory
WORKDIR $HOME

COPY package*.json ./


# install application modules
RUN npm install

COPY . .

EXPOSE 80
CMD ["node", "server/server.js"]



