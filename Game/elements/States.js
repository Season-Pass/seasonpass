/*
  * This file will contain gamestates and scenes such as:
  - Title screen
  - pause screen
  - game over screen
  - end of game screen
  - health, attack, etc.
  * For now the main scene is found in the Environment.js file

  Nadia Kubatin
*/



  // variables
  var gameOver, startScreen, pauseScreen, endScreen;
  var overCam, startCam, pauseCam, endCam;
  // stats
  var gameState =
      { health:10, lives: 3, scene:'start', collide:false }
      // colide may be used to code for enemy attacks




    /*
      This creates the start screen of the game.
      For now, it will only contain a play button.
      It may also contain a credits button that will
      take you to a credits page.
      * It may show a close up of the character model?
      * It may show some other scene.

      Victor Kubatin
    */
    function createStart(){
      // scene components
      startScreen = initScene();
      startText = createSkyBox('libs/Images/startscene.png', 10);
      startScreen.add(startText);

      // lights
  		var light = createPointLight();
  		light.position.set(0,200,20);
  		startScreen.add(light);

      // camera
  		startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  		startCam.position.set(0,50,1);
  		startCam.lookAt(0,0,0);
    }

    /*
      This function creates a game over screen
      in case the character dies.
    */
    function createGameOver(){
      gameOver = initScene();

      // SCENE COMPONENTS GO HERE.
      // THE ACTUAL SCENE HAS YET TO BE CREATED.

      // lights
  		var light = createPointLight();
  		light.position.set(0,200,20);
  		gameOver.add(light);

      // camera
  		overCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  		overCam.position.set(0,50,1);
  		overCam.lookAt(0,0,0);
    }

    /*
      This function creates a pause screen.
    */
    function createPause(){
      pauseScreen = initScene();

      // SCENE COMPONENTS GO HERE.
      // THE ACTUAL SCENE HAS YET TO BE CREATED.

      // lights
  		var light = createPointLight();
  		light.position.set(0,200,20);
  		pauseScreen.add(light);

      // camera
  		pauseCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  		pauseCam.position.set(0,50,1);
  		pauseCam.lookAt(0,0,0);
    }

    /*
      This creates the end scene for when the character
      completes the game.
      It will contain a message that says
      "You must buy the season pass to unlock
      the rest of the game".
      It may also contain credits.
    */
    function createEnd(){
      endScreen = initScene();

      // SCENE COMPONENTS GO HERE.
      // THE ACTUAL SCENE HAS YET TO BE CREATED.

      // lights
  		var light = createPointLight();
  		light.position.set(0,200,20);
  		endScreen.add(light);

      // camera
  		endCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  		endCam.position.set(0,50,1);
  		endCam.lookAt(0,0,0);
    }

    /*
  		Creates a point light
  	*/
  	function createPointLight(){
  		var light;
  		light = new THREE.PointLight( 0xffffff);
  		light.castShadow = true;

  		//Set up shadow properties for the light
  		light.shadow.mapSize.width = 2048;  // default
  		light.shadow.mapSize.height = 2048; // default
  		light.shadow.camera.near = 0.5;       // default
  		light.shadow.camera.far = 500      // default
  		return light;
  	}

    /*
      This function switchs the scene
      depending on what the state is.
    */
    function switchGameState(){
      switch(gameState.scene) {

  			case "pause":
  				renderer.render( pauseScreen, pauseCam );
  				break;

  			case "start":
  				renderer.render( startScreen, startCam );
  				break;

  			case "gameover":
  				renderer.render( gameOver, overCam );
  				break;

        case "end":
  				renderer.render( endScreen, endCam );
  				break;

  			case "main":
          updateCamera();
          cameraZoom();
          updateCharacter();
          animateParticles();
		  updateStory();
          scene.simulate();
		  

          // Will be removed with devCamera at another time
          // renderer.render( scene, camera );
          if (devCameraActive){
            renderer.render( scene, devCamera );
          }else {
            renderer.render( scene, camera );
          }
  				break;

  			default:
  			  console.log("don't know the scene "+gameState.scene);
  		}
    }
