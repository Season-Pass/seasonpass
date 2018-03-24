/*
  * This file will contain gamestates and scenes such as:
  - Title screen
  - pause screen
  - game over screen
  - end of game screen
  - health, attack, etc.
  > has yet to be implemented.
  > This file contains only the backbone for the functions!
  * For now the main scene is found in the Environment.js file

  Nadia Kubatin
*/



  // variables
  var gameOver, startScreen, pauseScreen, endScreen;
  var overCam, startCam, pauseCam, endCam;
  // stats
  var gameState =
      { health:10, scene:'start', camera:'none', collide:false }
      // colide may be used to code for enemy attacks




  /*
    This creates the start screen of the game.
    For now, it will only contain a play button.
    It may also contain a credits button that will
    take you to a credits page.
    * It may show a close up of the character model?
    * It may show some other scene.
  */
  function createStart(){
    startScreen = initScene();

    // SCENE COMPONENTS GO HERE.
    // THE ACTUAL SCENE HAS YET TO BE CREATED.

    // lights
		var light = createPointLight();
		light.position.set(0,200,20);
		startScene.add(light);

    // camera
		startCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		startCam.position.set(0,50,1);
		startCam.lookAt(0,0,0);
  }

  /*

  */
  function createGameOver(){
    gameOver = initScene();

    // SCENE COMPONENTS GO HERE.
    // THE ACTUAL SCENE HAS YET TO BE CREATED.

    // lights
		var light = createPointLight();
		light.position.set(0,200,20);
		startScene.add(light);

    // camera
		overCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		overCam.position.set(0,50,1);
		overCam.lookAt(0,0,0);
  }

  /*

  */
  function createPause(){
    pauseScreen = initScene();

    // SCENE COMPONENTS GO HERE.
    // THE ACTUAL SCENE HAS YET TO BE CREATED.

    // lights
		var light = createPointLight();
		light.position.set(0,200,20);
		startScene.add(light);

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
		startScene.add(light);

    // camera
		endCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		endCam.position.set(0,50,1);
		endCam.lookAt(0,0,0);
  }
