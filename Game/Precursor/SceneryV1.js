/*
  * This program generates the scenary for the game
  * such as rooms and objects in these rooms.
  - will possibly change to contain only one room.
  > other rooms will be located in other files
  - will add new cameras
  - might move renderer and camera
  - need to add object for cave wall

  Nadia Kubatin
*/

  // variables
  var renderer = new THREE.WebGLRenderer();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    0.1, 1000
                  );
  var orbitControls = new THREE.OrbitControls(camera); // will be removed
  var clock = new THREE.Clock();
  var delta;
  // light
  var ambiLight, spotLight, light, pointLight, hemilight;
  // shapes
  var sphere;
  var stalactite;
  var lathe, circle, plane, cylinder;
  // particle system
  var points2, particleGeometry, particles;
  // helpers (will be removed at a later time)
  var gridSize = 1000;
  var gridDivisions = 100;
  var gridHelper = new THREE.GridHelper( gridSize, gridDivisions );


  init();
  render();

  /*
    we initialize everything in the scene
    and add it to the scene
    * might include snow objects
  */
  function init() {

      initRenderer();
      initCamera();
      initCaveFloor();
      initCaveWall();
      initPassageFloor();
      //initPassageWall();
      initIcicles();
      //initSphere();
      initLight();
      initShadows();
      initParticles();

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
    * might move camera and renderer to separate file
  */
  function render() {
    // controls and settings for the camera
      delta = clock.getDelta();
      orbitControls.update(delta); // will be removed at a later time
      camera.lookAt(new THREE.Vector3(0,30,-80));
      animateParticles();
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
    creates a camera and sets its position
    also tells it where to look and sets
    other settings such as speed
    and sets autoRotate to false or true.
    * need to add second camera to follow character
    * might move to new file
  */
  function initCamera(){
    camera.position.x = 250;
    camera.position.y = 50;
    camera.position.z = -50;
  }

  /*
    creates particles using points and sprites.
    currently set to look like snow but might
    change parameter later.
  */
  function initParticles(){
    particleGeometry = new THREE.Geometry();
    for ( var i = 0; i < 1000; i ++ ) {
    	points2 = new THREE.Vector3();
    	points2.x = Math.random() * 200 - 100;
    	points2.y = Math.abs(Math.random() * 200 - 100);
    	points2.z = Math.random() * 200 - 100;
    	particleGeometry.vertices.push( points2 );
    }
    particleGeometry.verticesNeedUpdate = true;
    var sprite = new THREE.TextureLoader().load( 'libs/spriteMap.png' );
    var particleMaterial = new THREE.PointsMaterial( {
                            color: 0xffffff,
                            size: 1,
                            map: sprite,
                            blending: THREE.AdditiveBlending,
                            depthTest: false,
                            transparent : true,
                            opacity: .5
                          } );
    particles = new THREE.Points( particleGeometry, particleMaterial );
    particles.recieveShadow = true;
    scene.add( particles );
  }

  /*
    animates each particle and makes
    it move randomly.
    Might change parameters later
  */
  function animateParticles() {
  	var verts = particles.geometry.vertices;
  	for(var i = 0; i < verts.length; i++) {
  		var vert = verts[i];
  		if (vert.y < -200) {
  			vert.y = Math.random() * 400 - 200;
  		}
  		vert.y = vert.y - (10 * delta);
  	}
  	particles.rotation.y -= .1 * delta;
  }

  /*
    creates a geometry and texture for a sphere.
    It also sets the position of the sphere.
    * This sphere is a temporary placement for
    * a future character model.
  */
  function initSphere(){
    var geometrysp = new THREE.SphereGeometry(3, 40, 40);
    var materialsp = new THREE.MeshLambertMaterial( { color: 0xff0000} );
    sphere = new THREE.Mesh( geometrysp, materialsp );
    sphere.castShadow = true;
    scene.add(sphere);
  }

  /*
    creates a geometry and texture for
    a lathe which acts as the cave wall.
    It imports a texture, bump map, and normal map to form a material.
    It also sets the position of the plane and makes it recieve shadows.
    This is an ice cave wall, while the geometry forms
    half the lathe, rotates it and positions it for inside viewing.
  */
  function initCaveWall(){
    var points = [];
    for ( var i = 0; i < 9; i ++ ) {
      // Math.sin(i * a) * b + c, (i - d) * e
      // i<9 can be modified to change the total height
      // a: curve, b: bottom width, c: total width, d: size, e: stretch
       points.push( new THREE.Vector2(
                    Math.sin( i * 0.17 ) * 95 + 5, ( i - 4.6 ) * 13
       ));
     }
     var geometryLa = new THREE.LatheGeometry( points, 50, 0, 1.05*Math.PI );
     var textureLa = new THREE.TextureLoader().load('libs/ice-cave-c2.png');
     var normalTextureLa = new THREE.TextureLoader().load('libs/ice-cave-2c.png');
     var bumpTextureLa = new THREE.TextureLoader().load('libs/ice-cave-3-b.png');
     var materialLa = new THREE.MeshPhongMaterial( {
                        color: 0xcce6ff,
                        map:textureLa,
                        bumpMap: bumpTextureLa,
                        normalMap: normalTextureLa,
                        shininess: 100,
                        reflectivity: .5,
                        side:THREE.DoubleSide
                      } );
    lathe = new THREE.Mesh( geometryLa, materialLa );
    lathe.rotation.x = THREE.Math.degToRad( 180 );
    lathe.rotation.y = THREE.Math.degToRad( 170 );
    lathe.position.y = 43;
    lathe.receiveShadow = true;
    lathe.castShadow = false;
    scene.add(lathe);
  }

  /*
    creates a geometry and texture for
    a circle and combines them to form the object.
    It imports a texture and bump map to form a material.
    This is the floor of the ice cave.
    * will change shadow and color options to include
    - more realistic shadow interactions
    * might include normal map at later time
  */
  function initCaveFloor(){
    var geometryCi = new THREE.CircleGeometry( 98, 32 );
    var normalTextureCi = new THREE.TextureLoader().load('libs/ice-floor-b.png');
    var bumpTextureCi = new THREE.TextureLoader().load('libs/ice-floor-3.png');
    var materialCi = new THREE.MeshPhongMaterial( {
                        color: 0x66b3ff,
                        //specular: 0x66b3ff,
                        //emissive: 0x0b2441,
                        emissive: 0x000000,
                        emissiveIntensity: 10,
                        bumpMap: bumpTextureCi,
                        //normalMap: normalTextureCi,
                        //normalScale: THREE.Vector2(.5,.5),
                        shininess: 100,
                        reflectivity: .5,
                        side:THREE.DoubleSide
                      } );
    circle = new THREE.Mesh( geometryCi, materialCi );
    circle.rotation.x = THREE.Math.degToRad( 90 );
    circle.receiveShadow = true;
    scene.add(circle);
  }

  /*
    creates the wall of a passage out of the room
    * will be changed at a later time
    * might be changed to a plane or blender object
  */
  function initPassageWall(){
    var geometryPW = new THREE.CylinderGeometry( 25, 25, 80, 32, 1, true, 2.9, 3 );
    var texturePW = new THREE.TextureLoader().load('libs/ice-cave-d.png');
    var normalTexturePW = new THREE.TextureLoader().load('libs/ice-cave-d2.png');
    var bumpTexturePW = new THREE.TextureLoader().load('libs/ice-cave-3-d.png');
    var materialPW = new THREE.MeshPhongMaterial( {
                       color: 0xcce6ff,
                       map:texturePW,
                       bumpMap: bumpTexturePW,
                       normalMap: normalTexturePW,
                       shininess: 100,
                       reflectivity: .5,
                       side:THREE.DoubleSide
                     } );
    cylinder = new THREE.Mesh( geometryPW, materialPW );
    cylinder.position.z=-130;
    cylinder.position.x=20;
    cylinder.position.y=23;
    cylinder.rotation.x = THREE.Math.degToRad( 90 );
    cylinder.castShadow = false;
    scene.add(cylinder);
  }

  /*
    creates the floor of the passage out of the cave
    and uses the same textures as the cave wall.
    * will play with parameters to find better fit.
    * might be changed to blender object or other shape.
  */
  function initPassageFloor(){
    var geometryPF = new THREE.PlaneBufferGeometry( 80, 80, 199, 199 );
    var bumpTexturePF = new THREE.TextureLoader().load('libs/ice-floor-3.png');
    var normalTexturePF = new THREE.TextureLoader().load('libs/ice-floor-b.png');
    var materialPF = new THREE.MeshPhongMaterial( {
                      color: 0x66b3ff,
                      //specular: 0x66b3ff,
                      //emissive: 0x0b2441,
                      emissive: 0x000000,
                      emissiveIntensity: 10,
                      bumpMap: bumpTexturePF,
                      //normalMap: normalTextureCi,
                      //normalScale: THREE.Vector2(.5,.5),
                      shininess: 100,
                      reflectivity: .5,
                      side:THREE.DoubleSide
                     } );
    plane = new THREE.Mesh( geometryPF, materialPF );
    plane.rotation.x = THREE.Math.degToRad( 90 );
    plane.position.y = 0;
    plane.position.z = -130;
    plane.receiveShadow = true;
    scene.add(plane);
  }

  /*
    creates the icicles in the room.
    parameters (x,y,z,radius,height,segments, rotation)
    icicles are in order from left to right.
  */
  function initIcicles(){
    // outer ring bottom
    createIcicle(0, 9, 90, 2, 18, 0);
    createIcicle(-24, 5, 72, 2, 10, 0);
    createIcicle(-25, 13, 70, 2, 26, 0);
    createIcicle(-27, 8, 68.5, 2, 16, 0);
    createIcicle(-63, 15, 55, 3, 30, 0);
    createIcicle(-70, 9, 35, 2, 18, 0);
    createIcicle(-80, 9, 25, 2, 18, 0);
    createIcicle(-82, 5, 23, 2, 10, 0);
    createIcicle(-72, 20, -5, 3.5, 40, 0);
    createIcicle(-70, 7, -25, 2, 14, 0);
    createIcicle(-50, 11, -65, 2, 21, 0);
    createIcicle(-50, 4, -70, 2, 8, 0);
    createIcicle(-27, 17, -75, 2, 34, 0);
    // inner ring bottom
    createIcicle(0, 5, 25, 2, 10, 0);
    createIcicle(-5, 2.5, -22, 2, 5, 0);
    createIcicle(-23, 6, -5, 2, 12, 0);
    createIcicle(-15, 2.5, 15, 2, 5, 0);
    createIcicle(-15, 1.5, -15, 1.5, 3, 0);
    // top
    createIcicle(0, 83.2, 25, 2, 10, 180);
    createIcicle(-15, 89, 15, 2, 5, 180);
    createIcicle(-23, 83.3, -5, 2, 12, 180);
    createIcicle(-15, 87.8, -15, 1.5, 6, 180);
    createIcicle(-5, 86.8, -22, 2, 7, 180);
  }

  /*
    creates icicles of varying sizes
    and positions them around the map
    * might play with transparency and refraction or reflection
  */
  function createIcicle(x,y,z,radius, height, rotation){
    var geometryco = new THREE.ConeGeometry( radius, height, 32 );
    var normalTextureIce = new THREE.TextureLoader().load('libs/icicle-normal-2.png');
    var materialco = new THREE.MeshPhongMaterial( {
                        color: 0x66b3ff,
                        transparent: true,
                        opacity: .6,
                        normalMap: normalTextureIce,
                        shininess: 100,
                        reflectivity: .5
                      } );
    stalactite = new THREE.Mesh( geometryco, materialco );
    stalactite.position.set(x,y,z);
    stalactite.rotation.x = THREE.Math.degToRad( rotation );
    stalactite.castShadow = true;
    scene.add(stalactite);
  }

  /*
    Creates four spotlights and an ambient light
    and sets color, intensity and position
    as well as sets shadows and targets for the light.
    * might split into multiple functions per lights
    * will play with light parameters and colors to find better fit
  */
  function initLight(){
    ambiLight = new THREE.AmbientLight(0x111111, 1.5);
    hemilight = new THREE.HemisphereLight( 0xffffff, 0x66c2ff, .07 );
    pointLight = new THREE.PointLight( 0xffffff, 1.2, 250 );
    spotLight = new THREE.SpotLight(0xffffff, .4, 125, .2, 0, 1);
    pointLight.position.set( 0, 15, 0 );
    spotLight.position.set(0,125,0);
    pointLight.castShadow = true;
    spotLight.castShadow = true;
    scene.add(ambiLight);
    scene.add(hemilight);
    scene.add(pointLight);
    scene.add(spotLight);
  }

  /*
    sets shadows and their settings for
    two lights, spotLight and light.
    * will include conditioned shadows
    * will add settings
  */
  function initShadows(){
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 0.1;
    spotLight.shadow.camera.far = 700;
  }
