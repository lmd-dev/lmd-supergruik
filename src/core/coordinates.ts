interface ICoordinates
{
    x: number;
    y: number;
}

class Coordinates implements ICoordinates
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
    constructor(coordinates: ICoordinates)
    {
        this._x = coordinates.x;
        this._y = coordinates.y;
    }

    /**
     * Moves the coordinates from vector values
     * @param vector Vector to use to move the coordinates
     */
    move(vector: ICoordinates): void
    {
        this.x += vector.x;
        this.y += vector.y;
    }

    /**
     * Copies data from the given coordinates
     * @param coordinates Coordinates to copy
     */
    copy(coordinates: ICoordinates)
    {
        this.x = coordinates.x;
        this.y = coordinates.y;
    }

    /**
     * Rotates the point
     * @param center Center of the rotation
     * @angleZ Angle of rotation in radians
     */
    rotate(center: ICoordinates, angleZ: number)
    {
        //Changement de repere :
        this.move(new Coordinates({ x: -center.x, y: -center.y }));

        var temp = new Coordinates({ x: 0, y: 0 });
        temp.copy(this);

        //Rotation sur Z :
        if (angleZ != 0)
        {
            temp.x = this.x * Math.cos(angleZ) - this.y * Math.sin(angleZ);
            temp.y = this.x * Math.sin(angleZ) + this.y * Math.cos(angleZ);
            this.copy(temp);
        }

        //Retoure au repere d'origine
        this.move(new Coordinates({ x: center.x, y: center.y }));
    }

    /**
     * Indicates if the current coordinates is equal to the given one
     * @param coordinates
     */
    isEqual(coordinates: ICoordinates)
    {
        return (this.x == coordinates.x && this.y == coordinates.y)
    }
}