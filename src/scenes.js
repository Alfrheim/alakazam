export default (app) => {
    const gameMenuScene = createGameMenuScene(app);
    const gameOverScene = createGameOverScene(app);
    const gameSpellScene = createSpellScene(app);
    const gameIntroVideoScene = createIntroVideoScene(app);
    const gameEndScene = createEndGameScene(app);
    const gameOuijaScene = createOuijaScene(app);

    return {
        gameMenuScene,
        gameOverScene,
        gameSpellScene,
        gameIntroVideoScene,
        gameOuijaScene,
        gameEndScene
    }
}

function createIntroVideoScene(app){
   const gameIntroVideoScene = new PIXI.Container();
   
   // create a video texture from a path
   let texture = PIXI.Texture.fromVideo('media/introVideo.mp4');

   // create a new Sprite using the video texture (yes it's that easy)
   let videoSprite = new PIXI.Sprite(texture);

   videoSprite.preload = 'auto';
	videoSprite.loop = false;
   videoSprite.height=600;

   //adding video sprite to the container
   gameIntroVideoScene.addChild(videoSprite);

   return gameIntroVideoScene;
}

function createSpellScene(app) {
   const gameSpellScene = new PIXI.Container();
   let spellBackground = new PIXI.Sprite(PIXI.loader.resources["images/spell.png"].texture);
   gameSpellScene.addChild(spellBackground);
   gameSpellScene.visible = false;
   return gameSpellScene;
}

function createEndGameScene(app) {
   let gameWinText = new PIXI.Text("The Angel is gone. \n We will not hear its voice anymore but\n we will continue roaming its glorious land for a while longer...", { fontFamily: 'Verdana', fontSize: 42, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   gameWinText.x = 0;
   gameWinText.y = 50;
   // gameWinText.anchor.x = 1;
   // gameWinText.anchor.y = 1;
   gameWinText.width = 750;
   
   const endGameScene = new PIXI.Container();
   const endGameBackground = new PIXI.Sprite(PIXI.loader.resources["images/gameover.png"].texture);
   endGameScene.addChild(endGameBackground);
   endGameScene.addChild(gameWinText);
   
   endGameScene.visible = false;
   return endGameScene;
}

function createOuijaScene(app) {
    const ouijaSpellScene = new PIXI.Container();
    let ouijaBackground = new PIXI.Sprite(PIXI.loader.resources["images/ouijawb.png"].texture);
    let questionText = new PIXI.Text("So, what do you say?", { fontFamily: 'Verdana', fontSize: 42, fill: 0xff1010, align: 'center', strokeThickness: 10 });
    questionText.x = 300;
    questionText.y = 50;
    let order = 0;
    const characterContainers = [];
   //  ouijaSpellScene.on('pointerdown', (event) => {
   //     const isSprite = event.target instanceof PIXI.Sprite;
   //     console.log(event.target, isSprite)
   //     if (!isSprite) {
   //        order = 0;
   //        characterContainers.forEach((characterContainer) => {
   //           characterContainer.alpha = 0;
   //           characterContainer.x = 0;
   //           characterContainer.y = 0;
   //           characterContainer.width = 1;
   //           characterContainer.height = 1;
   //        })
   //     }
   //  });
    ouijaSpellScene.addChild(ouijaBackground);
    [
       new PIXI.Rectangle(194, 132, 65, 65), // C
       new PIXI.Rectangle(77, 161, 65, 65), // A
       new PIXI.Rectangle(283, 188, 65, 65), // S
       new PIXI.Rectangle(330, 183, 65, 65) // T
    ].forEach((rectangle, index) => {
      const characterContainer = new PIXI.Sprite(PIXI.Texture.WHITE);
      characterContainer.interactive = true;
      characterContainer.alpha = 0;
      characterContainer.hitArea = rectangle;
      ouijaSpellScene.addChild(characterContainer)
      
      characterContainer.on('pointerdown', () => {
         if (index === order) {
            order++;
            // characterContainer.alpha = 0.3;
            // characterContainer.x = rectangle.x;
            // characterContainer.y = rectangle.y;
            // characterContainer.width = rectangle.width;
            // characterContainer.height = rectangle.height;
            // characterContainer.tint = Math.random() * 0xFFFFFF;

            if(order === 4) {
               global.countDown.endGame();
            }
         } else {
            order = 0;
            // characterContainers.forEach((characterContainer) => {
            //    characterContainer.alpha = 0;
            // })
         }
      });
      characterContainers.push(characterContainer);
    });

    ouijaSpellScene.visible = false;
    return ouijaSpellScene;
}

function createGameOverScene(app) {
   const endGameBackground = new PIXI.Sprite(PIXI.loader.resources["images/gameover.png"].texture);
   const gameOverScene = new PIXI.Container();
   gameOverScene.addChild(endGameBackground);
   let gameOverText = new PIXI.Text("Game Over", { fontFamily: 'Verdana', fontSize: 42, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   let tryAgainText = new PIXI.Text("Click/tap to try again", { fontFamily: 'Verdana', fontSize: 24, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   gameOverText.x = app.view.width / 6;
   gameOverText.y = app.view.height / 6;
   gameOverText.anchor.x = 0.5;
   gameOverText.anchor.y = 0.5;
   tryAgainText.x = app.view.width / 6;
   tryAgainText.y = app.view.height / 7 + 100;
   tryAgainText.anchor.x = 0.5;
   tryAgainText.anchor.y = 0.5;
   gameOverScene.addChild(gameOverText);
   gameOverScene.addChild(tryAgainText);
   gameOverScene.interactive = true;
   gameOverScene.hitArea=new PIXI.Rectangle(0,0,app.view.width,app.view.height);
   gameOverScene.visible = false;
   return gameOverScene;
}

function createGameMenuScene(app) {
   const gameMenuScene = new PIXI.Container();
   let menuNameText = new PIXI.Text("Alakazam\n A Spellcraft guide", { fontFamily: 'Gullhornet', fontSize: 42, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   let menuStartText = new PIXI.Text("Click/tap to start", { fontFamily: 'Verdana', fontSize: 24, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   menuNameText.x = (app.view.width / 6) + 70;
   menuNameText.y = 60;
   menuNameText.anchor.x = 0.5;
   menuNameText.anchor.y = 0.5;
   menuStartText.x = (app.view.width / 6) + 70;
   menuStartText.y = 150;
   menuStartText.anchor.x = 0.5;
   menuStartText.anchor.y = 0.5;
   gameMenuScene.addChild(menuNameText);
   gameMenuScene.addChild(menuStartText);
   gameMenuScene.interactive = true;
   gameMenuScene.hitArea=new PIXI.Rectangle(0,0,app.view.width,app.view.height);
   return gameMenuScene;
}
