/*
  *
  *
*/




    /*
      These are the controls for the character model.
      wsda will be used to move the character.
      * A jump key has not been included yet.
      * Might add more possible controls later.
      - Attack, grab, etc.
    */
    function keydown(event){
      console.log("Keydown:"+event.key);
      //console.dir(event);
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
		//start screen
      }
    }

    /*
      These cancel the controls for the character model.
      wsda will be used to move the character.
      * A jump key has not been included yet.
      * Might add more possible controls later.
    */
    function keyup(){
      //console.dir(event);
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
        case " ": controls.jump = true; break;
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

    function charControls(){
      var y = -50;
	    var sphVel = sphere.getLinearVelocity();

      if(controls.jump){
        jump();
      } else if (controls.fwd){
        var velocity = sphere.getLinearVelocity();
        if(velocity.y>0){
          velocity.x = -controls.speed;
          sphere.setLinearVelocity(velocity);
        } else{
          sphere.setLinearVelocity(new THREE.Vector3(-controls.speed, y, 0));
        }
      } else if (controls.bwd){
        var velocity = sphere.getLinearVelocity();
        if(velocity.y>0){
          velocity.x = controls.speed;
          sphere.setLinearVelocity(velocity);
        } else{
          sphere.setLinearVelocity(new THREE.Vector3(controls.speed, y, 0));
        }
      } else if (controls.left){
        var velocity = sphere.getLinearVelocity();
        if(velocity.y>0){
          velocity.z = controls.speed;
          sphere.setLinearVelocity(velocity);
        } else{
          sphere.setLinearVelocity(new THREE.Vector3(0, y,controls.speed));
        }
      } else if (controls.right){
        var velocity = sphere.getLinearVelocity();
        if(velocity.y>0){
          velocity.z = -controls.speed;
          sphere.setLinearVelocity(velocity);
        } else{
          sphere.setLinearVelocity(new THREE.Vector3(0, y,-controls.speed));
        }
      } else {
        var velocity = sphere.getLinearVelocity();
        velocity.x=velocity.z=0;
        //velocity.y= -15;
        sphere.setLinearVelocity(velocity); //stop the xz motion
      }
    }

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
          //velocity.y= -15;
          sphere.setLinearVelocity(velocity);
        }
    }

    function charReset(){
      if(sphere.position.y < -110){
        sphere.__dirtyPosition = true;
        sphere.position.x = 10;
        sphere.position.y = -70;
        sphere.position.z = -215;
      }
    }

    function position(){
      if(sphere.position.z>-98){
        return 5;
      } else if(sphere.position.z<-98 && sphere.position.z>-215){
        return -200;
      } else if(sphere.position.z<-215){
        return -75;
      }
    }
