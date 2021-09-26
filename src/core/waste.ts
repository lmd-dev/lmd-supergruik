abstract class Waste extends GraphicalItem
{
    //Value of the waste when destroyed
    private _value: number;
    public get value(): number { return this._value; }
    public set value(value: number) { this._value = value; }

    //Speed of the waste on the game area
    private _speed: number;
    public get speed(): number { return this._speed; }
    public set speed(value: number) { this._speed = value; }

    /**
     * Constructor
     * @param x Initial X coordinates of the item
     * @param y Initial Y coordinates of the item
     * @param lifePoints Initial life points of the item
     */
    constructor(coordinates: { x: number, y: number }, rotation: number, spriteURL: string, scale: number, value: number, speed: number)
    constructor(coordinates: Coordinates, rotation: number, spriteURL: string, scale: number, value: number, speed: number)
    {
        super(coordinates, rotation, spriteURL, scale);

        this._value = value;
        this._speed = speed;
    }

    /**
     * Updates waste coordinates
     * @param elapsedTime ElpasedTime frm last update
     */
    update(elapsedTime: number)
    {
        this.coordinates.move({ x: elapsedTime * -this._speed, y: 0 });
    }
}