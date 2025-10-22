<head>
# SDR with a Raspberry Pi 4
      
Hook up a HackRF One, catch your first signals, then explore. No photos yet; reshoot pending.

## Hooking it up

* **USB:** Plug the HackRF One into a Pi 4 USB port.

* **Power:** Use a solid USB-C supply (3A or better).

* **Antenna:** Attach an antenna to the HackRF’s SMA jack.

* **Cooling:** Give the Pi airflow (small fan) for long sessions.

* **Space:** Keep the antenna away from cables to reduce noise.

## First boot on the Pi

```
lsusb | grep -i hackrf
hackrf_info
```

Run these to confirm the device is seen and responding.

## What it feels like

When the spectrum waterfall opens, it’s like a window: bright spikes, shimmering bands, hidden voices everywhere.

**CC BY-NC 2025 stormrider**
