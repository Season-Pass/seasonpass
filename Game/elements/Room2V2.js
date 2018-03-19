/*
  * This file will contain functions for room two.
  * It has yet to be designed.
  * Will be added to GameV2.html once some functions
  * can be or are called in EnvironmentV2.
*/

  var floor;
  var wall, wall2;
  var column;
  var platform;

  function initWall(){
    var geometryWa = new THREE.PlaneBufferGeometry( 100, 100, 199, 199 );
    var materialWa = new THREE.MeshPhongMaterial( {
                      color: 0x66b3ff,
                      side:THREE.DoubleSide
                     } );
    var pmaterialWa = new Physijs.createMaterial(materialWa,0.9,0.5);
    wall = new Physijs.BoxMesh( geometryWa, materialWa,0 );
    wall.rotation.y = THREE.Math.degToRad( 90 );
    wall.position.set(-30, 0, -200);
    scene.add(wall);
  }

  function initWall2(){
     var geometryWa2 = new THREE.CylinderGeometry( 200, 200, 300, 64, 64, true, 0, -2.4);
     var textureWa2 = new THREE.TextureLoader().load('libs/Images/wall1.png');
     //var normalTextureLa = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
     var bumpTextureLa = new THREE.TextureLoader().load('libs/Images/ice-cave-3-b.png');
     var materialWa2 = new THREE.MeshPhongMaterial( {
                        color: 0xe6f2ff,
                        map:textureWa2,
                        specular: 0xe6f2ff,
                        emissive: 0x0b2441,
                        //bumpMap: bumpTextureLa,
                        //normalMap: normalTextureLa,
                        shininess: 100,
                        reflectivity: .5,
                        side:THREE.DoubleSide
                      } );
    var pmaterialWa2 = new Physijs.createMaterial(materialWa2,0.9,0.5);
    //caveWall = new THREE.Mesh( geometryLa, materialLa );
    wall2 = new Physijs.ConcaveMesh( geometryWa2, pmaterialWa2,0 );
    //wall2.rotation.x = THREE.Math.degToRad( 180 );
    wall2.rotation.y = THREE.Math.degToRad( -23 );
    wall2.position.y = -40;
    wall2.position.x = 0;
    wall2.position.z = -395;
    //wall.position.set(-30, 43, -200);
    wall2.receiveShadow = true;
    wall2.castShadow = false;
    scene.add(wall2);
  }

  function initColumn(){

  }
