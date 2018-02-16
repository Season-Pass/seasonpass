/*
  * This file will contain character model information.
  - Character design using Three.js and grouping or blender.
  - Character controls
  > Space/X = jump
  > Arrow keys/ asdw = movement
  > "Look up" function?
  - Animations are different from movement
  > make specific animations for certain actions
  > ex. walking animation for move, jumping animation for jump
  - include a slide down hill animation
  * Functions made in this file should be called in Scene
  * This file has yet to be added to GameV2.html
  - puzzle characteristics
  > ability to move objects to solve puzzles?
  Hello everyone!!
*/

  //var controls = {zSpeed:0,xSpeed:0,ySpeed:0,yRotSpeed:0};

  //var map = new THREE.Group();
  //map.add(caveWall);
  //map.add(caveFloor);
  //map.add(passageFloor);
  //map.add(icicles);
  //map.add(snow);

  /*
    creates a geometry and texture for a sphere.
    It also sets the position of the sphere.
    * This sphere is a temporary placement for
    * a future character model.
  */
  function initSphere(){
    var geometrysp = new THREE.SphereGeometry(3, 40, 40);
    var materialsp = new THREE.MeshLambertMaterial( { color: 0xff0000} );
    sphere = new THREE.Mesh( geometrysp, materialsp );
    sphere.castShadow = true;
    scene.add(sphere);
  }

  function keydown(event){
    //console.log("Keydown:"+event.key);
		//console.dir(event);
		switch (event.key){
			case "w": controls.zSpeed = -1;  break;
			case "s": controls.zSpeed=1; break;
      case "a": controls.xSpeed=-1; break;
			case "d": controls.xSpeed=1; break;
      case "r": controls.ySpeed=1; break;
			case "f": controls.ySpeed=-1; break;
      case "ArrowLeft": controls.yRotSpeed = 1; break;
      case "ArrowRight": controls.yRotSpeed = -1; break;
		}
  }

  function keyup(){
    //console.log("Keydown:"+event.key);
		//console.dir(event);
		switch (event.key){
			case "w": controls.zSpeed=0; break;
			case "s": controls.zSpeed=0; break;
      case "a": controls.xSpeed=0; break;
			case "d": controls.xSpeed=0; break;
      case "r": controls.ySpeed=0; break;
			case "f": controls.ySpeed=0; break;
      case "ArrowLeft": controls.yRotSpeed=0; break;
			case "ArrowRight": controls.yRotSpeed=0; break;
		}
  }

  function moveChar(){

  }

  function stopChar(){

  }
