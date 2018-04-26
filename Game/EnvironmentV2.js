/*
  * This is the main file for initiating the scene
  * as wells as any other features such as controls, cameras and the renderer.
  * It includes the init and render(animate) function.
  * Helpers will also be inluded here.
  * All files called in this file must be called first in GameV2.html.

  Nadia Kubatin
*/

  // variables
  var renderer = new THREE.WebGLRenderer();
  var scene;
  // animation
  var clock = new THREE.Clock();
  var delta;
  // helpers (will be removed at a later time)
  var gridSize = 800;
  var gridDivisions = 100;
  var gridHelper = new THREE.GridHelper( gridSize, gridDivisions );




  // Calls to main methods
  // Might separate render() into render() and animate()
  init();
  initControls();
  render();




    /*
      The main init function that creates everything used in GameV2.
    */
    function init(){

      initPhysijs();
      scene = initScene();
      initMain();
      createStart();
      createGameOver();
      createPause();
      createEnd();
      initGameMusic();
      initRenderer();

    }

    /*
      We initialize everything in the main scene
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
        createCylinderPass();
        createLinearPass();
        // Room3V2.js
        initThirdFloor();
        initThirdWall();
        initRoomPass2();
        initPlatforms();
        initRoomPass1();
        initCrystals();
        // Room4V2.js
        initBossFloor();
        initBossWall();
        initExit();
        initBoss();
        // Map.js
        initIcicles();
        initParticles();
        // Light.js
        initLight();
        initShadows();
        // Character.js
        initAvatar();
        initSphere(); // - temporary character model
        initPosTest(); // will be removed later
        // SoundV2.js
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

        switchGameState();

      // render using requestAnimationFrame
        requestAnimationFrame(render);
    }

    /*
      Creates the scene
    */
    function initScene(){
      var scene = new Physijs.Scene();
      scene.setGravity(0,-30,0);
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
      var pointLightHelper5 = new THREE.PointLightHelper( pointLight5, sphereSize );
      scene.add( pointLightHelper5 );
      //scene.add(gridHelper);
    }
