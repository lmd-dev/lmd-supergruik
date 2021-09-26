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
    public set app(value: PIXI.Application) { this._app = value; }

    //PIXI drawing layer for SuperGruik
    private _superGruikLayer: PIXI.Container;
    public get superGruikLayer(): PIXI.Container { return this._superGruikLayer; }
    public set superGruikLayer(value: PIXI.Container) { this._superGruikLayer = value; }

    //PIXI drawing layer for wastes
    private _wastesLayer: PIXI.Container;
    public get wastesLayer(): PIXI.Container { return this._wastesLayer; }
    public set wastesLayer(value: PIXI.Container) { this._wastesLayer = value; }

    /**
     * Constructor
     */
    constructor(controllerGame: ControllerGame)
    {
        this._controllerGame = controllerGame;
        this._controllerGame.addObserver(this);

        this._app = new PIXI.Application({
            resizeTo: window
        });

        this._superGruikLayer = new PIXI.Container();
        this._wastesLayer = new PIXI.Container();

        this.app.stage.addChild(this.wastesLayer);
        this.app.stage.addChild(this.superGruikLayer);

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
    initializeEvents()
    {
        //KeyDown event
        window.addEventListener("keydown", (event) =>
        {
            switch (event.keyCode)
            {
                case 38: this._controllerGame.moveUpSuperGruik(); break;
                case 40: this._controllerGame.moveDownSuperGruik(); break;
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
    start()
    {
        this._controllerGame.startGame(new GraphicalItemPixiFactory(this.superGruikLayer, this.wastesLayer), this.app.view.width, this.app.view.height);

        this.app.ticker.add((elapsedTime) =>
        {
            this._controllerGame.updateGame(elapsedTime / 10.0);
        });
    }
}