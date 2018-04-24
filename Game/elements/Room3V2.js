/*
  * This file will contain the third room in the game.
  * This room will contain a very simple puzzle.

  Nadia Kubatin
*/



  var thirdFloor, platform, thirdWall, roomPass1, roomPass2;




    /*

    */
    function initThirdFloor(){
      var geometryC = new THREE.CircleGeometry( 98, 32 );
      var normalTextureC = new THREE.TextureLoader().load('libs/Images/ice-floor-b.png');
      var bumpTextureC = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
      var materialC = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          //specular: 0x66b3ff,
                          //emissive: 0x0b2441,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTextureC,
                          //normalMap: normalTextureCi,
                          //normalScale: THREE.Vector2(.5,.5),
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                        } );
      var pmaterialC = new Physijs.createMaterial(materialC, 1, 0);
      thirdFloor = new Physijs.BoxMesh( geometryC, pmaterialC,0 );
      thirdFloor.rotation.x = THREE.Math.degToRad( 90 );
      thirdFloor.receiveShadow = true;
      thirdFloor.position.y = -80;
      thirdFloor.position.x = -5;
      thirdFloor.position.z = -710;
      scene.add(thirdFloor);
    }

    /*

    */
    function initThirdWall(){
      var geometryWa3 = new THREE.CylinderGeometry( 97, 97, 200, 64, 64, true, 0, -3);
      var textureWa3 = new THREE.TextureLoader().load('libs/Images/ice-cave-c2.png');
      var normalTextureWa3 = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
      var bumpTextureWa3 = new THREE.TextureLoader().load('libs/Images/ice-cave-3-b.png');
      var materialWa3 = new THREE.MeshPhongMaterial( {
                         color: 0xe6f2ff,
                         map:textureWa3,
                         specular: 0xe6f2ff,
                         emissive: 0x0d1e26,
                         bumpMap: bumpTextureWa3,
                         //normalMap: normalTextureWa3,
                         shininess: 100,
                         reflectivity: .5,
                         side:THREE.DoubleSide
                       } );
     var pmaterialWa3 = new Physijs.createMaterial(materialWa3,0.9,0.5);
     //thirdWall = new THREE.Mesh( geometryWa3, materialWa3 );
     thirdWall = new Physijs.ConcaveMesh( geometryWa3, pmaterialWa3,0 );
     thirdWall.rotation.y = THREE.Math.degToRad( -18 );
     //passWall.rotation.x = THREE.Math.degToRad( 90 );
     thirdWall.position.y = 19.5;
     thirdWall.position.x = -5;
     thirdWall.position.z = -710;
     thirdWall.receiveShadow = true;
     thirdWall.castShadow = false;
     scene.add(thirdWall);
    }

    /*

    */
    function initRoomPass1(){

    }

    /*

    */
    function initRoomPass2(){
      var geometryPF2 = new THREE.PlaneBufferGeometry( 50, 100, 199, 199 );
      var normalTexturePF2 = new THREE.TextureLoader().load('libs/Images/ice-floor-b.png');
      var bumpTexturePF2 = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
      var materialPF2 = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTexturePF2,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                       } );
      var pmaterialPF2 = new Physijs.createMaterial(materialPF2,0,0.5);
      roomPass2 = new Physijs.BoxMesh( geometryPF2, materialPF2,0 );
      roomPass2.rotation.x = THREE.Math.degToRad( 90 );
      roomPass2.position.y = 80;
      roomPass2.position.x = 0;
      roomPass2.position.z = -855;
      scene.add(roomPass2);
    }

    /*

    */
    function initPlatforms(){

    }

    /*

    */
    function initCone(){
      var geometryCo = new THREE.CylinderGeometry( 5, 5, 5, 64, 64);
      var materialCo = new THREE.MeshPhongMaterial( {
                         color: 0xe6f2ff,
                         specular: 0xe6f2ff,
                         emissive: 0x0d1e26,
                         shininess: 100,
                         reflectivity: .5,
                         side:THREE.DoubleSide
                       } );
     var pmaterialCo = new Physijs.createMaterial(materialCo,0.9,0.5);
     //cone = new THREE.Mesh( geometryCo, materialCo );
     var cone = new Physijs.CylinderMesh( geometryCo, pmaterialCo,0 );
     cone.position.y = 19.5;
     cone.position.x = -5;
     cone.position.z = -710;
     cone.receiveShadow = true;
     cone.castShadow = true;
     return cone;
    }
