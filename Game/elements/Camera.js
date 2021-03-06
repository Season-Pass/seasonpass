/*
  * This file holds functions for creating
  * and controlling the camera.
  > Need to fix camera movement.

  Nadia Kubatin
*/




  // variables
  var camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  // Variables below will be removed at a later time
  var devCamera = new THREE.PerspectiveCamera(
                    50,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var orbitControls = new THREE.OrbitControls(devCamera);
  var devCameraActive = false;




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
      camera.position.x = 100;
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
      devCamera.position.z = -200;
    }

    /*
      Will update the camera's proximity to the character
      depending on the location so that the view will
      change depending on the room.
      This will make it easier to view the scene and therefore
      play the game and move the character.
    */
    function cameraZoom(){
      if(sphere.position.z<-98 && sphere.position.z>-609){
        if(camera.position.x>50){
          camera.position.x--;
        }
      } else if(sphere.position.z>-98){
        if(camera.position.x<100){
          camera.position.x++;
        }
      } else if(sphere.position.z<-610 && sphere.position.z>-845){
        if(sphere.position.y>-70){
          if(camera.position.x>sphere.position.x+70){
            camera.position.x--;
          }
          if(camera.position.x<sphere.position.x+70){
            camera.position.x++;
          }
        } else{
          if(camera.position.x<100){
            camera.position.x++;
          }
        }
      } else if(sphere.position.z<-846){
        if(camera.position.x<200){
          camera.position.x++;
        }
      }
    }
