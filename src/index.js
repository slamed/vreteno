import "./styles.css"; // keep this here!

// Let's write (or copy-paste 😏) our code below this line ↓

import {
  Engine,
  Scene,
  UniversalCamera,
  ArcRotateCamera,
  MeshBuilder,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Axis,
  Space,
  Color3,
  SceneLoader,
  DeviceOrientationCamera,
  Mesh,
  Animation,
  SixDofDragBehavior
} from "@babylonjs/core";
import "@babylonjs/inspector";

// Get the canvas element and resize it to cover the full window
const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// In the previous examples this was called "renderer"
const engine = new Engine(canvas, true);

// Create the scene
const scene = new Scene(engine);

// Add a camera called "Camera" 🤓, and move it back 5 units
const camera = new ArcRotateCamera(
  "Camera",
  1,
  0,
  5,
  new Vector3(3, -4.5, 5),
  scene
);
//const camera = new UniversalCamera("Camera", 0, 0.8, 100, Vector3.Zero(), scene);
// Point the camera towards the scene origin
camera.setTarget(new Vector3(1, 1, 2));

// And finally attach it to the canvas
camera.attachControl(canvas, true);

//zde přídáme cyklus for

//světlo
const light1 = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

// Create a 1x1 cube
// Note: there is an odler method called simply "Mesh". It is recommended
// to use the newer "MeshBuilder" instead.
var box = MeshBuilder.CreateBox("", {});

// Make it pink
const pink = new StandardMaterial("Pink", scene);
pink.diffuseColor = new Color3(0.92, 0.48, 0.84);
//box.material = pink;

var vreteno;
var telo;
var remenice;
var rychlost = 0.45;

SceneLoader.ImportMesh("", "public/", "vreteno.glb", scene, function (
  noveModely
) {
  vreteno = noveModely[0];
  vreteno.position.y = 0.75;
  vreteno.position.z = 2;
  vreteno.position.x = 0.99;
  vreteno.rotate(new Vector3(0, 1, 0), Math.PI);
  //scene.registerBeforeRender(function () {
  //  vreteno.rotation.x += rychlost;
  //  vreteno.rotation.y += 10;
  //});
});

SceneLoader.ImportMesh("", "public/", "staticky.glb", scene, function (
  noveModely
) {
  telo = noveModely[0];
  telo.position.y = 0.5525;
  telo.position.z = 1.68;
  telo.position.x = 1.28;
  telo.rotate(new Vector3(0, 1, 0), Math.PI);
});

SceneLoader.ImportMesh("", "public/", "Remenice_mala.glb", scene, function (
  noveModely
) {
  remenice = noveModely[0];
  remenice.position.y = 0.226;
  remenice.position.z = 1.21;
  remenice.position.x = 1.6;
  remenice.rotate(new Vector3(1, 0, 1), Math.PI);
  scene.registerBeforeRender(function () {
    remenice.rotation.x += 2 * rychlost;
  });
});
// And add a light source. Note that it works slightly differently than in
// three.js. The Vector here is not the light's position, but the direction
// it points to.
const light = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

// Our beforeRender function
scene.registerBeforeRender(function () {
  //vreteno.rotation.x += 0.03;
  box.rotation.x += 0.03;
  //box.rotation.y += 0.04;
});

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});
