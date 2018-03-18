/*
  * This file holds functions for creating
  * and controlling the camera.

  Nadia Kubatin
*/


  // variables
  var camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var devCamera = new THREE.PerspectiveCamera( // devCamera will be removed
                    50,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var orbitControls = new THREE.OrbitControls(devCamera); // will be removed
  var devCameraActive = false; // will be removed




  /*
    This function updates the camera's
    position and makes it follow the character.
    It also updates orbit controls for the devCamera.
  */
  function updateCamera(){
    orbitControls.update(delta); // will be removed at a later time
    camera.lookAt(new THREE.Vector3(sphere.position.x,sphere.position.y+10,sphere.position.z));
    camera.position.z = sphere.position.z;
    camera.position.y = sphere.position.y+10

  }

  /*
    Creates a camera and sets its position.
  */
  function initCamera(){
    camera.position.x = 150;
    camera.position.y = 20;
    camera.position.z = 0;
  }

  /*
    This creates a camera soley for
    the purpose of looking at the scene.
  */
  function initDevCamera(){
    devCamera.position.x = 200;
    devCamera.position.y = 50;
    devCamera.position.z = -10;
  }
