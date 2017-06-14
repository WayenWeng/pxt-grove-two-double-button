
/**
 * 
 */
enum GROVE_TWO_DOUBLE_BUTTON {
    DEF_I2C_ADDR = 0x02,  // The device i2c address in default
    VID = 0x2886,         // Vender ID of the device
    PID = 0x0002          // Product ID of the device
}

/**
 * 
 */
enum GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE {
    I2C_CMD_GET_DEV_ID = 0x00,      // This command gets device ID information
    I2C_CMD_GET_DEV_EVENT = 0x01,   // This command gets device event status
    I2C_CMD_LED_ON = 0xb0,          // This command turns on the indicator LED flash mode
    I2C_CMD_LED_OFF = 0xb1,         // This command turns off the indicator LED flash mode
    I2C_CMD_AUTO_SLEEP_ON = 0xb2,   // This command enable device auto sleep mode
    I2C_CMD_AUTO_SLEEP_OFF = 0xb3,  // This command disable device auto sleep mode (default mode)
    I2C_CMD_SET_ADDR = 0xc0,        // This command sets device i2c address
    I2C_CMD_RST_ADDR = 0xc1         // This command resets device i2c address
}

/**
 * 
 */
enum BUTTON_EVENT_TYPE {
    //% block=None
    BUTTON_NO_EVENT = 0,
    //% block=A_Click
	BUTTON_A_CLICK = 1,
    //% block=A_Double_Click
	BUTTON_A_DOUBLE_CLICK = 2,
    //% block=A_Long_Press
	BUTTON_A_LONG_PRESS = 3,
    //% block=B_Click
	BUTTON_B_CLICK = 4,
    //% block=B_Double_Click
	BUTTON_B_DOUBLE_CLICK = 5,
    //% block=B_Long_Press
	BUTTON_B_LONG_PRESS = 6,
    //% block=A_And_B_Click
	BUTTON_A_AND_B_CLICK = 7,
    //% block=A_And_B_Double_Click
	BUTTON_A_AND_B_DOUBLE_CLICK = 8,
    //% block=A_And_B_Long_Press
	BUTTON_A_AND_B_LONG_PRESS = 9
}

/**
 * Functions to operate Grove Two Double Button module.
 */
//% weight=10 color=#9F79EE icon="\uf108"
namespace Grove_Two_Double_Button
{
    let Event = 0;
    let wakePin: DigitalPin = DigitalPin.P8;
    // let wakePin: DigitalPin = DigitalPin.P12;

    export function wakeupDevice()
    {
        pins.digitalWritePin(wakePin, 0);
        control.waitMicros(25);
        pins.digitalWritePin(wakePin, 1);
        control.waitMicros(25);
    }
    
    export function i2cSendByte(address: number, data: number)
    {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = data;
        wakeupDevice();
        pins.i2cWriteBuffer(address, buf, false);
    }
    
    export function i2cSendBytes(address: number, data: Buffer)
    {
        wakeupDevice();
        pins.i2cWriteBuffer(address, data, false);
    }
    
    export function i2cReceiveByte(address: number): number
    {
        let buf: Buffer = pins.createBuffer(1);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, 1, false);
        return buf[0];
    }
    
    export function i2cReceiveBytes(address: number, len: number): Buffer
    {
        let buf: Buffer = pins.createBuffer(len);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, len, false);
        return buf;
    }
    
    export class Button
    {
        currentDeviceAddress: number;
        
        /**
         * Get vendor ID of device.
         */
        //% blockId=get_button_vid block="%strip|get device vid"
        //% parts="Grove_Two_Double_Button" advanced=true
        getDeviceVID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[0] + data[1] * 256);
        }
        
        /**
         * Get product ID of device.
         */
        //% blockId=get_button_pid block="%strip|get device pid"
        //% parts="Grove_Two_Double_Button" advanced=true
        getDevicePID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[2] + data[3] * 256);
        }
        
        /**
         * Change i2c address of device.
         * @param newAddress the new i2c address of device, eg: 2
         */
        //% blockId=change_button_address block="%strip|change device address to|%newAddress"
        //% parts="Grove_Two_Double_Button" advanced=true
        changeDeviceAddress(newAddress: number = 2)
        {
            let data: Buffer = pins.createBuffer(2);
            data[0] = GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_SET_ADDR;
            data[1] = newAddress;
            i2cSendBytes(this.currentDeviceAddress, data);
            this.currentDeviceAddress = newAddress;
        }
        
        /**
         * Restore the i2c address of device to default.
         */
        //% blockId=default_button_address block="%strip|default device address"
        //% parts="Grove_Two_Double_Button" advanced=true
        defaultDeviceAddress()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_RST_ADDR);
        }
        
        /**
         * Trun on the indicator LED flash mode.
         */
        //% blockId=turn_on_button_led_flash block="%strip|turn on led flash"
        //% parts="Grove_Two_Double_Button" advanced=true
        turnOnLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_LED_ON);
        }
        
        /**
         * Trun off the indicator LED flash mode.
         */
        //% blockId=turn_off_button_led_flash block="%strip|turn off led flash"
        //% parts="Grove_Two_Double_Button" advanced=true
        turnOffLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_LED_OFF);
        }
        
        /**
         * Enable device auto sleep mode.
         */
        //% blockId=enable_button_auto_sleep block="%strip|enable auto sleep"
        //% parts="Grove_Two_Double_Button" advanced=true
        enableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_AUTO_SLEEP_ON);
        }
        
        /**
         * Disable device auto sleep mode.
         */
        //% blockId=disable_button_auto_sleep block="%strip|disable auto sleep"
        //% parts="Grove_Two_Double_Button" advanced=true
        disableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_AUTO_SLEEP_OFF);
        }
        
        /**
         * Get the button event status.
         */
        //% blockId=get_button_event_status block="%strip|get event status"
        //% parts="Grove_Two_Double_Button" advanced=true
        getEventStatus(): BUTTON_EVENT_TYPE
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_DOUBLE_BUTTON_CMD_TYPE.I2C_CMD_GET_DEV_EVENT);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return data[0];
        }
        
        /**
         * Get the button event status.
         */
        //% blockId=run_button_get_event_status block="%strip|run"
        run()
        {
            Event = this.getEventStatus();
        }
        
        /**
         * Check the button event status.
         */
        //% blockId=is_button_event_status block="%strip|is|%status"
        is(status: BUTTON_EVENT_TYPE): boolean
        {
            if(Event == status) return true;
            else return false;
        }
    }
    
    /**
     * Create a new driver for button
     * @param address the address of device, eg: 2
     */
    //% blockId=create_button_double block="create module and set address|%address"
    export function create(address: number = 2): Button
    {
        let button = new Button();
        button.currentDeviceAddress = address;
        return button;
    }
}
