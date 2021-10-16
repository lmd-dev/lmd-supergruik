class LifeBar extends PIXI.Container
{
    //Parent PIXI application
    private _app: PIXI.Application;
    public get app(): PIXI.Application { return this._app; }

    //Radius of circles representing points of life
    private _radius: number;
    public get radius(): number { return this._radius; }
    public set radius(value: number) { this._radius = value; }

    //Points of life to display
    private _pointsOfLife: number;
    public get pointsOfLife(): number { return this._pointsOfLife; }
    public set pointsOfLife(value: number) { this._pointsOfLife = value; }

    /**
     * Constructor
     * @param app Parent PIXI Application
     * @param radius Radius of the circle representing points of life
     * @param pointsOfLife Points of life to display
     */
    constructor(app: PIXI.Application, radius: number, pointsOfLife: number)
    {
        super();

        this._app = app;
        this._radius = radius;
        this._pointsOfLife = pointsOfLife;
    }

    /**
     * Updates the drawing of the life bar
     */
    update()
    {
        if (this.children.length < this.pointsOfLife)
        {
            for (let i = this.children.length; i < this.pointsOfLife; ++i)
            {
                const circle = new PIXI.Graphics();
                circle.beginFill(0xFF0000);
                circle.drawCircle(i * (this.radius * 2 + 10), 0, this.radius);
                circle.endFill();

                this.addChild(circle);
            }
        }
        else if(this.children.length > this.pointsOfLife)
        {
            this.removeChildren(this.pointsOfLife);
        }
    }
}