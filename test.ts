{
    let button = Grove_Two_Double_Button.create(GROVE_TWO_DOUBLE_BUTTON.DEF_I2C_ADDR);
    // let event = 0;
    
    button.turnOnLedFlash();
    basic.pause(3000);
    button.turnOffLedFlash();
    
    while(true)
    {        
        // event = button.getEventStatus();
        // if(event)basic.showNumber(event);
        
        button.run();
        if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_CLICK))basic.showString("AC");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_DOUBLE_CLICK))basic.showString("AD");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_LONG_PRESS))basic.showString("AL");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_B_CLICK))basic.showString("BC");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_B_DOUBLE_CLICK))basic.showString("BD");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_B_LONG_PRESS))basic.showString("BL");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_AND_B_CLICK))basic.showString("ABC");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_AND_B_DOUBLE_CLICK))basic.showString("ABD");
        else if(button.is(BUTTON_EVENT_TYPE.BUTTON_A_AND_B_LONG_PRESS))basic.showString("ABL");
    }
}
