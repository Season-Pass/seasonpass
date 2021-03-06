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
	var instructions = "Controls: WASD to move, Space to jump, C to toggle info, P to exit Start Screen";
	var showControls = true;
	info.style.position = 'absolute';
	info.style.width = 100;
	info.style.heght = 100;
	info.style.color = "white";
	info.innerHTML = instructions;
	info.style.top = window.innerHeight * 0.95 + 'px';
	info.style.left = 10 + 'px';
	document.body.appendChild(info);

	// scene variables
  var sphere; // model for small scale tests. Will be removed
	var avatar;
	var loader;




		/*
	    Creates a geometry and texture of avatar. A sample model loaded, animations and redone model to be added later
			fix later: * no more rotating boy :( fix rotation to be based on controls?
									* remove black lines from texture
			-K

			This method will only be implemented when
			the model is able to be loaded into the game
			for use and all current abilities modeled by sphere
			are able to be used by avatar in order to allow
			for continued editing.

			-N (I will delete this message later)
	  */
	  function initAvatar(){
			loader = new THREE.JSONLoader();
			loader.load("libs/penguin5.json",
			function ( geometry, materials ) {
				var texture = new THREE.TextureLoader().load( "../libs/Images/penguintexture.png" );
				//texture.magFilter = THREE.LinearFilter; //probably dont need, trying to remove black lines from in between texture :(
				var pmaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({map: texture}),1, 0);
				var penguin = new Physijs.BoxMesh(	geometry,pmaterial,1	);

				penguin.setDamping(0.1,0.1);
	 	    penguin.position.y = 5;
				penguin.castShadow = true;
				penguin.receiveShadow = false;
				scene.add( penguin );
				penguin.scale.set(3,3,3);
				sphere = penguin;//last problem: set directions penguin is facing!!
			});
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
			sphere.position.z = 0;
			sphere.setDamping(0.1,0.1);
			sphere.castShadow = true;
			//scene.add(sphere);
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



	//this is for the function below
	var story = document.createElement('div');
	var display;
	const story1 = "It seems your companions left you alone in this cave.";
	const story2 = "You know there must be a way out. After all, the others were able to escape without you.";
	const story3 = "Of course, the others could actually fly past all the platforms.";
	const story4 = "But you're determined to find your own way out.";
	const story5 = "Despair seeps into the inner depths of your soul as you begin to realize your fate... "
	const story6 = story5 + "Without a Season Pass, you are doomed to a life that ends right when it is just beginning.";
	story.style.position = 'absolute';
	story.style.color = "maroon";
	story.style.width = 100;
	story.style.top = window.innerHeight * 0.05 + 'px';
	story.style.left = 10 + 'px';
	document.body.appendChild(story);

	 /*
		This updates the text at the bottom of the screen based on
		the horizontal position of the avatar to make some sort of
		story.

		I'm not really sure which file to put this in, so I can move
		it to a different file later. Right now it is being called
		in States.js
		-Zeline
	*/
	function updateStory(){
		//change sphere to avatar later
		if(sphere.position.z < 95 && sphere.position.z > -95){
			display = story1;
		} else if(sphere.position.z < -200 && sphere.position.z > -380){
			display = story2;
		} else if(sphere.position.z <= -380 && sphere.position.z > -530){
			display = story3;
		} else if(sphere.position.z < -550 && sphere.position.z > -610){
			display = story4;
		} else if(sphere.position.z < -650 && sphere.position.z > -740){
			display = story5;
		} else if(sphere.position.z <= -740 && sphere.position.z > -805){
			display = story6;
		} else if(!(display === "There's no going back.")){
			display = '';
		}
		story.innerHTML = '<font size="20"><i><center>' + display + '</center></i></font>';
	}
