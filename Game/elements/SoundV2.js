/*
  * This file will contain sounds for the Game.
  * Sounds include music, environment sounds, character Sounds.
  * Character sounds are not necessarily dialogue.

  credits:
  Snow Walk sound effect: https://freesound.org/people/luminadii/sounds/336765/
  Jump: https://freesound.org/people/Lefty_Studios/sounds/369515/
  Attack:
  Penguin Noise: https://freesound.org/people/soundbytez/sounds/111079/
  Enemy Attack 1 Laser: https://freesound.org/people/cryanrautha/sounds/343851/
*/


  // noises from main character
  var charSteps, charJump, charAttack, charNoise, lowHealth;
  // noises from enemy
  var enemySteps, enemyAttack;
  // music for the title, main, boss, winning, and losing themes.
  var titleTheme, mainTheme, bossTheme, winTheme, loseTheme;
  // environment Sounds
  var snow, wind;
  // sounds for user interface
  var pause, play;


    function initGameMusic(){
      bossTheme = new THREE.AudioListener();
      scene.add( bossTheme );

      var sound1 = new THREE.Audio( bossTheme );
      // global audio source
      var audloader1 = new THREE.AudioLoader();
      audloader1.load( 'libs/sounds/BossThemeV1.m4a', function(buffer){
        sound1.setBuffer( buffer );
        sound1.setLoop( true );
        sound1.setVolume( 0.05 );
        sound1.play();
      });
    }
