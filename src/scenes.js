export default (app) => {
   const gameMenuScene = createGameMenuScene(app);
   const gameOverScene = createGameOverScene(app);
   const gameSpellScene = createSpellScene(app);

    return {
      gameMenuScene,
      gameOverScene,
      gameSpellScene
    }
}

function createSpellScene(app) {
   const gameSpellScene = new PIXI.Container();
   let spellBackground = new PIXI.Sprite(PIXI.loader.resources["images/spell.png"].texture);
   gameSpellScene.addChild(spellBackground);
   gameSpellScene.visible = false;
   return gameSpellScene;
}

function createGameOverScene(app) {
   const gameOverScene = new PIXI.Container();
   let gameOverText = new PIXI.Text("Game Over", { fontFamily: 'Verdana', fontSize: 42, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   let tryAgainText = new PIXI.Text("Click/tap to try again", { fontFamily: 'Verdana', fontSize: 24, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   gameOverText.x = app.view.width / 2;
   gameOverText.y = app.view.height / 2;
   gameOverText.anchor.x = 0.5;
   gameOverText.anchor.y = 0.5;
   tryAgainText.x = app.view.width / 2;
   tryAgainText.y = app.view.height / 2 + 100;
   tryAgainText.anchor.x = 0.5;
   tryAgainText.anchor.y = 0.5;
   gameOverScene.addChild(gameOverText);
   gameOverScene.addChild(tryAgainText);
   gameOverScene.interactive = true;
   gameOverScene.visible = false;
   return gameOverScene;
}

function createGameMenuScene(app) {
   const gameMenuScene = new PIXI.Container();
   let menuNameText = new PIXI.Text("Game Name", { fontFamily: 'Verdana', fontSize: 42, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   let menuStartText = new PIXI.Text("Click/tap to start", { fontFamily: 'Verdana', fontSize: 24, fill: 0xff1010, align: 'center', strokeThickness: 10 });
   menuNameText.x = app.view.width / 2;
   menuNameText.y = app.view.height / 2;
   menuNameText.anchor.x = 0.5;
   menuNameText.anchor.y = 0.5;
   menuStartText.x = app.view.width / 2;
   menuStartText.y = app.view.height / 2 + 100;
   menuStartText.anchor.x = 0.5;
   menuStartText.anchor.y = 0.5;
   gameMenuScene.addChild(menuNameText);
   gameMenuScene.addChild(menuStartText);
   gameMenuScene.interactive = true;
   return gameMenuScene;
}
