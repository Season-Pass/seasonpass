/*
  * This file will contain sounds for the Game.
  * Sounds include music, environment sounds, character Sounds.
  * Character sounds are not necessarily dialogue.
*/
var charSteps, charJump, charAttack, charNoise, lowHealth; // noises from main character

var enemySteps, enemyAttack; // noises from enemy

var titleTheme, mainTheme, bossTheme, winTheme, loseTheme; // music for the title, main, boss, winning, and losing themes.

var snow, wind; // environment Sounds

var pause, play;  // sounds for user interface\


function mainGameMusic(){             // main theme playing
  mainTheme = new THREE.AudioListener();
  scene.add( mainTheme );

  var sound1 = new THREE.Audio( mainTheme );
  // global audio source
  var audloader1 = new THREE.AudioLoader();
  audloader1.load( 'libs/sounds/MainThemeV2.m4a', function(buffer){
    sound1.setBuffer( buffer );
    sound1.setLoop( true );
    sound1.setVolume( 0.10 );
    sound1.play();
  });
}
/* credits:
Snow Walk sound effect: https://freesound.org/people/luminadii/sounds/336765/
Jump: https://freesound.org/people/Lefty_Studios/sounds/369515/
Attack:
Penguin Noise: https://freesound.org/people/soundbytez/sounds/111079/
Enemy Attack 1 Laser: https://freesound.org/people/cryanrautha/sounds/343851/
Wind environment: https://freesound.org/people/qubodup/sounds/211610/
*/
