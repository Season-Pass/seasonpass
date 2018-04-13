/*
  * This file contains functions for creating
  * controls for the game such as character movement
  * and keys for switching scenes.
*/




  // Variables
  var controls =
        { fwd: false, bwd: false, left: false, right: false,
          jump: false, speed: 30, devCameraActive: false
        }




    /*
      These are the controls for the character model.
      wsda will be used to move the character.
      * Arrow keys will be reimplemented when
      * dev camera is removed.
      * Might add more possible controls later.
      - Attack, grab, etc.
    */
    function keydown(event){
      console.log("Keydown:"+event.key);
      //
      if (gameState.scene == 'start' && event.key=='p') {
        gameState.scene = 'main';
        return;
      }
      switch (event.key){
        case "w":
          //case "ArrowUp":
          controls.fwd = true;  break;
        case "s":
          //case "ArrowDown":
          controls.bwd = true; break;
        case "a":
          //case "ArrowLeft":
          controls.left = true; break;
        case "d":
          //case "ArrowRight":
          controls.right = true; break;

        // switch cameras (will be removed at another time)
        case "1": devCameraActive = true; break;
        case "2": devCameraActive = false; break;
      }
    }

    /*
      These cancel the controls for the character model.
      wsda will be used to move the character.
      * A jump key has not been included yet.
      * Might add more possible controls later.
    */
    function keyup(){
      switch (event.key){
        case "w":
          //case "ArrowUp":
          controls.fwd = false;  break;
        case "s":
          //case "ArrowDown":
          controls.bwd = false; break;
        case "a":
          //case "ArrowLeft":
          controls.left = false; break;
        case "d":
          //case "ArrowRight":
          controls.right = false; break;
        case " ":
          controls.jump = true; break;
        case "c":
          if(showControls == true){
            showControls = false;
            info.innerHTML = "";
          } else{
            showControls = true;
            info.innerHTML = instructions;
          }
      }
    }

    /*
      This method determines the actions for
      the character controls them selves
      such as moving forward.
    */
    function charControls(){
      var y = -50;
      var velocity = sphere.getLinearVelocity();

      if(controls.jump){
        jump();
      } else if (controls.fwd){
        move(-controls.speed,y,0);
      } else if (controls.bwd){
        move(controls.speed,y,0);
      } else if (controls.left){
        move(0, y, controls.speed);
      } else if (controls.right){
        move(0, y, -controls.speed);
      } else {
        var velocity = sphere.getLinearVelocity();
        velocity.x=velocity.z=0;
        sphere.setLinearVelocity(velocity); //stop the xz motion
      }
    }

    /*
      This function creates the
      movement of the character in the
      x-z plane.
    */
    function move(x,y,z){
      var velocity = sphere.getLinearVelocity();
      if(velocity.y>0){
        velocity.x = x;
        velocity.z = z;
        sphere.setLinearVelocity(velocity);
      } else{
        sphere.setLinearVelocity(new THREE.Vector3(x, y, z));
      }
    }

    /*
      This function allows the character
      to jump.
      It may need refactoring.
    */
    function jump(){
      if(sphere.position.y<position() && sphere.position.y>position()-5){
          var velocity = sphere.getLinearVelocity();
          velocity.y = 15;
          sphere.setLinearVelocity(velocity);
          controls.jump = false;
        }
        if (controls.fwd){
          var velocity = sphere.getLinearVelocity();
          velocity.x = -controls.speed;
          sphere.setLinearVelocity(velocity);
        } else if (controls.bwd){
          var velocity = sphere.getLinearVelocity();
          velocity.x = controls.speed;
          sphere.setLinearVelocity(velocity);
        } else if (controls.left){
          var velocity = sphere.getLinearVelocity();
          velocity.z = controls.speed;
          sphere.setLinearVelocity(velocity);
        } else if (controls.right){
          var velocity = sphere.getLinearVelocity();
          velocity.z = -controls.speed;
          sphere.setLinearVelocity(velocity);
        } else {
          var velocity = sphere.getLinearVelocity();
          velocity.x=velocity.z=0;
          sphere.setLinearVelocity(velocity);
        }
    }

    /*
      This function teleports the character
      back to a spot on the map in case it falls off.
    */
    function charReset(){
      if(sphere.position.y < -110){
        sphere.__dirtyPosition = true;
        sphere.position.x = 10;
        sphere.position.y = -70;
        sphere.position.z = -215;
      }
    }

    /*
      This function is used by jump
      to limit the characters ability to jump
      depending on where it is on the map.
    */
    function position(){
      if(sphere.position.z>-98){
        return 5;
      } else if(sphere.position.z<-98 && sphere.position.z>-215){
        return -200;
      } else if(sphere.position.z<-215){
        return -75;
      }
    }
