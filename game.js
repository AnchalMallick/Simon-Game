var buttonColours = ["red","blue","green","yellow"];
var level = 0;
gamePattern = [];        //will store the sequence of colors dictated by the game engine
userClickedPattern = []; //will store the sequence of colors tapped by the player

function nextSequence(){
  level++;                                                //increment the level by 1
  $("#level-title").text("Level "+level);                 //and show the level in the as the heading of our webpage
  userClickedPattern = [];                                //whenever nextSequence() is called, reset userClickedPattern
  var randomNumber = Math.floor(Math.random()*4);         //generate a random no. b/w 0-3
  var randomChosenColour = buttonColours[randomNumber];   //choose the random color from buttonColours array
  gamePattern.push(randomChosenColour);                   //add it to the game engine sequence i.e. game pattern array
  $("#"+randomChosenColour).fadeOut().fadeIn();           //add animation effect to the button with randomChosenColour id so that the user knows the next button in the sequence
  playSound(randomChosenColour);                          //play the corresponding sound for that button

}

$(".btn").on("click",function(event){ //detect the button click by the player
  var userChosenColour = this.id;     //and store the color tapped by the player
  userClickedPattern.push(userChosenColour); //add the colour to the user clicked pattern array
  animatePress(userChosenColour);             //adding animation to player clicks
  playSound(userChosenColour);               //play the corresponding sound for that button
  checkAnswer(userClickedPattern.length);
})

function checkAnswer(currentLevel){ //check if till now, the user has tapped correctly or not
  if(userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
    if(currentLevel === level){ //if the user manages to tap the entire pattern correctly,we move to the next level by caling nextSequence
      console.log("success");   //after a timeout of 1 second
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{ //if the user taps the wrong button at any point of time
    console.log("failure"); //the game is over
    var audio = new Audio("sounds/wrong.mp3");  //play sound for losing the game
    audio.play();
    $("body").addClass("game-over");    //add class to body depicting game lost
    setTimeout(function(){
      $("body").removeClass("game-over"); //and remove it after 100 ms timeout
    },100);
    $("#level-title").text("Game Over! Press any Key to Restart");  //and change the title to game over accordingly
    startOver();  //start over the game again
  }
}

function startOver(){ //reset all the variables to their initial values
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


$(document).on("keydown",function(){  //detect keypress
  if(level === 0){  //if it is the first keypress(i.e. level is currently 0) then call nextSequence
    nextSequence();
  }
})

function playSound(colour){   //play sound for the corresponding button
  var audio = new Audio("sounds/"+colour+".mp3");
  audio.play();
}

function animatePress(currentColour){ //add animation effect to the corresponding button with id as currentColour
    $("#"+currentColour).addClass("pressed"); //add pressed class to the button element having currentColour as id
    setTimeout(function(){  //remove the pressed class from it after a timeout of 50 ms
      $("#"+currentColour).removeClass("pressed");
    },50)
}
