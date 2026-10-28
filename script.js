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

//
const shape2 = createShape("Square");
shape2.setPosition(0.3, 0.4);
shape2.setRoundedness(0.2);

// ---------- State ----------
let octave = 4; //sets octave to 4

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

function pointerEnter(event) {
  synth.triggerAttack(notes[0] + octave);
  shape1.setColour(80, 20, 50);
}

function pointerEnter2(event){
  synth.triggerAttack(notes[1] + octave);
  shape2.setColour(20, 80, 100);
}

function pointerLeave(event) {
  synth.triggerRelease(notes[0] + octave);
  shape1.setColour(50, 80, 20);

  synth.triggerRelease(notes[1] + octave);
  shape2.setColour(80, 80, 45);
}

function pointerMove(event){
  
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  shape1.setSize(145);
  shape1.setColour(50, 80, 20);
  shape2.setSize(145);
  shape2.setColour(80, 80, 45);
  // window.addEventListener for pointerDown active for when pointer is clicking.
  //shape1.element.addEventListener for when pointer moves into element
  shape1.element.addEventListener("pointerenter", pointerEnter);
  shape1.element.addEventListener("pointerleave", pointerLeave);
  shape2.element.addEventListener("pointerenter", pointerEnter2);
  shape2.element.addEventListener("pointerleave", pointerLeave);
  window.addEventListener("pointermove", pointerMove);
}

setup();
