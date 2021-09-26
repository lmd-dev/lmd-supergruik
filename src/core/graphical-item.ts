abstract class GraphicalItem
{
    //2D coordinates of the graphical item
    private _coordinates: Coordinates;
    public get coordinates(): Coordinates { return this._coordinates; }

    //Rotation angle of the item
    private _rotation: number;
    public get rotation(): number { return this._rotation; }
    public set rotation(value: number) { this._rotation = value; }

    //Scale to apply to the sprite
    private _scale: number;
    public get scale(): number { return this._scale; }
    public set scale(value: number) { this._scale = value; }

    //URL of the sprite to use
    private _spriteURL: string;
    public get spriteURL(): string { return this._spriteURL; }
    public set spriteURL(value: string) { this._spriteURL = value; }

    /**
     * Constructor
     * @param coordinates Initial coordinates of the item
     * @param rotation Initial angle of rotation of the item
     * @param spriteURL URL of the sprite using to draw the item
     * @param scale Displaying scale of the item
     */
    constructor(coordinates: { x: number, y: number }, rotation: number, spriteURL: string, scale: number);
    constructor(coordinates: Coordinates, rotation: number, spriteURL: string, scale: number)
    {
        this._coordinates = new Coordinates(coordinates);
        this._rotation = rotation;
        this._spriteURL = spriteURL;
        this._scale = scale;
    }

    /**
     * What to do when the game is updates ?
     * @param elapsedTime ElpasedTime frm last update
     */
    abstract update(elapsedTime: number): void;

    /**
     * What to do on destroy ?
     */
    abstract destroy(): void;
}