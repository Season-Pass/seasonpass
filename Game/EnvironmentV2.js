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
  var scene;
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




  function init(){

    initPhysijs();
    scene = initScene();
    initMain();
    initRenderer();

  }

  /*
    We initialize everything in the scene
    and add it to the scene.
    Functions are from other files.
  */
  function initMain() {

      // Camera.js
      initCamera();
      initDevCamera(); // will be removed
      // Room1V2.js
      initCaveFloor();
      initCaveWall();
      initBoundry();
      initPassageWall1();
      // Room2V2.js
      initWall();
      initFloors();
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
      initHelpers();

      window.addEventListener('resize',onWindowResize, false);
  }

  /*
    We update the camera in order
    to view the entire map.
    Finally, we render the scene.
    * will need to add camera restraints
  */
  function render() {
    // controls and settings for the camera
      delta = clock.getDelta();

      updateCamera();
      cameraZoom();
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

  */
  function initScene(){
    var scene = new Physijs.Scene();
    return scene;
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

  /*
    This function creates helpers.
    It will be removed at a later time.
  */
  function initHelpers(){
    var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add(new THREE.AxesHelper( 100 ));
    scene.add( spotLightHelper );
    var sphereSize = 20;
    var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );
    var pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
    scene.add( pointLightHelper2 );
    var pointLightHelper3 = new THREE.PointLightHelper( pointLight3, sphereSize );
    scene.add( pointLightHelper3 );
    var pointLightHelper4 = new THREE.PointLightHelper( pointLight4, sphereSize );
    scene.add( pointLightHelper4 );
    //scene.add(gridHelper);
  }
