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
  var camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var orbitControls = new THREE.OrbitControls(camera); // will be removed
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
      initControls();
      // ScenaryV2.js
      initCaveFloor();
      initCaveWall();
      initBoundry();
      initPassageFloor();
      initIcicles();
      initLight();
      initShadows();
      initParticles();
      // Character.js
      initSphere(); // - temporary character model
      // add helpers (will be removed at a later time)
      var spotLightHelper = new THREE.SpotLightHelper( spotLight );
      scene.add(new THREE.AxesHelper( 100 ));
      scene.add( spotLightHelper );
      //scene.add(gridHelper);
  }

  /*
    we update orbit controls in order
    to view the entire map.
    Finally, we render the scene.
    * will need to include a second perspective camera
    * will need to add controls for camera (lookAt object)
    * will need to add camera restraints
  */
  function render() {
    // controls and settings for the camera and character
      delta = clock.getDelta();
      orbitControls.update(delta); // will be removed at a later time
      camera.lookAt(new THREE.Vector3(0,30,-80));
      animateParticles();
      updateCharacter();
	    scene.simulate();
    // render using requestAnimationFrame
      renderer.render(scene, camera);
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
    camera.position.x = 250;
    camera.position.y = 50;
    camera.position.z = -50;
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
    Will be written at a later time.
    Will be used to handle window changes.
  */
  function eventHandler(){

  }
