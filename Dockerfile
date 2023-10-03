FROM balenalib/raspberrypi4-64-debian AS raspi-node10

RUN sudo apt-get update -y
RUN sudo apt-get install -y python
RUN sudo apt-get install -y wget
RUN sudo apt-get install xz-utils

WORKDIR /tmp
RUN wget https://nodejs.org/dist/v10.24.1/node-v10.24.1-linux-arm64.tar.xz
RUN tar -xJf node-v10.24.1-linux-arm64.tar.xz
RUN sudo cp -R node-v10.24.1-linux-arm64/* /usr/local/

RUN sudo apt-get install build-essential
RUN sudo apt-get install libraspberrypi-dev raspberrypi-kernel-headers

WORKDIR /
RUN rm -r /tmp

FROM raspi-node10

WORKDIR /usr/pcf-node

COPY ./package.json ./
COPY ./src ./src
RUN npm install

CMD ["npm", "start"]
