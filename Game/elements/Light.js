/*
  * This file will hold lighting and effects
  * for each scene such as point lights.

  Nadia Kubatin
*/



  // light
  var ambiLight, spotLight, light, pointLight, hemilight;



    /*
      Creates four spotlights and an ambient light
      and sets color, intensity and position
      as well as sets shadows and targets for the light.
      * might split into multiple functions per lights
      * will play with light parameters and colors to find better fit
    */
    function initLight(){
      ambiLight = new THREE.AmbientLight(0x111111, 1.5);
      hemilight = new THREE.HemisphereLight( 0xffffff, 0x66c2ff, .07 );
      pointLight = new THREE.PointLight( 0xffffff, 1.2, 250 );
      spotLight = new THREE.SpotLight(0xffffff, .4, 125, .2, 0, 1);
      pointLight.position.set( 0, 15, 0 );
      spotLight.position.set(0,125,0);
      pointLight.castShadow = true;
      spotLight.castShadow = true;
      scene.add(ambiLight);
      scene.add(hemilight);
      scene.add(pointLight);
      scene.add(spotLight);
    }

    /*
      sets shadows and their settings for
      two lights, spotLight and light.
      * will include conditioned shadows
      * will add settings
      * currently being editied
    */
    function initShadows(){
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      spotLight.shadow.camera.near = 0.1;
      spotLight.shadow.camera.far = 700;
    }
