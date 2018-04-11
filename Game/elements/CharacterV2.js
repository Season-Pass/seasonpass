/*
  * This file will contain character model information.
  - Character design using blender.
  * This file also contains the game controls.
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

	var info = document.createElement('div');
	var instructions = "Controls: AWSD to move, Space to jump, C to toggle info, P to exit Start Screen"
	var showControls = true;
	info.style.position = 'absolute';
	info.style.width = 100;
	info.style.heght = 100;
	info.style.color = "white";
	info.innerHTML = instructions;
	info.style.top = 10 + 'px';
	info.style.left = 10 + 'px';
	document.body.appendChild(info);

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
	    * It will be replaced by a blender object.
	  */
	  function initSphere(){
	    var geometrysp = new THREE.SphereGeometry(3, 40, 40);
	    var materialsp = new THREE.MeshLambertMaterial( { color: 0xff0000} );
	    var pmaterialsp = new Physijs.createMaterial(materialsp, 1, 0);
	    sphere = new Physijs.SphereMesh( geometrysp, pmaterialsp, 1 );
	    sphere.position.y = 5;
	    sphere.setDamping(0.1,0.1);
	    sphere.castShadow = true;
	    scene.add(sphere);
	  }

	  /*
	    Creates a geometry and texture for a sphere.
	    It also sets the position of the sphere.
	    * This sphere is a helper to find locations on the map.
	  */
	  function initPosTest(){
	    var geometrysp = new THREE.SphereGeometry(1, 40, 40);
	    var materialsp = new THREE.MeshBasicMaterial( { color: 0xff99ff} );
	    var sphere2 = new THREE.Mesh( geometrysp, materialsp );
	    sphere2.position.y = -79;
	    sphere2.position.x = 10;
	    sphere2.position.z = -215;
	    scene.add(sphere2);
	  }

	  /*
	    This function dicates what each key does.
	    * Must include a method for multiple actions.
	    * Jump has yet to be implemented.
	    * This function desperatly needs to be refactored.
	    * Will play with parameters to optimize controls.
	    * The world's most horrifying if else statement (O_O)
	  */
	  function updateCharacter(){

			charControls();

			charReset();
	  }
