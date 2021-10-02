class Game
{
    //Score of the player
    private _score: number;
    public get score(): number { return this._score; }

    //Supergruik data
    private _superGruik: SuperGruik;

    //Wastes on the game
    private _wastes: Waste[];

    //Speed of the wastes on the game
    private _wasteSpeed: number;

    //Width of the drawing area
    private _gameWidth: number;

    //Height of the drawing area
    private _gameHeight: number;

    //Timer used to create wastes
    private _timerWaste: number | undefined;

    //Factory used to create graphical items
    private _graphicalItemFactory: GraphicalItemFactory;

    /**
     * Constructor
     * @param graphicalItemFactory: Factory used to create graphical items (SuperGruik, Wastes, ...)
     */
    constructor(graphicalItemFactory: GraphicalItemFactory)
    {
        this._graphicalItemFactory = graphicalItemFactory;
        this._score = 0;


        this._superGruik = this._graphicalItemFactory.createSuperGruik({ x: 0, y: 0 });
        this._wastes = [];
        this._wasteSpeed = 10;
        this._timerWaste = undefined;
        this._gameWidth = 0;
        this._gameHeight = 0;
    }

    /**
     * Starts the game
     */
    start(width: number, height: number)
    {
        this._score = 0;
        this._superGruik.coordinates.x = 50;
        this._superGruik.coordinates.y = 0;

        this._wastes = [];

        this._gameWidth = width;
        this._gameHeight = height;

        this.createWaste();
    }

    /**
     * Creates new wastes at random time interval
     */
    private createWaste()
    {
        clearTimeout(this._timerWaste);

        this._timerWaste = setTimeout(() =>
        {
            const x = this._gameWidth;
            const y = Math.random() * this._gameHeight;
            const rotation = Math.random() * Math.PI * 2;

            this._wastes.push(this._graphicalItemFactory.createWaste(1, { x, y }, rotation, this._wasteSpeed));

            this.createWaste();

        }, Math.random() * 2000 + 1000);
    }

    /**
     * destroyes wastes which are out of the screen
     */
    private destroyWastes()
    {
        for (let i = 0; i < this._wastes.length; ++i)
        {
            const waste = this._wastes[i];
            if (waste.coordinates.x < -100)
            {
                waste.destroy();
                this._wastes.splice(i, 1);
                --i;
            }
            else if (this._superGruik.engaged && this._superGruik.targetCoordinates)
            {
                if (waste.contains(this._superGruik.targetCoordinates))
                {
                    waste.destroy();
                    this._wastes.splice(i, 1);
                    --i;
                }
            }
        }
    }

    /**
     * Moves SuperGruik to the top of the game area
     */
    moveSuperGruikUp()
    {
        this._superGruik.speed = -50;
    }

    /**
     * Moves SupgerGruik to the bottom of tha gmae area
     */
    moveSuperGruikDown()
    {
        this._superGruik.speed = 50;
    }

    /**
     * Stops moving SuperGruik
     */
    stopSuperGruik()
    {
        this._superGruik.speed = 0;
    }

    /**
     * Returns the status of SuperGruik about targets
     */
    isSuperGruikEngaged(): boolean
    {
        return this._superGruik.engaged;
    }

    /**
     * Engages SuperGruik with a target 
     * @param targetCoordinates Coordinates of the target to engage
     */
    startFire(targetCoordinates: ICoordinates)
    {
        this._superGruik?.startFire(targetCoordinates);
    }

    /**
     * Updates the position of the target to engage
     * @param targetCoordinates New coordinates of the target
     */
    updateFire(targetCoordinates: ICoordinates)
    {
        this._superGruik?.startFire(targetCoordinates);
    }

    /**
     * Stops SuperGruik lasers
     */
    stopFire()
    {
        this._superGruik?.stopFire();
    }

    /**
     * Update the game (items position, ...)
     * @param elapsedTime Elapsed time from last update
     */
    update(elapsedTime: number)
    {
        this._wastes.forEach((waste) =>
        {
            waste.update(elapsedTime);
        });

        this._superGruik.update(elapsedTime);

        this.destroyWastes();
    }
}