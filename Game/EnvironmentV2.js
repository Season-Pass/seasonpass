/*
  * This is the main file for initiating the scene
  * as wells as any other features such as animation, cameras and the renderer.
  * It includes the init and render(animate) function.
  * Helpers will also be inluded here.
  * All files called in this file must be called first in GameV2.html.
  - Should I move the camera to a different file?

  Nadia Kubatin
*/

  // variables
  var renderer = new THREE.WebGLRenderer();
  var scene = new Physijs.Scene();

  // cameras
  var camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var devCamera = new THREE.PerspectiveCamera( // devCamera will be removed
                    50,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var orbitControls = new THREE.OrbitControls(devCamera); // will be removed
  var devCameraActive = false; // will be removed

  // animation
  var clock = new THREE.Clock();
  var delta;

  // helpers (will be removed at a later time)
  var gridSize = 1000;
  var gridDivisions = 100;
  var gridHelper = new THREE.GridHelper( gridSize, gridDivisions );


  init();
  initControls();
  render();

  /*
    we initialize everything in the scene
    and add it to the scene.
    functions are from other files.
  */
  function init() {

      initPhysijs();
      initRenderer();
      initCamera();
      initDevCamera(); // will be removed
      initControls();

      // ScenaryV2.js
      initCaveFloor();
      initCaveWall();
      initBoundry();
      initPassageWall1();
      initPassageWall2();
      //initPassageFloor();
      initIcicles();
      initLight();
      initShadows();
      initParticles();

      // Character.js
<<<<<<< HEAD
      initGameMusic();
      // SoundV2.js
      //initSphere(); // - temporary character model
=======
      initSphere(); // - temporary character model

>>>>>>> aa5bde5fe1983aa1ea041e5d4e309e32bb903021
      // add helpers (will be removed at a later time)
      var spotLightHelper = new THREE.SpotLightHelper( spotLight );
      scene.add(new THREE.AxesHelper( 100 ));
      scene.add( spotLightHelper );
      //scene.add(gridHelper);

      window.addEventListener('resize',onWindowResize, false);
  }

  /*
    we update orbit controls in order
    to view the entire map.
    Finally, we render the scene.
    * will need to add camera restraints
  */
  function render() {
    // controls and settings for the camera and character
      delta = clock.getDelta();
      orbitControls.update(delta); // will be removed at a later time
      camera.lookAt(new THREE.Vector3(sphere.position.x,10,sphere.position.z));
      camera.position.z = sphere.position.z;

      animateParticles();
      updateCharacter();
	    scene.simulate();

    // render using requestAnimationFrame
      if (devCameraActive){
        renderer.render( scene, devCamera );
      }else {
        renderer.render( scene, camera );
      }
      //renderer.render(scene, camera);
      requestAnimationFrame(render);
  }

  /*
    function that initiates a renderer.
    it gives the renderer a size and canvas.
    it also tells it to compute soft shadows.
    * might move renderer to separate file
    * will need to add window resize
  */
  function initRenderer(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  /*
    This function creates the script for physics.
  */
  function initPhysijs(){
    Physijs.scripts.worker = 'libs/js/physijs_worker.js';
    Physijs.scripts.ammo = 'libs/js/ammo.js';
  }

  /*
    creates a camera and sets its position
    also tells it where to look and sets
    other settings such as speed.
    * need to add second camera to follow character
    - depends on whether the character or environment will move
    * might move to new file
  */
  function initCamera(){
    camera.position.x = 150;
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
    devCamera.position.z = -10;
  }

  /*
    This function initiates controls
    for the character and adds event listeners.
  */
  function initControls(){
    clock.start();

    window.addEventListener( 'keydown', keydown);
    window.addEventListener( 'keyup', keyup );
  }

  /*
    Handles changes in the window size.
  */
  function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
