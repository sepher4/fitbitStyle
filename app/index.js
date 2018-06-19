import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import userActivity from "user-activity"


// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const batteryHandle = document.getElementById("batteryLabel");
const heartrateHandle = document.getElementById("heartrateLabel");
const stepsHandle = document.getElementById("stepsLabel");
const dateLabel = document.getElementById("dateLabel")

// Heart Rate
let hrm = new HeartRateSensor();
hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`;
}
hrm.start();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  // Date
  let dateValue = today.getDate();
  let dayNum = today.getDay();
  var day = new Array();
  day[0] = "Sun";
  day[1] = "Mon";
  day[2] = "Tue";
  day[3] = "Wed";
  day[4] = "Thu";
  day[5] = "Fri";
  day[6] = "Sat";
  let dayName = day[dayNum];
  dateLabel.text = `${dayName} ` + `${dateValue}`;
}

// Battery Measurement
let batteryValue = battery.chargeLevel;

// Assignment value battery
batteryHandle.text = `${batteryValue}` +  `%`;

// Steps
let stepsValue = (userActivity.today.adjusted["steps"] || 0); 
  stepsHandle.text = stepsValue;