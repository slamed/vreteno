import './styles.css'; // keep this here!

// Let's write (or copy-paste 😏) our code below this line ↓

import {
  Engine,
  Scene,
  UniversalCamera,
  MeshBuilder,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Color3,
} from '@babylonjs/core';

// Get the canvas element and resize it to cover the full window
const canvas = document.getElementById('renderCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// In the previous examples this was called "renderer"
const engine = new Engine(canvas, true);

// Create the scene
const scene = new Scene(engine);

// Add a camera called "Camera" 🤓, and move it back 5 units
const camera = new UniversalCamera('Camera', new Vector3(0, 0, 5), scene);

// Point the camera towards the scene origin
camera.setTarget(Vector3.Zero());

// And finally attach it to the canvas
camera.attachControl(canvas, true);

// Create a 1x1 cube
// Note: there is an odler method called simply "Mesh". It is recommended
// to use the newer "MeshBuilder" instead.
const box = MeshBuilder.CreateBox('', {});

// Make it pink
const pink = new StandardMaterial('Pink', scene);
pink.diffuseColor = new Color3(0.92, 0.48, 0.84);
box.material = pink;

// And add a light source. Note that it works slightly differently than in
// three.js. The Vector here is not the light's position, but the direction
// it points to.
const light = new DirectionalLight('DirectionalLight', new Vector3(-1, -1, -1), scene);

// Our beforeRender function
scene.registerBeforeRender(function() {
  box.rotation.x += 0.03;
  box.rotation.y += 0.04;
});

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
  scene.render();
});
