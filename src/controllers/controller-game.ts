/**
 * Constroller responsible for the game
 */
class ControllerGame extends Notifier
{
    //SuperGruikGame instance
    private _game: Game | null;
    private get game(): Game | null { return this._game; }

    /**
     * Constructor
     */
    constructor()
    {
        super();

        this._game = null;
    }

    /**
     * Starts a new game
     * @param graphicalItemFactory Factory to use to create graphical items
     * @param gameAreaWidth Width of the game area
     * @param gameAreaHeight Height of the game area
     */
    startGame(graphicalItemFactory: GraphicalItemFactory, gameAreaWidth: number, gameAreaHeight: number)
    {
        this._game = new Game(graphicalItemFactory);
        this._game.start(gameAreaWidth, gameAreaHeight);
    }

    /**
     * Updates games status
     * @param elpasedTime Elapsed time from the last update
     */
    updateGame(elapsedTime: number)
    {
        this.game?.update(elapsedTime);
    }

    /**
     * Moves SuperGruik to the top of the game area
     */
    moveUpSuperGruik()
    {
        this.game?.moveSuperGruikUp();
    }

    /**
     * Moves SuperGruik to the bottom of the game area
     */
    moveDownSuperGruik()
    {
        this.game?.moveSuperGruikDown();
    }

    /**
     * Stops moving SuperGRuik
     */
    stopSuperGruik()
    {
        this.game?.stopSuperGruik();
    }

    /**
     * SuperGruik engages the target at the given coordinates
     */
    startFire(coordinates: ICoordinates)
    {
        this.game?.startFire(coordinates);
    }

    /**
     * Updates the position of the target to engage
     * @param coordinates New coordinates of the target
     */
    updateFire(coordinates: ICoordinates)
    {
        if(this.game?.isSuperGruikEngaged())
        this.game?.updateFire(coordinates);
    }

    /**
     * SuperGruik stops fire the target
     */
    stopFire()
    {
        this.game?.stopFire();
    }

    /**
     * Returns the Supergruik's remainnig amount of power
     */
    getSuperGruikPowerValue(): number
    {
        return this.game?.getSuperGruikPowerValue() ?? 0;
    }

    /**
     * Indicates if Supergruik's eyes are overloaded
     */
    isSuperGruikOverloaded(): boolean
    {
        return this.game?.isSuperGruikOverloaded() ?? false;
    }

    /**
     * Returns the moving speed of the waste on the beach
     */
    getWasteSpeed(): number
    {
        return this.game?.wasteSpeed ?? 0;
    }

    /**
     * Returns the Supergruik's remaining points of life
     */
    getSuperGruikLife(): number
    {
        return this.game?.getSuperGruikLife() ?? 0;
    }

    /**
     * Returns the score of the player
     */
    getScore(): number
    {
        return this.game?.score ?? 0;
    }
}