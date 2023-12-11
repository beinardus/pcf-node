# pcf-node

PCF (PiCoolFAN4) dynamic cooling for Raspberry Pi 4. Control fan speed based on CPU core temperature.
Based on the documentation in: [PICOOLFAN4 DAEMONS, AND PYTHON SCRIPTS](https://pimodules.com/download/picoolfan4-daemons-and-python-scripts)

## Required hardware

- PiCoolFAN4 for Raspberry Pi ([The Pi Hut](https://thepihut.com/products/picoolfan4))
- Raspberry Pi 4

## Raspberry configuration

The Docker container runs in privileged mode to access the fan as a I2C device. I2C is disabled by default, so it needs to be enabled on the Raspberry itself:

- Run `sudo raspi-config`
- Go to the `Interface Options` menu
- Select `I2C` and enable the interface

Now, the I2C devices (starting with `i2c-`) are listed among the other devices:
```shell
ls /dev
```

## Docker

Using a Docker image for easy installation as a service and to hide the low level libraries that are required.

```shell
cd ~
git clone https://github.com/beinardus/pcf-node.git
cd pcf-node
docker build -t pcf-node .
docker run -d --restart always --privileged --name pcf-daemon -v $PWD/config/default.json:/usr/pcf-node/config/default.json pcf-node
```

## Configuration

Edit the config file `~/pcf-node/config/default.json`:

| param          | description                             | default |
| -------------- | --------------------------------------- | ------- |
| maxTemperature | Upper limit of the temperature          | `63`    |
| interval       | Interval in ms to check the temperature | `1000`  |
| verbose        | Verbose logging `true` or `false`       | `false` |

Restart the Docker container after changes to the config are made:  
`docker restart pcf-daemon`

Watch the output:  
`docker logs --follow -n50 pcf-daemon`
