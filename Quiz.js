class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    textSize(30);
    text("Result of Quiz",300,50);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*NOTE: Contestant who answered correct are highlighted in green colour!",130,230);
      var displayPos = 235;
      for(var msd in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[msd].answer){
          fill("green");
        }else{
          fill("red");
        }
        displayPos+=30;
        textSize(20);
        text(allContestants[msd].name+":"+allContestants[msd].answer,200,displayPos);
      }
    }
  }
}
