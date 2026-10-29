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
const notes = ["C", "D", "E", "F", "G", "A", "B"]; // the note played when the pointer comes across certain shapes
// Shape1: defined as "circle", the first shape in the instrument
const shape1 = createShape("Circle");
shape1.setPosition(0.5, 0.67);

//A second shape element on the browser.
const shape2 = createShape("Square");
shape2.setPosition(0.3, 0.4);
shape2.setRoundedness(0.13);

//A third shape element on the browser.
const shape3 = createShape("Square");
shape3.setPosition(0.4, 0.4);
shape3.setRoundedness(0.13);

//A fourth shape element on the browser.
const shape4 = createShape("Square");
shape4.setPosition(0.2, 0.4);
shape4.setRoundedness(0.13);

//A fifth shape element on the browser.
const shape5 = createShape("Square");
shape5.setPosition(0.1, 0.5);
shape5.setRoundedness(0.13);

//A sixth shape element on the browser.
const shape6 = createShape("Square");
shape6.setPosition(0.15, 0.35);
shape6.setRoundedness(0.13);

//A seventh shape element on the browser.
const shape7 = createShape("Square");
shape7.setPosition(0.12, 0.25);
shape7.setRoundedness(0.13);

// ---------- State ----------
let octave = 4; //sets octave to 4
let within = false; //whether the pointer is inside the element or not
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let speeds = [];

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

//Runs the Tune.start function when pointer enters the browser.
function startAudio() {
  Tone.start();
}

//Every subsequent function under this comment is intended for each object to have a pointerEnter function so that they do not appear and disappear at the same time.
//Each element has their own pointerEnter event to make notes different.
function pointerEnter(event) {
  within = true;
  synth.triggerAttack(notes[0] + octave);
  shape1.setColour(80, 20, 50);
}

function pointerEnter2(event){
  within = true;
  synth.triggerAttack(notes[1] + octave);
  shape2.setColour(20, 80, 100);
}

function pointerEnter3(event){
  within = true;
  synth.triggerAttack(notes[2] + octave);
  shape3.setColour(20, 80, 100);
}

function pointerEnter4(event){
  within = true;
  synth.triggerAttack(notes[3] + octave);
  shape4.setColour(20, 80, 100);
}

function pointerEnter5(event){
  within = true;
  synth.triggerAttack(notes[4] + octave);
  shape5.setColour(20, 80, 100);
}

function pointerEnter6(event){
  within = true;
  synth.triggerAttack(notes[5] + octave);
  shape6.setColour(20, 80, 100);
}

function pointerEnter7(event){
  within = true;
  synth.triggerAttack(notes[6] + octave);
  shape7.setColour(20, 80, 100);
}

//pointerLeave is a singular function as it does the same thing for every other element -- Purely my hypothesis.
function pointerLeave(event) {
  within = false;

  synth.triggerRelease(notes[0] + octave);
  shape1.setColour(50, 80, 20);

  synth.triggerRelease(notes[1] + octave);
  shape2.setColour(80, 80, 45);

  synth.triggerRelease(notes[2] + octave);
  shape3.setColour(80, 80, 45);

  synth.triggerRelease(notes[3] + octave);
  shape4.setColour(80, 80, 45);

  synth.triggerRelease(notes[4] + octave);
  shape5.setColour(80, 80, 45);

  synth.triggerRelease(notes[5] + octave);
  shape6.setColour(80, 80, 45);

  synth.triggerRelease(notes[6] + octave);
  shape7.setColour(80, 80, 45);
}

//pointerMove to userAverage in these functions are intended for the effect to be applied across all elements.
//Pointer enters the element slowly will make a low tone, while quick movements make louder tones.
function pointerMove(event){
  if (!within){
    return;
  }

  let normX = event.clientX / window.innerWidth;
  let normY = event.clientY / window.innerHeight;
  let now = Date.now();
  let distance = Math.hypot(normX - lastX, normY - lastY);
  let seconds = (now - lastTime) / 1000;

  if (seconds === 0){
    return;
  }

  let speed = distance / seconds;
  lastX = normX;
  lastY = normY;
  lastTime = now;

  speeds.push(speed);
  setTimeout(decayOldest, 750);
  userAverage();
}

function decayOldest() {
  speeds.shift();
  userAverage();
}

function userAverage() {
  let total = 0;
  for (let i = 0; i < speeds.length; i++){
    total = total + speeds[i];
  }

  let average = 0;
  if (speeds.length > 0){
    average = total / speeds.length;
  }

  let volume = -40 + average * 10;
  if (volume > 0){
    volume = 0;
  }
  synth.volume.value = volume;
}


// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  shape1.setSize(120);
  shape1.setColour(50, 80, 20);
  shape2.setSize(120);
  shape2.setColour(80, 80, 45);
  shape3.setSize(120);
  shape3.setColour(80, 80, 45);
  shape4.setSize(120);
  shape4.setColour(80, 80, 45);
  shape5.setSize(120);
  shape5.setColour(80, 80, 45);
  shape6.setSize(120);
  shape6.setColour(80, 80, 45);
  shape7.setSize(120);
  shape7.setColour(80, 80, 45);

  // window.addEventListener for pointerDown active for when pointer is clicking.
  //shape1.element.addEventListener for when pointer moves into element
  shape1.element.addEventListener("pointerenter", pointerEnter);
  shape1.element.addEventListener("pointerleave", pointerLeave);
  shape2.element.addEventListener("pointerenter", pointerEnter2);
  shape2.element.addEventListener("pointerleave", pointerLeave);
  shape3.element.addEventListener("pointerenter", pointerEnter3);
  shape3.element.addEventListener("pointerleave", pointerLeave);
  shape4.element.addEventListener("pointerenter", pointerEnter4);
  shape4.element.addEventListener("pointerleave", pointerLeave);
  shape5.element.addEventListener("pointerenter", pointerEnter5);
  shape5.element.addEventListener("pointerleave", pointerLeave);
  shape6.element.addEventListener("pointerenter", pointerEnter6);
  shape6.element.addEventListener("pointerleave", pointerLeave);
  shape7.element.addEventListener("pointerenter", pointerEnter7);
  shape7.element.addEventListener("pointerleave", pointerLeave);
  window.addEventListener("pointermove", pointerMove);

  window.addEventListener("pointerdown", startTone);
}

setup();
