/*
  * This program generates the scenary for the game
  * such as rooms and objects in these rooms.
  - will possibly change to contain only one room.
  > other rooms will be located in other files
  - need to add object for cave wall
  - might add snow objects
  - function particles should be changed to encompass whole map
  > might be moved to seperate folder with lights and shadows
  -  file may be changed to include only whole map effects such as lighting
  - shadows, and particles.
  * feel free to play with the parameters and options in the functions
  - Move objects such as stalactites to other folder?
  - might replace global variables later

  Nadia Kubatin
*/

  // global variables
  // light
  var ambiLight, spotLight, light, pointLight, hemilight;
  // environment
  var caveWall, caveFloor, passageFloor, cylinder;
  var boundry;
  // particle system
  var snow;


    /*
      creates particles using points and sprites.
      currently set to look like snow but might
      change parameter and material later.
    */
    function initParticles(){
      var particleGeometry = new THREE.Geometry();
      var points2;
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
                              size: 2,
                              map: sprite,
                              blending: THREE.AdditiveBlending,
                              depthTest: false,
                              transparent : true,
                              opacity: .5
                            } );
      snow = new THREE.Points( particleGeometry, particleMaterial );
      snow.recieveShadow = true;
      scene.add(snow);
    }

    /*
      animates each particle and makes
      it move randomly.
      Might change parameters later
    */
    function animateParticles() {
    	var verts = snow.geometry.vertices;
    	for(var i = 0; i < verts.length; i++) {
    		var vert = verts[i];
    		if (vert.y < -200) {
    			vert.y = Math.random() * 400 - 200;
    		}
    		vert.y = vert.y - (10 * delta);
    	}
    	snow.rotation.y -= .1 * delta;
    }

    /*
      creates a geometry and texture for
      a lathe which acts as the cave wall.
      It imports a texture, bump map, and normal map to form a material.
      It also sets the position of the plane and makes it recieve shadows.
      This is an ice cave wall, while the geometry forms
      half the lathe, rotates it and positions it for inside viewing.
      Physics has been added to allow collisions.
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
       var geometryLa = new THREE.LatheGeometry( points, 50, 0, 1.03*Math.PI );
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
      var pmaterialLa = new Physijs.createMaterial(materialLa,0.9,0.5);
      //caveWall = new THREE.Mesh( geometryLa, materialLa );
      caveWall = new Physijs.ConcaveMesh( geometryLa, pmaterialLa,0 );
      caveWall.rotation.x = THREE.Math.degToRad( 180 );
      caveWall.rotation.y = THREE.Math.degToRad( 170 );
      caveWall.position.y = 43;
      caveWall.receiveShadow = true;
      caveWall.castShadow = false;
      scene.add(caveWall);
    }

    /*
      Binds the character to a single arrea within the cave to prevent
      it from falling out of the scene.
      * will be moved later to a seperate file.
    */
    function initBoundry(){
      var points = [];
      for ( var i = 0; i < 9; i ++ ) {
         points.push( new THREE.Vector2(
                      Math.sin( i * 0.17 ) * 95 + 5, ( i - 4.6 ) * 13
         ));
       }
       var geometryBo = new THREE.LatheGeometry( points, 50, 0, 1.05*Math.PI );
       var materialBo = new THREE.MeshPhongMaterial( {
                          color: 0xcce6ff,
                          transparent: true,
                          opacity: 0,
                          side:THREE.DoubleSide
                        } );
      var pmaterialBo = new Physijs.createMaterial(materialBo,0.9,0.5);
      boundry = new Physijs.ConcaveMesh( geometryBo, pmaterialBo,0 );
      boundry.rotation.x = THREE.Math.degToRad( 180 );
      boundry.rotation.y = THREE.Math.degToRad( 10 );
      boundry.position.y = 43;
      scene.add(boundry);

      var block1 = initPlane();
      block1.rotation.y = THREE.Math.degToRad( -20 );
      block1.position.set(32, 15, -91);
      scene.add(block1);

      var block2 = initPlane();
      block2.rotation.y = THREE.Math.degToRad( -30 );
      block2.position.set(50, 15, -83);
      scene.add(block2);
    }

    /*
      creates the floor of the passage out of the cave
      and uses the same textures as the cave wall.
      * will play with parameters to find better fit.
      * might be changed to blender object or other shape.
      * Physics have not been added.
    */
    function initPlane(){
      var geometryPF = new THREE.PlaneBufferGeometry( 20, 40, 199, 199 );
      var materialPF = new THREE.MeshPhongMaterial( {
                        color: 0x66b3ff,
                        transparent: true,
                        opacity: 0,
                        side:THREE.DoubleSide
                       } );
      var pmaterialPF = new Physijs.createMaterial(materialPF,0.9,0.5);
      plane = new Physijs.BoxMesh( geometryPF, materialPF,0 );
      return plane;
    }

    /*
      creates a geometry and texture for
      a circle and combines them to form the object.
      It imports a texture and bump map to form a material.
      This is the floor of the ice cave.
      Physics has been added to the floor.
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
      var pmaterialCi = new Physijs.createMaterial(materialCi,0.9,0.5);
      //caveFloor = new THREE.Mesh( geometryCi, materialCi );
      caveFloor = new Physijs.BoxMesh( geometryCi, pmaterialCi,0 );
      caveFloor.rotation.x = THREE.Math.degToRad( 90 );
      caveFloor.receiveShadow = true;
      scene.add(caveFloor);
    }

    function initPassageWall2(){
      var loader = new THREE.JSONLoader();
		  loader.load('libs/PassageWall3.json',
					function ( geometry, materials ) {
						var material = new THREE.MeshPhongMaterial( {
                            color: 0x00ff00,
                            side:THREE.DoubleSide
                          } );
            var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
						var passageWall = new Physijs.SphereMesh( geometry, pmaterial,0);
						//console.log(JSON.stringify(suzanne.scale));// = new THREE.Vector3(4.0,1.0,1.0);
						//var s = 0.5;
						passageWall.scale.y=50;
						passageWall.scale.x=50;
						passageWall.scale.z=70;
						passageWall.position.z = -145;
						passageWall.position.y = 69.5;
            passageWall.position.x = -50;
            passageWall.rotation.z = THREE.Math.degToRad( 270 );
            passageWall.rotation.x = THREE.Math.degToRad( 90 );
						//passageWall.position.x = -5;
						passageWall.castShadow = false;
            //scene.add( passageWall  );
					},
					function(xhr){
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
					function(err){console.log("error in loading: "+err);}
				);
    }

    function initPassageWall1(){
      var loader = new THREE.JSONLoader();
		  loader.load('libs/PassageWallHalf2b.json',
					function ( geometry, materials ) {
						var material = new THREE.MeshPhongMaterial( {
                            color: 0x00ff00,
                            side:THREE.DoubleSide
                          } );
            var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
            //var passageWall = new THREE.Mesh( geometry, material );
						var passageWall = new Physijs.ConcaveMesh( geometry, pmaterial,0);
            passageWall.setDamping(0.1,0.1);
						console.log(JSON.stringify(passageWall.scale));// = new THREE.Vector3(4.0,1.0,1.0);

						passageWall.scale.y=50;
						passageWall.scale.x=50;
						passageWall.scale.z=70;
						passageWall.position.z = -100;
						passageWall.position.y = 89.5; //69.5
            passageWall.position.x = -50;
            passageWall.rotation.z = THREE.Math.degToRad( 270 );
            passageWall.rotation.x = THREE.Math.degToRad( 90 );
						//passageWall.position.x = -5;
						passageWall.castShadow = true;
            scene.add( passageWall  );
					},
					function(xhr){
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
					function(err){console.log("error in loading: "+err);}
				);
    }

    /*
      creates the icicles in the room.
      parameters (x,y,z,radius,height,segments, rotation)
      icicles are in order from left to right.
      Is no longer a group object.
    */
    function initIcicles(){
      // outer ring bottom
      scene.add(createIcicle(0, 9, 90, 2, 18, 0));
      scene.add(createIcicle(-24, 5, 72, 2, 10, 0));
      scene.add(createIcicle(-25, 13, 70, 2, 26, 0));
      scene.add(createIcicle(-27, 8, 68.5, 2, 16, 0));
      scene.add(createIcicle(-63, 15, 55, 3, 30, 0));
      scene.add(createIcicle(-70, 9, 35, 2, 18, 0));
      scene.add(createIcicle(-80, 9, 25, 2, 18, 0));
      scene.add(createIcicle(-82, 5, 23, 2, 10, 0));
      scene.add(createIcicle(-72, 20, -5, 3.5, 40, 0));
      scene.add(createIcicle(-70, 7, -25, 2, 14, 0));
      scene.add(createIcicle(-50, 11, -65, 2, 21, 0));
      scene.add(createIcicle(-50, 4, -70, 2, 8, 0));
      scene.add(createIcicle(-27, 17, -75, 2, 34, 0));
      // inner ring bottom
      scene.add(createIcicle(0, 5, 25, 2, 10, 0));
      scene.add(createIcicle(-5, 2.5, -22, 2, 5, 0));
      scene.add(createIcicle(-23, 6, -5, 2, 12, 0));
      scene.add(createIcicle(-15, 2.5, 15, 2, 5, 0));
      scene.add(createIcicle(-15, 1.5, -15, 1.5, 3, 0));
      // top
      scene.add(createIcicle(0, 83.2, 25, 2, 10, 180));
      scene.add(createIcicle(-15, 89, 15, 2, 5, 180));
      scene.add(createIcicle(-23, 83.3, -5, 2, 12, 180));
      scene.add(createIcicle(-15, 87.8, -15, 1.5, 6, 180));
      scene.add(createIcicle(-5, 86.8, -22, 2, 7, 180));
    }

    /*
      creates icicles of varying sizes
      to be used in the function initIcicles
      * might play with transparency and refraction or reflection
    */
    function createIcicle(x,y,z,radius, height, rotation){
      var geometryco = new THREE.ConeGeometry( radius, height, 32 );
      var normalTextureIce = new THREE.TextureLoader().load('libs/icicle-normal-2.png');
      var materialco = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          transparent: true,
                          opacity: .4,
                          normalMap: normalTextureIce,
                          shininess: 100,
                          reflectivity: .5
                        } );
      var pmaterialco = new Physijs.createMaterial(materialco,0.9,0.5);
      //var stalactite = new THREE.Mesh( geometryco, materialco );
      var stalactite = new Physijs.ConeMesh( geometryco, pmaterialco,0 );
      stalactite.position.set(x,y,z);
      stalactite.rotation.x = THREE.Math.degToRad( rotation );
      stalactite.castShadow = true;
      return stalactite;
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
      * currently being editied
    */
    function initShadows(){
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      spotLight.shadow.camera.near = 0.1;
      spotLight.shadow.camera.far = 700;
    }
