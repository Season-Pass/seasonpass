/*
  * This file will contain map objects such as
  * icicles, particles, and other small objects.
  * Will add snow piles.

  Nadia Kubatin
*/




  // particle system
  var snow;
  // map objects
  // to be added later (snow piles)




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
      //var stalactite = new THREE.Mesh( geometryco, materialco );
      var stalactite = new Physijs.ConeMesh( geometryco, pmaterialco,0 );
      stalactite.position.set(x,y,z);
      stalactite.rotation.x = THREE.Math.degToRad( rotation );
      stalactite.castShadow = true;
      return stalactite;
    }
