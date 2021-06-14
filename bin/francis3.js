console.log("third scene aka francis 3");
let planePos = 0;
AFRAME.registerComponent("foo", {
  init: function() {
    this.cam = document.querySelector("a-camera");
    this.plane = document.querySelector("#planeToFollow");
  },
  tick: function(time) {
    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
    if (time < 5000) {
    } else {
      planePos -= 0.02;
      console.log("planePos is: " + planePos);
    }
    let camPos = this.cam.object3D.position;

    this.plane.setAttribute("position", {
      x: camPos.x,
      y: planePos,
      z: camPos.z
    });
    if (planePos < -20) {
      window.location.href =  "/lobby";
    }
  }
});


/*Socket IO side */
var socket = io.connect();
