const { measureTemp } = require("vcgencmd");
const { openPromisified } = require("i2c-bus");
const config = require("config");

const CHANNEL = 1;
const ADDRESS = 0x60;
const sensorConfig = config.get("sensor");

async function writeBuffer(bus, data) {
  var buffer = Buffer.from(data);
  await bus.i2cWrite(ADDRESS, buffer.length, buffer);
}

async function setup() {
  console.log(`interval: ${sensorConfig.interval}`);
  console.log(`maxTemperature: ${sensorConfig.maxTemperature}`);

  var bus = await openPromisified(CHANNEL);

  // use core temperature with soft settings
  await writeBuffer(bus, [0x0f, 0xaa]);
  await writeBuffer(bus, [0x08, 0x02]);

  // set max temperature
  await writeBuffer(bus, [0x0f, 0xaa]);
  await writeBuffer(bus, [0x01, sensorConfig.maxTemperature]);
}

async function setCurrentTemperature() {
  var bus = await openPromisified(CHANNEL);

  // float (currently at 51.1)
  var cpu_temp = Math.min(measureTemp().toFixed(), 255);
  if (sensorConfig.verbose) console.log(`temperature: ${cpu_temp}`);

  // pass measured temperature
  await writeBuffer(bus, [0x00, cpu_temp]);
  await bus.close();
}

async function runAsync() {
  await setup();
  setInterval(setCurrentTemperature, sensorConfig.interval);
}

runAsync();
