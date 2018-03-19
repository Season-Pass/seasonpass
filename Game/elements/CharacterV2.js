/*
  * This file will contain character model information.
  - Character design using Three.js and grouping or blender.
  - Character controls
  > Space/X = jump has not been implemented
  > "Look up" function?
  - Animations are different from movement
  > make specific animations for certain actions
  > ex. walking animation for move, jumping animation for jump
  - include a slide down hill animation
  * Functions made in this file should be called in Scene
  - puzzle characteristics
  > ability to move objects to solve puzzles?

  Nadia Kubatin
*/

  var sphere; // model for small scale tests. Will be removed
  var controls =
          { fwd: false, bwd: false, left: false, right: false,
            jump: false, speed: 30, devCameraActive: false
          }

  /*
    Creates a geometry and texture for a sphere.
    It also sets the position of the sphere.
    * This sphere is a temporary placement for
    * a future character model.
  */
  function initSphere(){
    var geometrysp = new THREE.SphereGeometry(3, 40, 40);
    var materialsp = new THREE.MeshLambertMaterial( { color: 0xff0000} );
    var pmaterialsp = new Physijs.createMaterial(materialsp,0.9,0.5);
    sphere = new Physijs.SphereMesh( geometrysp, pmaterialsp );
    sphere.position.y = 5;
    sphere.setDamping(0.1,0.1);
    sphere.castShadow = true;
    scene.add(sphere);
  }

  /*
    These are the controls for the character model.
    wsda will be used to move the character.
    * A jump key has not been included yet.
    * Might add more possible controls later.
  */
  function keydown(event){
    console.log("Keydown:"+event.key);
		//console.dir(event);
		switch (event.key){
			case "w": controls.fwd = true;  break;
			case "s": controls.bwd = true; break;
      case "a": controls.left = true; break;
			case "d": controls.right = true; break;
      case " ": controls.jump = true; break;

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
		//console.dir(event);
    switch (event.key){
			case "w": controls.fwd = false;  break;
			case "s": controls.bwd = false; break;
      case "a": controls.left = false; break;
			case "d": controls.right = false; break;
      case " ": controls.jump = false; break;
		}
  }

  /*
    This function dicates what each key does.
    * Must include a method for multiple actions.
    * Jump has yet to be implemented.
  */
  function updateCharacter(){
    var forward = sphere.getWorldDirection();

		if (controls.fwd){
			sphere.setLinearVelocity(new THREE.Vector3(-controls.speed,0,0));
		} else if (controls.bwd){
			sphere.setLinearVelocity(new THREE.Vector3(controls.speed,0,0));
		} else {
			var velocity = sphere.getLinearVelocity();
			velocity.x=velocity.z=0;
			sphere.setLinearVelocity(velocity); //stop the xz motion
		}

		if (controls.left){
			sphere.setLinearVelocity(new THREE.Vector3(0,0,controls.speed));
		} else if (controls.right){
			sphere.setLinearVelocity(new THREE.Vector3(0,0,-controls.speed));
		}

    /*if(controls.jump){
      sphere.setLinearVelocity(new THREE.Vector3(0,controls.speed,0));
    } else{
      var velocity = sphere.getLinearVelocity();
			velocity.y=0;
			sphere.setLinearVelocity(new THREE.Vector3(0,0,0));
    }*/
  }
