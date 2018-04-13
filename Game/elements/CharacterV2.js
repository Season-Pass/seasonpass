/*
  * This file will contain character model information.
  - Character design using blender.
  * This file also contains the game controls.
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



	// information to be displayed on screen
	var info = document.createElement('div');
	var instructions = "Controls: WASD to move, Space to jump, C to toggle info, P to exit Start Screen"
	var showControls = true;
	info.style.position = 'absolute';
	info.style.width = 100;
	info.style.heght = 100;
	info.style.color = "white";
	info.innerHTML = instructions;
	info.style.top = 10 + 'px';
	info.style.left = 10 + 'px';
	document.body.appendChild(info);

	// scene variables
  var sphere; // model for small scale tests. Will be removed




	/*
    Creates a geometry and texture of avatar. A sample model loaded, animations and redone model to be added later
		fix later: * no more rotating boy :( fix rotation to be based on controls?
								* remove black lines from texture
		-K
  */
  function initAvatar(){
		// BEGIN Clara.io JSON loader code
		loader = new THREE.JSONLoader();
		loader.load("../libs/penguin.json",
		function ( geometry, materials ) {
			var texture = new THREE.TextureLoader().load( "../libs/Images/penguintexture.png" );
			texture.magFilter = THREE.LinearFilter; //probably dont need, trying to remove black lines from in between texture :(
			var pmaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({map: texture}),0.9,0.5);
			var penguin = new Physijs.BoxMesh(	geometry,pmaterial	);

			penguin.setDamping(0.1,0.1);
 	    penguin.position.y = 5;
			penguin.castShadow = true;
			penguin.receiveShadow = false;
			scene.add( penguin );
			penguin.scale.set(3,3,3);
			avatar = penguin;
		});
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
    sphere2.position.z = -610;
    scene.add(sphere2);
  }

  /*
    This function dicates what each key does.
    * Must include a method for multiple actions.
    * This function desperatly needs to be refactored.
    * Will play with parameters to optimize controls.
    * The world's most horrifying if else statement (O_O)
  */
  function updateCharacter(){

		charControls();

		charReset();
  }
