/*
  * This file will contain the third room in the game.
  * This room will contain a very simple puzzle.
  > This file has yet to be implemented

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

    }

    /*

    */
    function initRoomPass1(){

    }

    /*

    */
    function initRoomPass2(){

    }

    /*

    */
    function initPlatforms(){

    }

    /*

    */
    function initCone(){

    }
