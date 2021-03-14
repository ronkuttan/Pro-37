class Quiz{
    constructor(){
    }
    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val()
        })
    }
    update(gState){
        database.ref('/').update({
            gameState : gState
        })
    }
    async start(){
        if(gameState === 0){
            contestant = new Contestant();

            var contestantCountRef = await database.ref('contestantCount').once("value");
            if(contestantCountRef.exists()){
                contestantCount = contestantCountRef.val()
                contestant.getCount();
            }
            question = new Question();
            question.display();
        }
    }
    play(){
        question.hide();
        background(255);

        textSize(30);
        text("Result of the Quiz", 250,50);

        Contestant.getContestantInfo();

        if(allContestant !== undefined){
            textSize(20);
            text("*NOTE: Contestant who answered correct are highlighted in green colour!!", 100,230);
    
            for(var plr in allContestant){
                var correctAns = "2";
                var position = 230;
                if(correctAns === allContestant[plr].answer)
                    fill("Green");
               else
                    fill("red");
                   
                   
                    position = position+30
                    textSize(15);
                    text(allContestant[plr].name + " : " + allContestant[plr].answer, 220, position);
                  }

            }
        }
    
    

}