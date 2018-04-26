/*
  * This file will contain the fourth and final room of the game.
  * This is the boss room and will contain an enemy or challenge.

  Nadia Kubatin
*/




  var bossFloor, bossWall, exit, boss, crystal, door;




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
      createWall(250, 150, -75, -980, 90);
      createWall(150, 150, 0, -1105, 0);
      createWall(50, 150, -50, -855, 0);
    }

    /*

    */
    function createWall(w, h, x, z, rot){
      var geometryBW = new THREE.PlaneBufferGeometry( w, h, 199, 199 );
      var textureBW = new THREE.TextureLoader().load('libs/Images/ice-cave-c2.png');
      var normalTextureBW = new THREE.TextureLoader().load('libs/Images/ice-cave-2c.png');
      var bumpTextureBW = new THREE.TextureLoader().load('libs/Images/ice-cave-3-b.png');
      var materialBW = new THREE.MeshPhongMaterial( {
                          color: 0x66b3ff,
                          map:textureBW,
                          emissive: 0x000000,
                          emissiveIntensity: 10,
                          bumpMap: bumpTextureBW,
                          shininess: 100,
                          reflectivity: .5,
                          side:THREE.DoubleSide
                       } );
      var pmaterialBW = new Physijs.createMaterial(materialBW,0,0.5);
      bossWall = new Physijs.BoxMesh( geometryBW, materialBW,0 );
      bossWall.rotation.y = THREE.Math.degToRad( rot );
      bossWall.position.y = 155;
      bossWall.position.x = x;
      bossWall.position.z = z;
      scene.add(bossWall);
    }
    
    /*

    */
    function initBoss(){
      loader = new THREE.JSONLoader();
  		loader.load('libs/Crystal.json',
  		function (geometry, materials){
  			var material = new THREE.MeshPhongMaterial( {
                        color: 0x993399,
                        emissive: 0x000059,
                        emissiveIntensity: 1,
                        specular: 0x1a1aff,
                        transparent: true,
                        opacity: .9,
                        shininess: 100,
                        reflectivity: .5,
                        side:THREE.DoubleSide
                      } );
  			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
  			crystal = new Physijs.BoxMesh( geometry, pmaterial,0 );

        crystal.scale.set(25,25,25);
  			crystal.position.set(0,55,-980);
  			crystal.castShadow = true;
        crystal.receiveShadow = true;
  			scene.add( crystal  );
  			boss=crystal;

  		}, function(xhr){
  						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
  			function(err){console.log("error in loading: "+err);}
  		);
    }

    /*

    */
    function initExit(){
      var geometryE = new THREE.CylinderGeometry( 30, 30, 6, 64, 64);
      var materialE = new THREE.MeshPhongMaterial( {
                         color: 0x000000,
                         specular: 0x000000,
                         emissive: 0x000000,
                         emissiveIntensity: 10,
                         shininess: 100,
                         reflectivity: .5,
                         side:THREE.DoubleSide
                       } );
     var pmaterialE = new Physijs.createMaterial(materialE,0.9,0.5);
     //cone = new THREE.Mesh( geometryCo, materialCo );
     exit = new Physijs.CylinderMesh( geometryE, pmaterialE,0 );
     exit.position.y = 100;
     exit.position.x = 0;
     exit.position.z = -1105;
     exit.rotation.x = THREE.Math.degToRad( 90 );
     exit.receiveShadow = true;
     exit.castShadow = true;
     exit.addEventListener('collision',function(other_object){
       if (other_object==sphere){ // change to avatar later
         gameState.scene = 'end';
       }
     })
     scene.add(exit);
    }
