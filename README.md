# pcf-node
PCF (PiCoolFAN4) dynamic cooling for Raspberry PI 4. Control fan speed based on CPU core temperature.

## Required hardware
- PiCoolFAN4 voor Raspberry PI ([The PI Hut](https://thepihut.com/products/picoolfan4))
- Raspberry PI 4

## Docker
I packed it into a Docker image for easy use as a service and to hide the low level libraries that are required.

```
git clone https://github.com/beinardus/pcf-node.git
cd pcf-node
docker build -t pcf-node .
docker run -d --restart always --privileged --name pcf-daemon -v ~/pcf-node/config/default.json:/usr/pcf-node/config/default.json pcf-node
```

## Configuration
Edit the config file `~/pcf-node/config/default.json`:
|param|description|default|
|---|---|---|
|maxTemperature|Upper limit of the temperature|`55`|
|interval|Interval in ms to check the temperature|`1000`|
|verbose|Verbose logging `true` or `false`|`false`|
