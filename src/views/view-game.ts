/**
 * View responsible for the game
 */
class ViewGame implements Observer
{
    //Controller responsible for the game
    private _controllerGame: ControllerGame;

    //PIXI application instance
    private _app: PIXI.Application;
    public get app(): PIXI.Application { return this._app; }

    //PIXI drawing layer for SuperGruik
    private _superGruikLayer: PIXI.Container;
    public get superGruikLayer(): PIXI.Container { return this._superGruikLayer; }

    //PIXI drawing layer for wastes
    private _wastesLayer: PIXI.Container;
    public get wastesLayer(): PIXI.Container { return this._wastesLayer; }

    //PIXI drawing layer for the GUI
    private _guiLayer: PIXI.Container;
    public get guiLayer(): PIXI.Container { return this._guiLayer; }

    //Component displaying SuperGruik's amount of power 
    private _powerBar: PowerBar;
    public get powerBar(): PowerBar { return this._powerBar; }

    //Component displaying SuperGruik's points of life
    private _lifeBar: LifeBar;
    public get lifeBar(): LifeBar { return this._lifeBar; }

    //Component displaying Waves on the beach
    private _waves: Waves;
    public get waves(): Waves { return this._waves; }

    //Container displaying the score of the player
    private _scoreContainer: PIXI.Container;

    /**
     * Constructor
     */
    constructor(controllerGame: ControllerGame)
    {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);

        this._app = new PIXI.Application({
            resizeTo: window,
            backgroundColor: 0xFFD184
        });

        this._superGruikLayer = new PIXI.Container();
        this._wastesLayer = new PIXI.Container();
        this._guiLayer = new PIXI.Container();

        this.app.stage.addChild(this.wastesLayer);
        this.app.stage.addChild(this.superGruikLayer);
        this.app.stage.addChild(this.guiLayer);

        this._scoreContainer = new PIXI.Container();

        this._powerBar = new PowerBar(this.app, 304, 14, false, 100);
        this._lifeBar = new LifeBar(this.app, 10, 3);
        this._waves = new Waves(this.app, 500, 50, 1);

        this.guiLayer.addChild(this.waves);
        this.guiLayer.addChild(this.powerBar);
        this.guiLayer.addChild(this.lifeBar);
        this.guiLayer.addChild(this._scoreContainer);

        document.body.appendChild(this._app.view);

        this.initializeEvents();

        this.start();
    }

    /**
     * Notify function of the view
     */
    notify()
    {

    }

    /**
     * Initializes main events of the view
     */
    private initializeEvents()
    {
        //KeyDown event
        window.addEventListener("keydown", (event) =>
        {
            switch (event.code)
            {
                case "ArrowUp": this._controllerGame.moveUpSuperGruik(); break;
                case "ArrowDown": this._controllerGame.moveDownSuperGruik(); break;
            }
        });

        //KeyUp event
        window.addEventListener("keyup", (event) =>
        {
            this._controllerGame.stopSuperGruik();
        });

        //MouseDown event
        this._app.view.addEventListener("mousedown", (event) =>
        {
            this._controllerGame.startFire({ x: event.clientX, y: event.clientY });
        })

        //MouseMove event
        this._app.view.addEventListener("mousemove", (event) =>
        {
            this._controllerGame.updateFire({ x: event.clientX, y: event.clientY });
        });

        //MouseDown event
        this._app.view.addEventListener("mouseup", (event) =>
        {
            this._controllerGame.stopFire();
        })
    }

    /**
     * Starts the game
     */
    private start()
    {
        this._controllerGame.startGame(new GraphicalItemPixiFactory(this.superGruikLayer, this.wastesLayer), this.app.view.width, this.app.view.height);

        this.app.ticker.add((elapsedTime) =>
        {
            this._controllerGame.updateGame(elapsedTime / 10.0);
            this.displayGUI(elapsedTime);
        });

    }

    /**
     * Displayes GUI items
     * @param elapsedTime Time elapsed from the last update
     */
    private displayGUI(elapsedTime: number)
    {
        this.powerBar.powerValue = this._controllerGame.getSuperGruikPowerValue();
        this.powerBar.isOverloaded = this._controllerGame.isSuperGruikOverloaded();
        this.powerBar.x = (this.app.renderer.width - this.powerBar.clientWidth) / 2;
        this.powerBar.y = 15;
        this.powerBar.update();

        this.lifeBar.pointsOfLife = this._controllerGame.getSuperGruikLife();
        this.lifeBar.x = 50;
        this.lifeBar.y = 25;
        this.lifeBar.update();

        this.waves.update(elapsedTime);

        this.displayScore();
    }

    /**
     * Displayes the score of the player
     */
    private displayScore()
    {
        this._scoreContainer.children.forEach((child) =>
        {
            this._scoreContainer.removeChild(child);
            child.destroy();
        });

        const scoreText = new PIXI.Text(this._controllerGame.getScore().toString(), {
            fontSize: 30,
            align: "right",
            fill: 0x000000
        });
        scoreText.x = this.app.renderer.width - 50 - scoreText.width;
        scoreText.y = 10;

        this._scoreContainer.addChild(scoreText);

    }

    
}