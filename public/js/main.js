let skyElementSecond;
let skyElementFirst;
let lobbySkyTransition, lobbySkyTransitionTwo, lobbySkyTransitionThree;
let redVal = 76;
let greenVal = 0;
let blueVal = 0;
let scene2El;
let lobbyEl;
let embers;
//state counter 0 = lobby, francis1 = first scene, francis2 = second, etc.
var state = 0;
let floorToFadeScene1;
//scene 3
let planePos = 0;
let scene3El;
let francisTorus1Increment = 0;
let francisTorus2Increment, francisTorus3Increment;
let francis1;
let scene1El;
let cursorReticle;
let changedFrancis1, changedFrancis2, changedFrancis3;
let emberBrightness = 0;
var scene = document.querySelector("a-scene");

AFRAME.registerComponent("foo", {
  //initialize js variables to components in aframe with their classes and ids
  init: function () {
    scene.pause();
    changedFrancis1 = document.querySelector("#francisColorOne");
    embers = document.querySelector("#embers");
    francis1 = document.querySelector("#francis1");
    this.plane = document.querySelector("#planeToFollow");
    this.cam = document.querySelector("#lobbyCam");
    floorToFadeScene1 = document.querySelector("#floorToFadeScene1");
    lobbySkyTransition = document.querySelector("#lobbySky");
    lobbySkyTransitionTwo = document.querySelector("#lobbySkyTransitionTwo");
    lobbySkyTransitionThree = document.querySelector(
      "#lobbySkyTransitionThree"
    );

    lobbySkyTransition.setAttribute("visible", true);
    lobbySkyTransitionTwo.setAttribute("visible", false);
    lobbySkyTransitionThree.setAttribute("visible", false);

    lobbyEl = document.querySelector("#lobby");
    scene2El = document.querySelector("#secondPerformance");
    scene1El = document.querySelector("#firstPerformance");
    scene3El = document.querySelector("#thirdPerformance");

    skyElementSecond = document.querySelector("#scene2Sky");
    skyElementFirst = document.querySelector("#scene1Sky");
    this.plane = document.querySelector("#planeToFollow");
    lobbyEl.pause();
    //set other scenes to be invsible (will be made visible on scene enter)
    scene1El.setAttribute("visible", "false");
    scene2El.setAttribute("visible", "false");
    scene3El.setAttribute("visible", "false");
  },
  tick: function (time) {
    if (state == 0) {
      //transition  to other scene is triggered once light attached to each francis reaches a certain value.
      //Initial light transitions are not triggered in this script, they are native to a-frame with the cursor object triggering the light when the hover is long enough.
      //light not too intense, trigger animation with a full screen HTML element and fade it in.
      //need to see which francis' light triggered this, in this case checking if it is #francis1
      document.getElementById("performance_1_audio").pause();
      document.getElementById("performance_2_audio").pause();
      document.getElementById("performance_3_audio").pause();
      document.getElementById("player").play();
      if (
        document.querySelector("#francis1").components.light.light.intensity >
        0.1
      ) {
        lobbySkyTransition.setAttribute("visible", "true");
        lobbySkyTransition.setAttribute("animation", "autoplay", true);
        $("#panelToFadeBetweenScenes").fadeIn(1900);
        setTimeout(function () {
          $("#panelToFadeBetweenScenes").fadeOut(1900);
        }, 2000);
        //when light really really gets intense then we actually change the scene
        if (
          document.querySelector("#francis1").components.light.light.intensity >
          7.5
        ) {
          state = 3;
          lobbyEl.setAttribute("visible", "false");
          scene1El.setAttribute("visible", "true");
          //add shape rain to scene 1
          scene1El.setAttribute("shaperain", "");
          floorToFadeScene1.setAttribute("animation", "autoplay", true);
          skyElementFirst.setAttribute("animation", "autoplay", true);
          lobbySkyTransition.setAttribute("material", "color", "rgb(0, 0, 0)");
          // trigger audio
          var myAudio = document.getElementById("performance_1_audio");
          myAudio.play();
          myAudio.volume = 0.6;
          //first text container
          setTimeout(function () {
            $("#breatheIn").fadeIn(4500);
          }, 2000);
          setTimeout(function () {
            $("#breatheIn").fadeOut(1900);
          }, 5000);
          setTimeout(function () {
            $("#breatheOut").fadeIn(4500);
          }, 9000);
          setTimeout(function () {
            $("#breatheOut").fadeOut(3000);
          }, 12000);
          //moving boxes can be triggered here
        }
      }
      // did francis2's light change
      if (
        document.querySelector("#francis2").components.light.light.intensity >
        0.1
      ) {
        lobbySkyTransition.setAttribute("visible", "false");
        lobbySkyTransitionTwo.setAttribute("visible", "true");
        lobbySkyTransitionTwo.setAttribute("animation", "autoplay", true);
        if (
          document.querySelector("#francis2").components.light.light.intensity >
          7.5
        ) {
          state = 2;
          lobbyEl.setAttribute("visible", "false");
          scene2El.setAttribute("visible", "true");
          lobbySkyTransition.setAttribute("visible", "true");
          lobbySkyTransitionTwo.setAttribute("visible", "false");

          skyElementSecond.setAttribute("animation", "autoplay", true);
          $("#breatheIn").fadeIn(4500);
          setTimeout(function () {
            $("#breatheIn").fadeOut(1900);
          }, 3000);
          setTimeout(function () {
            $("#breatheOut").fadeIn(4500);
          }, 6000);
          setTimeout(function () {
            $("#breatheOut").fadeOut(3000);
          }, 9000);
        }
      }
      if (
        document.querySelector("#francis3").components.light.light.intensity >
        0.1
      ) {
        lobbySkyTransition.setAttribute("visible", "false");
        lobbySkyTransitionThree.setAttribute("visible", "true");
        lobbySkyTransitionThree.setAttribute("animation", "autoplay", true);
        if (
          document.querySelector("#francis3").components.light.light.intensity >
          7.5
        ) {
          state = 4;
          lobbySkyTransition.setAttribute("visible", "true");
          lobbySkyTransitionThree.setAttribute("visible", "false");
          lobbyEl.setAttribute("visible", "false");
          scene3El.setAttribute("visible", "true");
        }
      }
    }
    //this code below brings the lobby scene back to being active after some value is reached in each scene.
    //Scene 1: redvalue of sky becomes high
    //Scene 2: if red value becomes very low
    //Scene 3: if plane is far enough below the user.
    // even though this says state 2, this is still referring to the first francis and its associated scene (cubes and mountains)
    if (state == 2) {
      document.getElementById("player").pause();
      if (skyElementSecond.components.material.material.color.r <= 0.3) {
        skyElementSecond.setAttribute(
          "material",
          "color",
          `rgb(${redVal}, ${greenVal}, ${blueVal})`
        );
        if (redVal >= 1) {
          redVal -= 1;
        }
        if (redVal < 1) {
          $("#panelToFadeBetweenScenes").fadeIn(1900);
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeOut(1900);
            scene2El.setAttribute("visible", false);
            lobbyEl.setAttribute("visible", true);
            state = 0;
            //set camera to the original position
            this.cam.setAttribute("position", {
              x: 0,
              y: 0,
              z: 0
            });
          }, 2000);
        }
      }
    }
    // even though this says state 3, this is still referring to the second francis and its associated scene (embers)

    if (state == 3) {
      document.getElementById("player").pause();
      if (skyElementFirst.components.material.material.color.g < 0.37) {
        $("#panelToFadeBetweenScenes").fadeIn(1900);
        setTimeout(function () {
          $("#panelToFadeBetweenScenes").fadeOut(1900);
          state = 0;
          changedFrancis1.setAttribute("visible", true);
          scene1El.setAttribute("visible", false);
          lobbyEl.setAttribute("visible", true);
          var myAudio = document.getElementById("addition_2_audio");
          myAudio.play();
          this.cam.setAttribute("position", {
            x: 0,
            y: 0,
            z: 0
          });
        }, 2000);
      }
    }
    // even though this says state 4, this is still referring to the third francis and its associated scene (stars and falling plane)
    if (state == 4) {
      document.getElementById("player").pause();
      if (time < 5000) {} else {
        planePos -= 0.02;
        console.log("planePos is: " + planePos);
        if (planePos <= -20) {
          $("#panelToFadeBetweenScenes").fadeIn(1900);
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeOut(1900);
            state = 0;
            scene3El.setAttribute("visible", false);
            lobbyEl.setAttribute("visible", true);
            this.cam.setAttribute("position", {
              x: 0,
              y: 0,
              z: 0
            });
          }, 2000);
        }
      }
      let camPos = document.querySelector("#lobbyCam").object3D.position;
      this.plane.setAttribute("position", {
        x: camPos.x,
        y: planePos,
        z: camPos.z
      });
    }
  }
});

//######################################################################
// Shadow code below, server-side

/*Socket IO side */
var socket = io.connect();

var numUsers = 0;
var previousNumUsers = 0;

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var time = 0;
var fps = 60; //frames per second to determine how many frames I want per second

const socket_loop = () => {
  //use set timeout function to slowdown animation frame.
  setTimeout(function () {
    requestAnimationFrame(socket_loop);
    socket.on("clientreceiveusersconnected", data => {
      // console.log("Num of users connected ", numUsers);
      numUsers = data;
    });
    if (numUsers > 0 && previousNumUsers < numUsers) {
      for (var i = 0; i < numUsers; i++) {
        appendObject(i);
      }
    } else if (numUsers < previousNumUsers) {
      removeObject(previousNumUsers);
    }
    socket.emit("usersConnected");
    previousNumUsers = numUsers;
    // the following line is commented out to clean up the console log as it is throwing a "data not defined" error
    // numUsers = data;
  }, 1000 / fps);
};

socket_loop();

// position of the camera in the beginning  0 1 4
// https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle


var radius = 20;
var center_x = 0;
var center_z = 4;

function appendObject(id) {
  // https://stackoverflow.com/questions/41336889/adding-new-entities-on-the-fly-in-aframe
  let x = getRandomArbitrary(40, 50);
  let y = 10;
  let z = getRandomArbitrary(40, 50);
  // imporve shadow randomization below
  const position = `${getRandomArbitrary(-20, 20)} ${1} ${getRandomArbitrary(
    -30,
    -20
  )}`;

  $("<a-plane/>", {
    id: `shadow${id}`,
    class: "shadowsss",
    position: position, // doesn't seem to do anything, known issue
    scale: "10 10 10",
    rotation: "0 0 0",
    material: "src: #shadow; transparent: true",
    appendTo: $("#lobby")
  });
  document.getElementById(`shadow${id}`).setAttribute("position", position); // this does set position as a workaround
}

function removeObject(objectCount) {
  let id = objectCount - 1;
  if (id < 0) {
    id = 0;
  }
  previousObject = document.getElementById(`shadow${id}`);
  previousObject.parentNode.removeChild(previousObject);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//######################################################################

//######################################################################
// Shape rain component below (scene 1 cubes)
var roundtripcounter = 0;
var shapes = [];
var shapepositions = {};

AFRAME.registerComponent("shaperain", {
  init: function () {
    console.log("shape-rainnnjnnnnnnn");
    this.shapesreference = [];
    let objects_per_shape = 10;
    // this.shapes = [];
    let size = 0.4,
      spacing = 1,
      x;
    let sceneEl = document.querySelector("#firstPerformance");

    // loop to make the boxes
    for (let i = 0; i < objects_per_shape; i++) {
      shapes[i] = document.createElement("a-entity"); // create the element
      // create components, id, geometry, position
      shapes[i].setAttribute("id", "box_" + i.toString());
      shapes[i].setAttribute("geometry", {
        primitive: "box",
        height: size,
        width: size,
        depth: size
      });
      x = (size + spacing) * objects_per_shape * -0.5 + i * (size + spacing);
      y = Math.random() + 1.5;
      z = getRandomArbitrary(-10, 10);
      const position = `${x} ${y} ${z}`;
      const position_dictionary = {
        x: x,
        y: y,
        z: z,
        z_initial: z
      };
      console.log("intended pos of shape", position);
      shapes[i].setAttribute("position", position);
      shapepositions["box_" + i.toString()] = position_dictionary;

      // you can add event listeners here for interaction, such as mouse events.
      sceneEl.appendChild(shapes[i]); // Append the element to the scene, so it becomes part of the DOM.

      // set position of the shape once its in the DOM as a workaround
      const shape_from_DOM = document.getElementById("box_" + i.toString());
      console.log("Shape from DOM old pos: \n", shape_from_DOM);
      shape_from_DOM.setAttribute("position", position);
      console.log("Shape from DOM new pos: \n", shape_from_DOM);
    }

    // loop to make the spheres
    for (let i = 10; i < (2*objects_per_shape); i++) {
      shapes[i] = document.createElement("a-entity"); // create the element
      // create components, id, geometry, position
      shapes[i].setAttribute("id", "sphere_" + i.toString());
      shapes[i].setAttribute("geometry", {
        primitive: "sphere",
        radius: size,
      });

      x = (size + spacing) * objects_per_shape * -0.5 + (i-10) * (size + spacing) * Math.random(0.8,1.2);
      y = Math.random() + 1.5;
      z = getRandomArbitrary(-10, 10);
      const position = `${x} ${y} ${z}`;
      const position_dictionary = {
        x: x,
        y: y,
        z: z,
        z_initial: z
      };
      console.log("intended pos of shape", position);
      shapes[i].setAttribute("position", position);
      shapepositions["sphere_" + i.toString()] = position_dictionary;

      // you can add event listeners here for interaction, such as mouse events.
      sceneEl.appendChild(shapes[i]); // Append the element to the scene, so it becomes part of the DOM.

      // set position of the shape once its in the DOM as a workaround
      const shape_from_DOM = document.getElementById("sphere_" + i.toString());
      console.log("Shape from DOM old pos: \n", shape_from_DOM);
      shape_from_DOM.setAttribute("position", position);
      console.log("Shape from DOM new pos: \n", shape_from_DOM);
    }

    // loop to make the dodecahedrons
    for (let i = 20; i < (3*objects_per_shape); i++) {
      shapes[i] = document.createElement("a-entity"); // create the element
      // create components, id, geometry, position
      shapes[i].setAttribute("id", "dodecahedron_" + i.toString());
      shapes[i].setAttribute("geometry", {
        primitive: "dodecahedron",
        radius: size,
      });

      x = ((size + spacing) * objects_per_shape * -0.5 + (i-20) * (size + spacing)) * Math.random(0.8,1.2);
      y = Math.random() + 3;
      z = getRandomArbitrary(-10, 10);
      const position = `${x} ${y} ${z}`;
      const position_dictionary = {
        x: x,
        y: y,
        z: z,
        z_initial: z
      };
      console.log("intended pos of shape", position);
      shapes[i].setAttribute("position", position);
      shapepositions["dodecahedron_" + i.toString()] = position_dictionary;

      // you can add event listeners here for interaction, such as mouse events.
      sceneEl.appendChild(shapes[i]); // Append the element to the scene, so it becomes part of the DOM.

      // set position of the shape once its in the DOM as a workaround
      const shape_from_DOM = document.getElementById("dodecahedron_" + i.toString());
      console.log("Shape from DOM old pos: \n", shape_from_DOM);
      shape_from_DOM.setAttribute("position", position);
      console.log("Shape from DOM new pos: \n", shape_from_DOM);
    }

    // loop to make the tetrahedrons
    for (let i = 30; i < (4*objects_per_shape); i++) {
      shapes[i] = document.createElement("a-entity"); // create the element
      // create components, id, geometry, position
      shapes[i].setAttribute("id", "tetrahedron_" + i.toString());
      shapes[i].setAttribute("geometry", {
        primitive: "tetrahedron",
        radius: size,
      });

      x = ((size + spacing) * objects_per_shape * -0.5 + (i-30) * (size + spacing)) * Math.random(0.8,1.2);
      y = Math.random() * 0.9 + 3;
      z = getRandomArbitrary(-10, 10);
      const position = `${x} ${y} ${z}`;
      const position_dictionary = {
        x: x,
        y: y,
        z: z,
        z_initial: z
      };
      console.log("intended pos of shape", position);
      shapes[i].setAttribute("position", position);
      shapepositions["tetrahedron_" + i.toString()] = position_dictionary;

      // you can add event listeners here for interaction, such as mouse events.
      sceneEl.appendChild(shapes[i]); // Append the element to the scene, so it becomes part of the DOM.

      // set position of the shape once its in the DOM as a workaround
      const shape_from_DOM = document.getElementById("tetrahedron_" + i.toString());
      console.log("Shape from DOM old pos: \n", shape_from_DOM);
      shape_from_DOM.setAttribute("position", position);
      console.log("Shape from DOM new pos: \n", shape_from_DOM);
    }

    // If you want to access THREEjs properties, you need to access them after they have loaded into the scene.
    // Get the shapes as THREEjs object
    // shapePosArr = [];
    // this.shapes.forEach(function(c){
    //   c.addEventListener('loaded', function(ev){
    //     let shape3D = c.getObject3D('mesh');
    //     //console.log(shape3D);
    //     this.shapesreference.push(shape3D);
    //   });
    // });
  },
  tick: function () {
    shapes.forEach(function (shape) {
      // if (roundtripcounter > 30){
      //   window.location.href = '/lobby';
      // }
      let shapePos = shape.getAttribute("position");
      let shape_id = shape.getAttribute("id");
      if (roundtripcounter === 0) {
        console.log(shapes);
        console.log("Shape pos in tick function");
        console.log(shapePos);
        console.log(shape.getAttribute("id"));
        console.log(shapepositions);
      }
      roundtripcounter += 1;
      xPos = shapepositions[shape_id]["x"];
      yPos = shapepositions[shape_id]["y"];
      zPos = shapepositions[shape_id]["z"] += 0.01;

      if (zPos > 9) {
        shapepositions[shape_id]["z"] = shapepositions[shape_id]["z_initial"];
        shape.setAttribute("color", getRandomColor());
        zPos = shapepositions[shape_id]["z"] = -10;
      }

      shape.setAttribute(
        "position",
        xPos.toString() + " " + yPos.toString() + " " + zPos.toString()
      );
    });

    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});

//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//######################################################################