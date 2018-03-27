/*
  * This file will contain functions for room two.
  * It contains a room to test movement of the character model.

  Nadia Kubatin
*/




  var floor;
  var wall;
  var column;
  var platform;




  /*

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
    //wall.rotation.x = THREE.Math.degToRad( 180 );
    wall.rotation.y = THREE.Math.degToRad( -23 );
    wall.position.y = -40;
    wall.position.x = 0;
    wall.position.z = -395;
    wall.receiveShadow = true;
    wall.castShadow = false;
    scene.add(wall);
  }

  function initFloors(){
    createBox(0, -94.5, -223);
  }

  function createBox(x,y,z){
    var length = 30, width = 15;

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
    var material = new THREE.MeshPhongMaterial( { color: 0x66b3ff } );
    var mesh = new THREE.Mesh( geometry, material, 0 ) ;
    mesh.rotation.x = THREE.Math.degToRad( 90 );
    mesh.position.set(x, y, z);
    mesh.scale.z = 3;
    scene.add(mesh);
  }

  function createCylinderPass(){

  }

  function createLinearPass(){

  }
