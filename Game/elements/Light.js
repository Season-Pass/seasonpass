/*
  * This file will hold lighting and effects
  * for each scene such as point lights.
  * Ill try to make a light stream later. Or someone else can if they want to.

  Nadia Kubatin
*/




  // light
  var ambiLight, spotLight, light, hemilight;
  var pointLight, pointLight2, pointLight3, pointLight4;




    /*
      Creates four pointlights, a spotlight, a hemisphere light
      and an ambient light
      and sets color, intensity and position
      as well as sets shadows and targets for the light.
      * Will play with light parameters and colors to find better fit
    */
    function initLight(){
      ambiLight = new THREE.AmbientLight(0x111111, 1.5);
      hemilight = new THREE.HemisphereLight( 0xffffff, 0x66c2ff, .07 );
      spotLight = new THREE.SpotLight(0xffffff, .4, 125, .2, 0, 1);
      spotLight.position.set(0,125,0);
      spotLight.castShadow = true;
      scene.add(ambiLight);
      scene.add(hemilight);
      scene.add(spotLight);
      initPointLight();
    }

    /*
      Creates the main lighting for the game using pointlights.
    */
    function initPointLight(){
      pointLight = new THREE.PointLight( 0xffffff, 1.2, 250 );
      pointLight2 = new THREE.PointLight( 0xffffff, 1.2, 250 );
      pointLight3 = new THREE.PointLight( 0xffffff, 3, 350, .5 );
      pointLight4 = new THREE.PointLight( 0xffffff, 1.2, 350, .5 );
      pointLight5 = new THREE.PointLight( 0xffffff, 1.2, 250 );
      pointLight.position.set( 0, 15, 0 );
      pointLight2.position.set( 0, 15, -130 );
      pointLight3.position.set( -300, 15, -300 );
      pointLight4.position.set( -200, 15, -570 );
      pointLight5.position.set( 0, 120, -950 );
      pointLight.castShadow = true;
      pointLight3.castShadow = true;
      pointLight5.castShadow = true;
      scene.add(pointLight);
      scene.add(pointLight2);
      scene.add(pointLight3);
      scene.add(pointLight4);
      scene.add(pointLight5);
    }

    /*
      Sets shadows and their settings for
      two lights, spotLight and light.
      * need to include conditioned shadows
      * need to add settings
    */
    function initShadows(){
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      spotLight.shadow.camera.near = 0.1;
      spotLight.shadow.camera.far = 700;
    }
