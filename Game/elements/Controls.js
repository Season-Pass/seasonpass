/*
  *
  *
*/




    /*
      These are the controls for the character model.
      wsda will be used to move the character.
      * A jump key has not been included yet.
      * Might add more possible controls later.
      - Attack, grab, etc.
    */
    function keydown(event){
      console.log("Keydown:"+event.key);
      //console.dir(event);
      switch (event.key){
        case "w":
        //case "ArrowUp":
          controls.fwd = true;  break;
        case "s":
        //case "ArrowDown":
          controls.bwd = true; break;
        case "a":
        //case "ArrowLeft":
          controls.left = true; break;
        case "d":
        //case "ArrowRight":
          controls.right = true; break;

        // switch cameras (will be removed at another time)
        case "1": devCameraActive = true; break;
        case "2": devCameraActive = false; break;
      }
    }

    /*
      These cancel the controls for the character model.
      wsda will be used to move the character.
      * A jump key has not been included yet.
      * Might add more possible controls later.
    */
    function keyup(){
      //console.dir(event);
      switch (event.key){
        case "w":
        //case "ArrowUp":
          controls.fwd = false;  break;
        case "s":
        //case "ArrowDown":
          controls.bwd = false; break;
        case "a":
        //case "ArrowLeft":
          controls.left = false; break;
        case "d":
        //case "ArrowRight":
          controls.right = false; break;
        case " ": controls.jump = true; break;
      case "c":
      if(showControls == true){
        showControls = false;
        info.innerHTML = "";
      } else{
        showControls = true;
        info.innerHTML = instructions;
      }
    }
  }
