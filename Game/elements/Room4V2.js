/*
  * This file will contain the fourth and final room of the game.
  * This is the boss room and will contain an enemy or challenge.

  Nadia Kubatin
*/




  var bossFloor, bossWall, exit, boss, door;




    /*

    */
    function initBossFloor(){
      var geometryBF = new THREE.PlaneBufferGeometry( 150, 250, 199, 199 );
      var normalTextureBF = new THREE.TextureLoader().load('libs/Images/ice-floor-b.png');
      var bumpTextureBF = new THREE.TextureLoader().load('libs/Images/ice-floor-3.png');
      var materialBF = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTextureBF,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                       } );
      var pmaterialPF2 = new Physijs.createMaterial(materialBF,0,0.5);
      bossFloor = new Physijs.BoxMesh( geometryBF, materialBF,0 );
      bossFloor.rotation.x = THREE.Math.degToRad( 90 );
      bossFloor.position.y = 80;
      bossFloor.position.x = 0;
      bossFloor.position.z = -980;
      scene.add(bossFloor);
    }

    /*

    */
    function initBossWall(){

    }

    /*

    */
    function initSides(){

    }

    /*

    */
    function initBoss(){

    }

    /*

    */
    function initExit(){

    }

    /*

    */
    function initDoor(){

    }
