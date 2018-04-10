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
  var musicTheme, titleTheme, mainTheme, bossTheme, winTheme, loseTheme;
  // environment Sounds
  var snow, wind;
  // sounds for user interface
  var pause, play;



    /*
      To Eli,

      The easiest thing for you to do would be to
      create the function initGameMusic and create
      a paramter called sound file. From there,
      in each of the initScenes, you can
      place at the end initGameMusic(specified file);.

      This way, the music will play depending on
      which scene is rendered in the switch staement.
      You do not need to do anything to the switch statement.

      Also, you can do something similar with sound effects
      but make sure to create a separate function as
      sound effects will be used differently and
      will be called in events specified by init and animates

      If you would like an example, search PA02 for
      the sound functions for examples of structure and use.

      -Nadia
    */
    function initGameMusic(){
      musicTheme = new THREE.AudioListener();
      scene.add( musicTheme );

      var sound = new THREE.Audio( musicTheme );
      // global audio source
      if (gameState.scene=='gameStart') {
        var audloader = new THREE.AudioLoader();
        audloader1.load( 'libs/sounds/MainThemeV2.m4a', function(buffer){
          sound1.setBuffer( buffer );
          sound1.setLoop( true );
          sound1.setVolume( 0.05 );
          sound1.play();
        });
      } else if (gameState.scene=='bossState'){
        var audloader = new THREE.AudioLoader();
        audloader1.load( 'libs/sounds/BossThemeV1.m4a', function(buffer){
          sound1.setBuffer( buffer );
          sound1.setLoop( true );
          sound1.setVolume( 0.05 );
          sound1.play();
        });
      }
    }

    function initGameSounds(){

    }
