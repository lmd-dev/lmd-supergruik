class Coordinates
{
    //X coordinates
    private _x: number;
    public get x(): number { return this._x; }
    public set x(value: number) { this._x = value; }

    //Y coordinates
    private _y: number;
    public get y(): number { return this._y; }
    public set y(value: number) { this._y = value; }

    /**
     * Constructor
     * @param coordinates Initial values of the coodinates
     */
    constructor(coordinates: { x: number, y: number });
    constructor(coordinates: Coordinates)
    {
        this._x = coordinates.x;
        this._y = coordinates.y;
    }

    /**
     * oves the coordinates from vector values
     * @param vector Vector to use to move the coordinates
     */
    move(vector: { x: number, y: number }): void;
    move(vector: Coordinates): void
    {
        this.x += vector.x;
        this.y += vector.y;
    }
}