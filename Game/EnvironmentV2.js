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
  var scene = new Physijs.Scene();
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
    We initialize everything in the scene
    and add it to the scene.
    Functions are from other files.
  */
  function init() {

      initPhysijs();
      initRenderer();

      // Camera.js
      initCamera();
      initDevCamera(); // will be removed

      // Room1V2.js
      initCaveFloor();
      initCaveWall();
      initBoundry();
      //initPassageWall2();
      initPassageWall1();
      initControls(camera); //******************
      // Map.js
      initIcicles();
      initParticles();
      // Light.js
      initLight();
      initShadows();
      // Character.js
      initSphere(); // - temporary character model
      // SoundV2.js
      initGameMusic();

      // add helpers (will be removed at a later time)
      var spotLightHelper = new THREE.SpotLightHelper( spotLight );
      scene.add(new THREE.AxesHelper( 100 ));
      scene.add( spotLightHelper );
      //scene.add(gridHelper);

      window.addEventListener('resize',onWindowResize, false);
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

      updateCamera();
      updateCharacter();
      animateParticles();
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
    This function creates the script for physics.
  */
  function initPhysijs(){
    Physijs.scripts.worker = 'physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
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
    Handles changes in window resize
  */
  function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
