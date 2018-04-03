/*
  * This file will contain restrictions that prevent the character from
  * moving off the map or accedentaly falling off the map.
  * It will also contain camera restrictions such as
  * those that block the camera's view.
*/




  //variables
  var boundry;




    /*
      Binds the character to a single area within the cave to prevent
      it from falling out of the scene.
      * will be moved later to a seperate file.
    */
    function initBoundry(){
      var points = [];
      for ( var i = 0; i < 9; i ++ ) {
         points.push( new THREE.Vector2(
                      Math.sin( i * 0.17 ) * 95 + 5, ( i - 4.6 ) * 13
         ));
       }
       var geometryBo = new THREE.LatheGeometry( points, 50, 0, 1.05*Math.PI );
       var materialBo = new THREE.MeshPhongMaterial( {
                          color: 0xcce6ff,
                          transparent: true,
                          opacity: 0,
                          side:THREE.DoubleSide
                        } );
      var pmaterialBo = new Physijs.createMaterial(materialBo,0.9,0.5);
      boundry = new Physijs.ConcaveMesh( geometryBo, pmaterialBo,0 );
      boundry.rotation.x = THREE.Math.degToRad( 180 );
      boundry.rotation.y = THREE.Math.degToRad( 10 );
      boundry.position.y = 43;
      scene.add(boundry);

      createBlock(30,40,32,15,-91,-20,0);
      createBlock(30,40,50,15,-83,-35,0);
      createBlock(30,10,10,-.05,-100,0,83);
      createBlock(30,10,10,-3,-110,0,70);
      createBlock(30,10,10,-8,-118,0,48);
      createBlock(30,50,10,-33,-135,0,30);
      createBlock(30,10,10,-58,-152,0,48);
      createBlock(30,30,10,-67,-163,0,55);
      createBlock(30,20,10,-78,-185,0,75);
      createBlock(30,40,10,-80,-205,0,90);
      createBlock(600,200,25,-50,-390,90,0);
      createBlock(600,200,-4,-50,-390,90,0);

    }

    /*
      Creates a plane and sets it position and rotation.
    */
    function createBlock(w,h,x,y,z,r,r2){
      var block = initPlane(w,h);
      block.rotation.y = THREE.Math.degToRad( r );
      block.rotation.x = THREE.Math.degToRad( r2 );
      block.position.set(x, y, z);
      scene.add(block);
    }

    /*
      Creates a plane for use in the initBarrier function.
      The plane has opacity 0, meaning it cannot be seen.
    */
    function initPlane(w,h){
      var geometryPF = new THREE.PlaneBufferGeometry( w, h, 199, 199 );
      var materialPF = new THREE.MeshPhongMaterial( {
                        color: 0x66b3ff,
                        transparent: true,
                        opacity: 0,
                        side:THREE.DoubleSide
                       } );
      var pmaterialPF = new Physijs.createMaterial(materialPF,0,0.5);
      plane = new Physijs.BoxMesh( geometryPF, materialPF,0 );
      return plane;
    }
    
