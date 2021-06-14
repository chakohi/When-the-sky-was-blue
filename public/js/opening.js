$(document).ready(function() {
  // document.getElementById('player').play().catch((error)=>{
  //   //remove normal text
  //   document.getElementById("opening_text").style.display = "none";
  //   //display error text
  //   document.getElementById("audio_error_text").style.display = "block";

  // });
  // navigator.getUserMedia =
  //   navigator.getUserMedia ||
  //   navigator.webkitGetUserMedia ||
  //   navigator.mozGetUserMedia ||
  //   navigator.msGetUserMedia;

  // if (navigator.getUserMedia) {
  //   navigator.getUserMedia(
  //     { audio: true },
  //     function onSuccess(stream) {
  //       // go play
  //       console.log("yaaaaay wohhooooo");
  //       document.getElementById("player").play();
  //     },
  //     function onError(error) {
  //       console.log("naaaaah why u mad at me");
  //     }
  //   );
  // } else {
  //   console.log("very bad browser faaaam");
  // }



  //3 seconds transition time
  // prod time below
  // var transitiontime = 6500;
  //dev time below so that it is quicker for testing

  $("#text1").fadeIn(4500);
  $("#text2").fadeIn(4500);
  $("#startButtonContainer").fadeIn(4500);
  //first text container
});

function reload() {
  window.location.reload(false);
}
var scene = document.querySelector("a-scene");
var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  $("#iframeAudio").remove();
} else {
  $("#playAudio").remove(); // just to make sure that it will not have 2x audio in the background
}

var socket = io().connect();

var fadeInScreen = document.getElementById("fullscreenFadeIn");
const sceneButton = document.querySelector("#toScene");
var transitiontime = 10;

sceneButton.addEventListener("click", () => {
  playIntro();
  setTimeout(function() {
    $("#text2").fadeIn(4000);
    //second textcontainer
    setTimeout(function() {
      $("#textcontainer1").fadeOut(1900);
      setTimeout(function() {
        $("#textcontainer2").fadeIn(4500);
        $("#textcontainer1").remove();
        setTimeout(function() {
          $("#textcontainer2").fadeOut(1900);
          setTimeout(function() {
            $("#textcontainer3").fadeIn(4500);
            $("#textcontainer2").remove();
            setTimeout(function() {
              $("#textcontainer3").fadeOut(1900);
              setTimeout(function() {
                $("#textcontainer4").fadeIn(4500);
                $("#textcontainer3").remove();
                setTimeout(function() {
                  $("#textcontainer4").fadeOut(1900);
                  fadeInScreen.style.zIndex = 10;
                  sceneButton.style.zIndex = 1;
                  fadeInScreen.classList.toggle("fadeInWhite");
                  $("#textcontainer4").remove();
                  document.getElementById("player").play();
                  // var timeoutID = setTimeout(timeout(), 3000);
                  setTimeout(function() {
                    timeout();
                  }, 4000);
                }, transitiontime);
              }, 2000);
            }, transitiontime);
          }, 2000);
        }, transitiontime);
      }, 2000);
    }, transitiontime);
  }, transitiontime);
});

function timeout() {
  console.log("it's done");
  // window.location.href = "http://localhost:3000/performance";
  //             $("#textcontainer4").remove();
  document.querySelector("#waitOnMe").remove();
  scene.play();
  var myAudio = document.getElementById("base_layer_always_on");
  myAudio.play();
  myAudio.volume = 0.8;
  setTimeout(function() {
    document.querySelector("#openingTitle").remove();
  }, 400);
}

function playIntro(){
  
}