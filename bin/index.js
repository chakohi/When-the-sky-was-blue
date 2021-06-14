// console.log("Lobby scene");
// AFRAME.registerComponent("calcdistance", {
//   init: function() {
//     this.cam = document.querySelector("a-camera");
//     this.sphere = document.querySelector("a-sphere");
//   },
//   tick: function() {
//     // console.log(this.sphere);
//     // console.log(this.cam);
//     console.log("ruuuun");
//     let camPos = this.cam.object3D.position;
//     let spherePos = this.sphere.object3D.position;
//     let distance = camPos.distanceTo(spherePos);
//     console.log(distance);
//     if (distance < 6) {
//       // camera closer than 5m, do something
//       console.log("AAAAH change scene");
//     }
//   }
// });

AFRAME.registerComponent("foo", {
  init: function() {
    this.el.addEventListener("hitstart", e => {
      console.log("aaaaah");
      console.log(
        e.target.id,
        "collided with",
        e.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)
      );
      var collidedwithid =
        e.target.components["aabb-collider"]["intersectedEls"][0].id;
      console.log("collidedwithid", collidedwithid);

      //load new page bvased on who you collided with
      
      window.location.href = "/scene"+collidedwithid.slice(-1);
    });
  }
});



/*Socket IO side */
var socket = io.connect();
