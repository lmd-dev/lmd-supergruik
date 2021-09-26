class WasteFishPixi extends WasteFish
{
    //Loaded sprite from Pixi
    private _sprite: PIXI.Sprite;
    public get sprite(): PIXI.Sprite { return this._sprite; }
    public set sprite(value: PIXI.Sprite) { this._sprite = value; }

    //Parent of the PIXI Sprite
    private _parent: PIXI.Container;
    public get parent(): PIXI.Container { return this._parent; }
    public set parent(value: PIXI.Container) { this._parent = value; }

    /**
     * Constructor
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     */
    constructor(coordinates: { x: number, y: number }, rotation: number, speed: number, parent: PIXI.Container);
    constructor(coordinates: Coordinates, rotation: number, speed: number, parent: PIXI.Container)
    {
        super(coordinates, rotation, speed);

        this._parent = parent;
        this._sprite = PIXI.Sprite.from(this.spriteURL);
        this.sprite.scale.set(this.scale, this.scale);
        this.sprite.rotation = this.rotation;

        this.parent.addChild(this.sprite);
    }

    /**
     * Updates coordinates of the sprite
     * @param elapsedTime Elapsed time from last update
     */
    update(elapsedTime: number)
    {
        super.update(elapsedTime);

        this.sprite.x = this.coordinates.x;
        this.sprite.y = this.coordinates.y;
    }

    /**
     * Destroyes the waste from the PIXI scene
     */
    destroy()
    {
        this.parent.removeChild(this.sprite);
    }
}