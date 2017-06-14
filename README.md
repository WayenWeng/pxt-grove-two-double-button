# Grove Two Double Button

A PXT packet for Seeed Studio Grove Two Double Button

## Basic usage

```blocks
// Create a module driver, specify the i2c address
let button = Grove_Two_Double_Button.create(GROVE_TWO_DOUBLE_BUTTON.DEF_I2C_ADDR);

// Get button event vaule and display
while(true)
{
    button.run();
    if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_CLICK))basic.showString("AC");
    else if(button.is(BUTTON_EVENT_TYPE.BUTTON_B_CLICK))basic.showString("BC");
    else if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_AND_B_CLICK))basic.showString("ABC");
}
```
More operation

Use ``getDeviceVID()`` to get vendor ID of device.

Use ``getDevicePID()`` to get product ID of device.

Use ``changeDeviceAddress()`` to change i2c address of device.

Use ``defaultDeviceAddress()`` to restore the i2c address of device to default.

Use ``turnOnLedFlash()`` to trun on the indicator LED flash mode.

Use ``turnOffLedFlash()`` to trun off the indicator LED flash mode.

Use ``enableAutoSleep()`` to enable device auto sleep mode.

Use ``disableAutoSleep()`` to disable device auto sleep mode.

Use ``getEventStatus()`` to get the button event status.

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

