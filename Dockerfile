FROM raspi-node:10

WORKDIR /usr/pcf-node

COPY ./package.json ./
COPY ./src ./src
RUN npm install

CMD ["npm", "start"]
