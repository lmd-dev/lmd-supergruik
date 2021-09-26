class SuperGruikApp
{
    private _controllerGame: ControllerGame;
    private _viewGame: ViewGame;    

    /**
     * Constructor
     */
    constructor()
    {
        this._controllerGame = new ControllerGame();

        this._viewGame = new ViewGame(this._controllerGame);
    }
}

/**
 * Entry point of the application
 */
window.addEventListener("load", () => {
    const app = new SuperGruikApp();
})