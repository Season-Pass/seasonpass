/*
  * This file will contain sounds for the Game.
  * Sounds include music, environment sounds, character Sounds.
  * Character sounds are not necessarily dialogue.

  Eli Kengmana

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
      This functions creates the music for each scene.
    */
    function initGameMusic(){
      musicTheme = new THREE.AudioListener();
      scene.add( musicTheme );

      var sound = new THREE.Audio( musicTheme );
      // global audio source
      if (gameState.scene=='start') {
        var audloader = new THREE.AudioLoader();
        audloader.load( 'libs/sounds/MainThemeV2.m4a', function(buffer){
          sound.setBuffer( buffer );
          sound.setLoop( true );
          sound.setVolume( 1 );
          sound.play();
        });
      } else if (gameState.scene=='bossState'){
        var audloader1 = new THREE.AudioLoader();
        audloader1.load( 'libs/sounds/BossThemeV1.m4a', function(buffer){
          sound.setBuffer( buffer );
          sound.setLoop( true );
          sound.setVolume( 1 );
          sound.play();
        });
      } else if (gameState.scene=='main'){
        var audloader2 = new THREE.AudioLoader();
        audloader2.load( 'libs/sounds/MainThemeV2.m4a', function(buffer){
          sound.setBuffer( buffer );
          sound.setLoop( true );
          sound.setVolume( 1 );
          sound.play();
        });
      }
    }

    /*
      This function creates sound effects.
    */
    function initGameSounds(effect){
      var soundEffect = new THREE.AudioListener();
      scene.add(soundEffect);

      var sound = new THREE.Audio(soundEffect);

      var soundLoader = new THREE.AudioLoader();
      soundLoader.load( 'libs/sounds/'+effect, function(buffer){
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
      });
    }
