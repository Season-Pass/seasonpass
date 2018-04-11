/*
  * This program generates one room for the game.
  > other rooms will be located in other files
  * feel free to play with the parameters and options in the functions

  Nadia Kubatin
*/




  // environment
  var caveWall, caveFloor, passageFloor, cylinder;
  var loader1, loader2;
  var passageWall, passageWall2;




    /*
      Creates a geometry and texture for
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
       var textureLa = new THREE.TextureLoader().load('libs/Images/ice-cave-c2.png');
       var normalTextureLa = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
       var bumpTextureLa = new THREE.TextureLoader().load('libs/Images/ice-cave-3-b.png');
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
      caveWall = new Physijs.ConcaveMesh( geometryLa, pmaterialLa,0 );
      caveWall.rotation.x = THREE.Math.degToRad( 180 );
      caveWall.rotation.y = THREE.Math.degToRad( 170 );
      caveWall.position.y = 43;
      caveWall.receiveShadow = true;
      caveWall.castShadow = false;
      scene.add(caveWall);
    }

    /*
      Creates a geometry and texture for
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
      var normalTextureCi = new THREE.TextureLoader().load('libs/Images/ice-floor-b.png');
      var bumpTextureCi = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
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
      var pmaterialCi = new Physijs.createMaterial(materialCi, 1, 0);
      caveFloor = new Physijs.BoxMesh( geometryCi, pmaterialCi,0 );
      caveFloor.rotation.x = THREE.Math.degToRad( 90 );
      caveFloor.receiveShadow = true;
      scene.add(caveFloor);
    }

    /*
      First attempt at loading in a blender object.
      Will work on it a bit more at another time.
      Physics cannot be added to object therefore
      a series of small box meshes have been used
      instead.
    */
    function initPassageWall1(){
      loader1 = new THREE.JSONLoader();
		  loader1.load('libs/PassageWall3.json',
					function ( geometry, materials ) {
						var material = new THREE.MeshPhongMaterial( {
                            color: 0x66b3ff,
                            side:THREE.DoubleSide
                          } );
            var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
						passageWall1 = new Physijs.SphereMesh( geometry, pmaterial,0);
						passageWall1.scale.y=50;
						passageWall1.scale.x=50;
						passageWall1.scale.z=70;
						passageWall1.position.z = -145;
						passageWall1.position.y = 69.5;
            passageWall1.position.x = -50;
            passageWall1.rotation.z = THREE.Math.degToRad( 270 );
            passageWall1.rotation.x = THREE.Math.degToRad( 90 );
						passageWall1.castShadow = false;
            scene.add( passageWall1  );
            passageWall = passageWall1;
					},
					function(xhr){
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
					function(err){console.log("error in loading: "+err);}
				);
    }
