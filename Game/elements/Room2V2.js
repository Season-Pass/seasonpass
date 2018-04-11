/*
  * This file will contain functions for room two.
  * It contains a room to test movement of the character model.

  Nadia Kubatin
*/




  // Variables
  var floor;
  var wall;
  var column;
  var passWall;




    /*
      Creates the background of the room.
    */
    function initWall(){
       var geometryWa = new THREE.CylinderGeometry( 200, 200, 300, 64, 64, true, 0, -2.4);
       var textureWa = new THREE.TextureLoader().load('libs/Images/wall1.png');
       //var normalTextureLa = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
       var bumpTextureWa = new THREE.TextureLoader().load('libs/Images/wall1-b.png');
       var materialWa = new THREE.MeshPhongMaterial( {
                          color: 0xe6f2ff,
                          map:textureWa,
                          specular: 0xe6f2ff,
                          emissive: 0x0d1e26, //0b2441
                          bumpMap: bumpTextureWa,
                          //normalMap: normalTextureWa,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                        } );
      var pmaterialWa = new Physijs.createMaterial(materialWa,0.9,0.5);
      wall = new Physijs.ConcaveMesh( geometryWa, pmaterialWa,0 );
      wall.rotation.y = THREE.Math.degToRad( -23 );
      wall.position.y = -47;
      wall.position.x = 5;
      wall.position.z = -393;
      wall.receiveShadow = true;
      wall.castShadow = false;
      scene.add(wall);
    }

    /*
      Creates the column for the character to jump on.
    */
    function initFloors(){
      createBox(50,100,-72, -94.5, -250);
      createBox(35,50,-25, -94.5, -325);
      createBox(35,50,-25, -94.5, -400);
      createBox(35,50,-25, -94.5, -475);
      createBox(35,50,-25, -94.5, -550);
    }

    /*
      Creates a bevel geometry to create a box with
      smooth edges for use in creating columns.
    */
    function createBox(w,l,x,y,z){
      var length = l, width = w;

      var shape = new THREE.Shape();
      shape.moveTo( 0,0 );
      shape.lineTo( 0, width );
      shape.lineTo( length, width );
      shape.lineTo( length, 0 );
      shape.lineTo( 0, 0 );

      var extrudeSettings = {
      	steps: 10,
      	amount: 20,
      	bevelEnabled: true,
      	bevelThickness: 5,
      	bevelSize: 3,
      	bevelSegments: 5
      };

      var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
      var bumpTexture = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
      var material = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTexture,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                        } );
      var mesh = new THREE.Mesh( geometry, material, 0 ) ;
      mesh.rotation.x = THREE.Math.degToRad( 90 );
      mesh.position.set(x, y, z);
      mesh.scale.z = 3;
      scene.add(mesh);
    }

    /*

    */
    function createCylinderPass(){
      var geometryWa = new THREE.CylinderGeometry( 30, 30, 70, 64, 64, true, 0, -2.4);
      var textureWa = new THREE.TextureLoader().load('libs/Images/ice-cave-c2.png');
      var normalTextureWa = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
      var bumpTextureWa = new THREE.TextureLoader().load('libs/Images/ice-cave-3-b.png');
      var materialWa = new THREE.MeshPhongMaterial( {
                         color: 0xe6f2ff,
                         map:textureWa,
                         specular: 0xe6f2ff,
                         emissive: 0x0d1e26, //0b2441
                         bumpMap: bumpTextureWa,
                         //normalMap: normalTextureWa,
                         shininess: 100,
                         reflectivity: .5,
                         side:THREE.DoubleSide
                       } );
     var pmaterialWa = new Physijs.createMaterial(materialWa,0.9,0.5);
     passWall = new THREE.Mesh( geometryWa, materialWa );
     passWall.rotation.y = THREE.Math.degToRad( -23 );
     passWall.rotation.x = THREE.Math.degToRad( 90 );
     passWall.position.y = -52;
     passWall.position.x = -5;
     passWall.position.z = -580;
     passWall.receiveShadow = true;
     passWall.castShadow = false;
     scene.add(passWall);
    }

    /*

    */
    function createLinearPass(){
      var geometryPF = new THREE.PlaneBufferGeometry( 50, 100, 199, 199 );
      var normalTexturePF = new THREE.TextureLoader().load('libs/Images/ice-floor-b.png');
      var bumpTexturePF = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
      var materialPF = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTexturePF,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                       } );
      var pmaterialPF = new Physijs.createMaterial(materialPF,0,0.5);
      passFoo = new Physijs.BoxMesh( geometryPF, materialPF,0 );
      //passFoo.rotation.y = THREE.Math.degToRad( 90 );
      passFoo.rotation.x = THREE.Math.degToRad( 90 );
      passFoo.position.y = -79.5;
      passFoo.position.x = 0;
      passFoo.position.z = -565;
      scene.add(passFoo);
    }
