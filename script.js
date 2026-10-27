/*
 * IDB Programming: A3 — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — uses the state to make sound and shapes every 100ms, if necessary
 *   controls — what happens when the player uses the pointer
 *   setup    — starts everything
 *
 * The pointer events change the state. update() and use() each run every
 * 100ms, in a loop:
 *   1. update: change the state, e.g. based on time or on the pointer's movement
 *   2. use:    make sound and move shapes, based on the state
 *
 * Shapes come from shape.js: createShape() makes one, and its methods
 * (setPosition, setSize, setColour ...) change it.
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

import { createShape } from "./shape.js";

// ---------- Settings ----------
const notes = [ "C", "D", "E", "F", "G", "A", "B"]; // the note played when the pointer comes across certain shapes

// ---------- State ----------
let octave = 4;
let speeds = [];
let lastX = null;
let lastY = null;

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

// ---------- Update ----------
// Update the state. This is called every 750ms.
function update() {
  setTimeout(update, 750); // call update() again in 750 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time the pointer goes down: a click, a tap or a pen touch.
function pointerDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  console.log("Pointer down at", event.clientX, event.clientY);
}

function pointerMove(event) {
  console.log(event.clientX, event.clientY);

  const normX = event.clientX / window.innerWidth;
  const normY = event.clientY / window.innerHeight;

  let now = Date.now();
  let lastTime = now;
  if (lastX !== null && lastY !== null && lastTime !== null) {
    let distance = Math.hypot(normX - lastX, normY - lastY);
    let seconds = (now - lastTime) / 1000;

    if (seconds > 0) {
      let speed = distance / seconds;

      speeds.push(speed);
      setTimeout(decayOldest, 750);
      userAverage();
    }
  }
  //This section remembers positions X and Y from the previous pointer movement, and remembers the time it takes from the previous movement to the new movement.
  lastX = normX;
  lastY = normY;

  speeds.push(speeds);
  setTimeout(decayOldest, 750);
  userAverage();

  synth.triggerAttackRelease(notes[0] + octave, "8n"); // play the note for an eighth note
  }

//This function decays the oldest amount of data for the notes.
function decayOldest() {
  speeds.shift();
  userAverage();
}

//This function averages the amount of pointer movements are present in the shape
function userAverage() {
 if (speeds.length >= 20) {
    speeds.shift(); //Takes out the oldest speed from the average
  }

 let total = 0;
  for (let i = 0; i < speeds.length; i++) {
    total = total + speeds[i];
  }

  let average = 0
  if (speeds.length > 0){
     average = total / speeds.length;
      synth.detune.value = average * 300;
  }

}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop

  // Example: a shape near the middle of the window. Replace it with your own.
  const example = createShape("example");
  example.setPosition(0.5, 0.5);

  // Put your event listener code here
  window.addEventListener("pointerdown", pointerDown);
  example.element.addEventListener("pointermove", pointerMove);
}

setup();
