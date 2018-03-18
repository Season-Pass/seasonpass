/*
  * This is the main file for initiating the scene
  * as wells as any other features such as controls, cameras and the renderer.
  * It includes the init and render(animate) function.
  * Helpers will also be inluded here.
  * All files called in this file must be called first in GameV2.html.

  -Nadia Kubatin
*/

  // variables
  var renderer = new THREE.WebGLRenderer();
<<<<<<< HEAD
  var scene = new Physijs.Scene();

  // animation
=======
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var orbitControls = new THREE.OrbitControls(camera); // will be removed
>>>>>>> dcffc4d6a7fc4ae14ea5a0d6e06f9b2031e58e55
  var clock = new THREE.Clock();
  var delta;
  // helpers (will be removed at a later time)
  var gridSize = 1000;
  var gridDivisions = 100;
  var gridHelper = new THREE.GridHelper( gridSize, gridDivisions );




  init();
  render();




  /*
    We initialize everything in the scene
    and add it to the scene.
    Functions are from other files.
  */
  function init() {

      initRenderer();
      initControls();

      // Camera.js
      initCamera();
<<<<<<< HEAD
      initDevCamera(); // will be removed

      // ScenaryV2.js
      initCaveFloor();
      initCaveWall();
      initBoundry();
      initPassageWall1();
      initPassageWall2();
=======
      initControls(camera);
      // ScenaryV2.js
      initCaveFloor();
      initCaveWall();
      initPassageFloor();
      //initPassageWall();
>>>>>>> dcffc4d6a7fc4ae14ea5a0d6e06f9b2031e58e55
      initIcicles();
      initLight();
      initShadows();
      initParticles();
      // Character.js
<<<<<<< HEAD
      mainGameMusic();
      // SoundV2.js
      //initSphere(); // - temporary character model
      initSphere(); // - temporary character model

      // SoundV2.js
      initGameMusic();

>>>>>>> 2ca0af60ced365825cc9398565b160195637dfd3
      // add helpers (will be removed at a later time)
      var spotLightHelper = new THREE.SpotLightHelper( spotLight );
      scene.add(new THREE.AxesHelper( 100 ));
      scene.add( spotLightHelper );
      //scene.add(gridHelper);
  }

  /*
    We update the camera in order
    to view the entire map.
    Finally, we render the scene.
    * will need to include a second perspective camera
    * will need to add controls for camera (lookAt object)
    * will need to add camera restraints
  */
  function render() {
    // controls and settings for the camera
      delta = clock.getDelta();
<<<<<<< HEAD

      updateCamera();
=======
      orbitControls.update(delta); // will be removed at a later time
      camera.lookAt(new THREE.Vector3(0,30,-80));
>>>>>>> dcffc4d6a7fc4ae14ea5a0d6e06f9b2031e58e55
      animateParticles();
      //map.translateX(controls.xSpeed*delta*10);
    //  map.translateY(controls.ySpeed*delta*10);
      //map.translateZ(controls.zSpeed*delta*10);
    // render using requestAnimationFrame
      renderer.render(scene, camera);
      requestAnimationFrame(render);
  }

  /*
    Function that initiates a renderer.
    It gives the renderer a size and canvas.
    It also tells it to compute soft shadows.
    * might move renderer to separate file
  */
  function initRenderer(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  /*
<<<<<<< HEAD
    This function creates the script for physics.
  */
  function initPhysijs(){
    Physijs.scripts.worker = 'physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
=======
    creates a camera and sets its position
    also tells it where to look and sets
    other settings such as speed.
    * need to add second camera to follow character
    - depends on whether the character or environment will move
    * might move to new file
  */
  function initCamera(){
    camera.position.x = 250;
    camera.position.y = 50;
    camera.position.z = -50;
  }

<<<<<<< HEAD
=======
  /*
    This creates a camera soley for
    the purpose of looking at the scene.
  */
  function initDevCamera(){
    devCamera.position.x = 200;
    devCamera.position.y = 50;
    devCamera.position.z = -10;
>>>>>>> dcffc4d6a7fc4ae14ea5a0d6e06f9b2031e58e55
  }

  /*
    This function initiates controls
    for the character and adds event listeners.
  */
>>>>>>> 2ca0af60ced365825cc9398565b160195637dfd3
  function initControls(){
    clock.start();

    window.addEventListener( 'keydown', keydown);
    window.addEventListener( 'keyup', keyup );
  }

  /*
    *can be used in Character controls
  function keydown(event){
    //console.log("Keydown:"+event.key);
		//console.dir(event);
		switch (event.key){
			case "w": controls.zSpeed = -1;  break;
			case "s": controls.zSpeed=1; break;
      case "a": controls.xSpeed=-1; break;
			case "d": controls.xSpeed=1; break;
      case "r": controls.ySpeed=1; break;
			case "f": controls.ySpeed=-1; break;
      case "ArrowLeft": controls.yRotSpeed = 1; break;
      case "ArrowRight": controls.yRotSpeed = -1; break;
		}
  }

  function keyup(){
    //console.log("Keydown:"+event.key);
		//console.dir(event);
		switch (event.key){
			case "w": controls.zSpeed=0; break;
			case "s": controls.zSpeed=0; break;
      case "a": controls.xSpeed=0; break;
			case "d": controls.xSpeed=0; break;
      case "r": controls.ySpeed=0; break;
			case "f": controls.ySpeed=0; break;
      case "ArrowLeft": controls.yRotSpeed=0; break;
			case "ArrowRight": controls.yRotSpeed=0; break;
		}
  }*/

  function eventHandler(){

  }
