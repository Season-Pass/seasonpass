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
*/

  //var controls = {zSpeed:0,xSpeed:0,ySpeed:0,yRotSpeed:0};
  var map;
  var sphere; // model for small scale tests. Will be removed

  /*
    creates an object for the map.
    This contains every object in the Scene
    other than characters.
    This will possibly be what is used for controls.
    It will be updated everytime a new object is created.
    In the meantime, map can be used to code for controls as a whole.
    There is no need to change individual child objects.
  */
  function createMap(){
    map = new THREE.Group();
    map.add(caveWall);
    map.add(caveFloor);
    map.add(passageFloor);
    map.add(icicles);
    map.add(snow);
    map.add(pointLight);
    map.add(spotLight);
    scene.add(map);
  }

  /*
    creates a geometry and texture for a sphere.
    It also sets the position of the sphere.
    * This sphere is a temporary placement for
    * a future character model.
  */
  function initSphere(){
    var geometrysp = new THREE.SphereGeometry(3, 40, 40);
    var materialsp = new THREE.MeshLambertMaterial( { color: 0xff0000} );
    var pmaterialsp = new Physijs.createMaterial(materialsp,0.9,0.5);
    //sphere = new THREE.Mesh( geometrysp, materialsp );
    sphere = new Physijs.SphereMesh( geometrysp, pmaterialsp );
    sphere.position.y = 5;
    sphere.setDamping(0.1,0.1);
    sphere.castShadow = true;
    scene.add(sphere);
  }

  /*
    temporary placement controls example.
    Currently being edited.
  */
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

  /*
    temporary placement controls example.
    Currently being edited.
  */
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
