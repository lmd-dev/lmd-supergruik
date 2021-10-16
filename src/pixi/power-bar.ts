class PowerBar extends PIXI.Container
{
    //Parent PIXI Application
    private _app: PIXI.Application;
    public get app(): PIXI.Application { return this._app; }

    //Width of the bar
    private _clientWidth: number;
    public get clientWidth(): number { return this._clientWidth; }
    public set clientWidth(value: number) { this._clientWidth = value; }

    //Height of hte bar
    private _clientHeight: number;
    public get clientHeight(): number { return this._clientHeight; }
    public set clientHeight(value: number) { this._clientHeight = value; }

    //Is the power overloaded
    private _isOverloaded: boolean;
    public get isOverloaded(): boolean { return this._isOverloaded; }
    public set isOverloaded(value: boolean) { this._isOverloaded = value; }

    //Amount of power to display
    private _powerValue: number;
    public get powerValue(): number { return this._powerValue; }
    public set powerValue(value: number) { if (value >= 0 && value <= 100) this._powerValue = value; }

    //PIXI Graphics used for the back of the bar
    private _powerBack: PIXI.Graphics;

    //PIXI graphics used for the front of the bar
    private _powerFront: PIXI.Graphics;

    /**
     * Constructor
     * @param app Parent PIXI application
     * @param width Width of the bar
     * @param height Height of the bar
     * @param isOverloaded Initial overloading status
     * @param powerValue Initial power value
     */
    constructor(app: PIXI.Application, width: number, height: number, isOverloaded: boolean, powerValue: number)
    {
        super();

        this._app = app;
        this._clientWidth = width;
        this._clientHeight = height;
        this._isOverloaded = isOverloaded;
        this._powerValue = powerValue;

        this._powerBack = new PIXI.Graphics();
        this._powerBack.beginFill(0xFFFFFF);
        this._powerBack.drawRect(0, 0, this._clientWidth, this._clientHeight);
        this._powerBack.endFill();
        this.addChild(this._powerBack);

        this._powerFront = new PIXI.Graphics();
        this.addChild(this._powerFront);
    }

    /**
     * Updates the drawing of the power bar
     */
    update()
    {
        this._powerFront.clear();

        if (this.isOverloaded)
            this._powerFront.beginFill(0xFF0000);
        else
            this._powerFront.beginFill(0x4691FF);

        this._powerFront.drawRect(2, 2, (this._clientWidth - 4) * (this.powerValue / 100.0), this._clientHeight - 4);
    }
}