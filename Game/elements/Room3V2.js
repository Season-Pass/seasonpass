/*
  * This file will contain the third room in the game.
  * This room will contain a very simple puzzle.

  Nadia Kubatin
*/



  var thirdFloor, platform, thirdWall, roomPass1, roomPass2, cone;
  var pos;




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
      var geometryWa3 = new THREE.CylinderGeometry( 97, 97, 200, 64, 64, true, 0, -2.63);
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
      var geometryRP = new THREE.PlaneBufferGeometry( 50, 50, 199, 199 );
      var textureRP = new THREE.TextureLoader().load('libs/Images/ice-cave-c2.png');
      var normalTextureRP = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
      var bumpTextureRP = new THREE.TextureLoader().load('libs/Images/ice-cave-3-b.png');
      var materialRP = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          map:textureRP,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTextureRP,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                       } );
      var pmaterialRP = new Physijs.createMaterial(materialRP,0,0.5);
      roomPass1 = new Physijs.BoxMesh( geometryRP, materialRP,0 );
      roomPass1.rotation.y = THREE.Math.degToRad( 90 );
      roomPass1.position.y = 105;
      roomPass1.position.x = -25;
      roomPass1.position.z = -830;
      scene.add(roomPass1);
    }

    /*

    */
    function initRoomPass2(){
      var geometryRP2 = new THREE.PlaneBufferGeometry( 50, 60, 199, 199 );
      var normalTextureRP2 = new THREE.TextureLoader().load('libs/Images/ice-floor-b.png');
      var bumpTextureRP2 = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
      var materialRP2 = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTextureRP2,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                       } );
      var pmaterialRP2 = new Physijs.createMaterial(materialRP2,0,0.5);
      roomPass2 = new Physijs.BoxMesh( geometryRP2, materialRP2,0 );
      roomPass2.rotation.x = THREE.Math.degToRad( 90 );
      roomPass2.position.y = 80;
      roomPass2.position.x = 0;
      roomPass2.position.z = -825;
      scene.add(roomPass2);
    }

    /*

    */
    function initPlatforms(){
      initCone(-40,-75,-625);
      initCone(-50,-68,-632);
      initCone(-60,-61,-639);
      initCone(-69,-54,-646);
      initCone(-77,-47,-654);
      initCone(-84.5,-40,-665);
      initCone(-88,-33,-676);
      initCone(-92,-26,-685);
      initCone(-95,-19,-694);
      initCone(-96,-12,-706);
      initCone(-97,-5,-716);
      initCone(-96,2,-725);
      initCone(-93,9,-738);
      initCone(-90,16,-747);
      initCone(-87,23,-755);
      initCone(-83.5,30,-760);
      initCone(-78,37,-768);
      initCone(-68,44,-777);
      initCone(-59,51,-785);
      initCone(-49,58,-792);
      initCone(-39,65,-799);
      initCone(-28,72,-796);
    }

    /*

    */
    function initCone(x,y,z){
      var geometryCo = new THREE.CylinderGeometry( 10, 5, 6, 64, 64);
      var materialCo = new THREE.MeshPhongMaterial( {
                         color: 0x66b3ff,
                         specular: 0xe6f2ff,
                         emissive: 0x000000,
                         emissiveIntensity: 10,
                         shininess: 100,
                         reflectivity: .5,
                         side:THREE.DoubleSide
                       } );
     var pmaterialCo = new Physijs.createMaterial(materialCo,0.9,0.5);
     //cone = new THREE.Mesh( geometryCo, materialCo );
     cone = new Physijs.CylinderMesh( geometryCo, pmaterialCo,0 );
     cone.position.y = y;
     cone.position.x = x;
     cone.position.z = z;
     cone.receiveShadow = true;
     cone.castShadow = true;
     cone.addEventListener('collision',function(other_object){
       if (other_object==sphere){ // change to avatar later
         pos = sphere.getWorldPosition();
         controls.plat = 'true';
       }
     })
     scene.add(cone);
    }
