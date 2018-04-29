/*
  * This file will contain map objects such as
  * icicles, particles, and other small objects.
  * Will add snow piles.

  Nadia Kubatin
*/




  // particle system
  var snow1, snow2, snow3, snow4;
  // map objects
  // to be added later (snow piles)




    /*
      Creates multiple particle objects
      to place in various rooms.
    */
    function initParticles(){
      var sn11 = new THREE.Vector3(200,200,200);
      var sn12 = new THREE.Vector3(100,100,100);
      snow1 = createParticles(0,0,0,sn11,sn12,1000);
      scene.add(snow1);
      var sn21 = new THREE.Vector3(400,400,400);
      var sn22 = new THREE.Vector3(200,200,200);
      snow2 = createParticles(0,-100,-370,sn21,sn22,2000);
      scene.add(snow2);
      var sn31 = new THREE.Vector3(200,400,200);
      var sn32 = new THREE.Vector3(100,200,100);
      snow3 = createParticles(0,10,-710,sn31,sn32,1000);
      scene.add(snow3);
      var sn41 = new THREE.Vector3(300,300,300);
      var sn42 = new THREE.Vector3(150,150,150);
      snow4 = createParticles(0,200,-960,sn41,sn42,1000);
      scene.add(snow4);
    }

    /*
      Creates particles using points and sprites.
      Currently set to look like snow but might
      change parameter and material later.
    */
    function createParticles(x,y,z,size1,size2,amount){
      var particleGeometry = new THREE.Geometry();
      var points2;
      for ( var i = 0; i < amount; i ++ ) {
        points2 = new THREE.Vector3();
        points2.x = Math.random() * size1.x - size2.x;
        points2.y = Math.abs(Math.random() * size1.y - size2.y);
        points2.z = Math.random() * size1.z - size2.z;
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
      snow.translateX(x);
      snow.translateY(y);
      snow.translateZ(z);
      snow.recieveShadow = true;
      return snow;
    }

    /*
      Animates each particle and makes
      it move randomly.
      Might change parameters later
    */
    function animateParticles(snow) {
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
      Creates the icicles in the room.
      Parameters (x,y,z,radius,height,segments, rotation).
      Icicles are in order from left to right.
    */
    function initIcicles(){
      // outer ring bottom
      scene.add(createIcicle(-1, 9, 90, 2, 18, 0));
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
      scene.add(createIcicle(-1, 5, 25, 2, 10, 0));
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
      // Room 2
      scene.add(createIcicle(-3, -70, -240, 2, 18, 0));
      scene.add(createIcicle(-6, -70, -220, 2, 18, 0));
      scene.add(createIcicle(-8, -70, -235, 2, 18, 0));
      scene.add(createIcicle(-15, -70, -300, 2, 18, 0));
      scene.add(createIcicle(-15, -74, -303, 2, 10, 0));
      scene.add(createIcicle(-18, -70, -370, 2, 18, 0));
      scene.add(createIcicle(-14, -72, -380, 2, 14, 0));
      scene.add(createIcicle(-16, -70, -385, 2, 18, 0));
      scene.add(createIcicle(-17, -70, -450, 2, 18, 0));
      scene.add(createIcicle(-15, -74, -470, 2, 10, 0));
      scene.add(createIcicle(-15, -70, -473, 2, 18, 0));
    }

    /*
      Creates icicles of varying sizes
      to be used in the function initIcicles
      * might play with transparency and refraction or reflection.
      * Need to add icicles to other rooms.
    */
    function createIcicle(x,y,z,radius, height, rotation){
      var geometryco = new THREE.ConeGeometry( radius, height, 32 );
      var normalTextureIce = new THREE.TextureLoader().load('libs/Images/icicle-normal-2.png');
      var materialco = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          transparent: true,
                          opacity: .4,
                          normalMap: normalTextureIce,
                          shininess: 100,
                          reflectivity: .5
                        } );
      var pmaterialco = new Physijs.createMaterial(materialco,0.9,0.5);
      var stalactite = new Physijs.ConeMesh( geometryco, pmaterialco,0 );
      stalactite.position.set(x,y,z);
      stalactite.rotation.x = THREE.Math.degToRad( rotation );
      stalactite.castShadow = true;
      return stalactite;
    }

    /*
      Creates a skybox for use in
      scenes other than the main scene.

      Victor Kubatin
    */
  	function createSkyBox(image,k){
  		// creating a textured plane which receives shadows
  		var geometry = new THREE.BoxGeometry( 40, 80, 20 );
  		var texture = new THREE.TextureLoader().load( image );
  		//texture.wrapS = THREE.RepeatWrapping;
  		//texture.wrapT = THREE.RepeatWrapping;
  		//texture.repeat.set( k, k );
  		var material = new THREE.MeshLambertMaterial( {
  												color: 0xffffff,
  												map: texture ,
  												side:THREE.DoubleSide
  											} );
  		var mesh = new THREE.Mesh( geometry, material, 0 );
  		mesh.receiveShadow = false;
  		return mesh
  	}

    /*
      Creates the skybox for the end scene
       - Victor
    */
  	function createSkyBox2(image,k){
    		// creating a textured plane which receives shadows
    		var geometry = new THREE.BoxGeometry( 40, 70, 30 );
    		var texture = new THREE.TextureLoader().load( image );
    		//texture.wrapS = THREE.RepeatWrapping;
    		//texture.wrapT = THREE.RepeatWrapping;
    		//texture.repeat.set( k, k );
    		var material = new THREE.MeshLambertMaterial( {
    												color: 0xffffff,
    												map: texture ,
    												side:THREE.DoubleSide
    											} );
    		var mesh = new THREE.Mesh( geometry, material, 0 );
    		mesh.receiveShadow = false;
    		return mesh
    	}
