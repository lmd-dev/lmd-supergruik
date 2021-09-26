class SuperGruikPixi extends SuperGruik
{
    //Pixi Layer for SuperGruik items (sprite and lasers) 
    private _parent: PIXI.Container;
    public get parent(): PIXI.Container { return this._parent; }
    public set parent(value: PIXI.Container) { this._parent = value; }

    private _container: PIXI.Container;
    public get container(): PIXI.Container { return this._container; }
    public set container(value: PIXI.Container) { this._container = value; }

    //Loaded sprite for SuperGruik
    private _sprite: PIXI.Sprite;
    public get sprite(): PIXI.Sprite { return this._sprite; }
    public set sprite(value: PIXI.Sprite) { this._sprite = value; }

    private _laserContainer: PIXI.Container;
    public get laserContainer(): PIXI.Container { return this._laserContainer; }
    public set laserContainer(value: PIXI.Container) { this._laserContainer = value; }

    //Laser from the left eye of SuperGruik
    private _leftLaser: PIXI.Container | null;
    public get leftLaser(): PIXI.Container | null { return this._leftLaser; }
    public set leftLaser(value: PIXI.Container | null) { this._leftLaser = value; }

    //Laser from the right eye of SuperGruik
    private _rightLaser: PIXI.Container | null;
    public get rightLaser(): PIXI.Container | null { return this._rightLaser; }
    public set rightLaser(value: PIXI.Container | null) { this._rightLaser = value; }

    /**
     * Constructor
     * @param coordinates Initial coordinates of SuperGruik
     * @param parent PIXI layer where SuperGruik has to be drawn
     */
    constructor(coordinates: { x: number, y: number }, parent: PIXI.Container);
    constructor(coordinates: Coordinates, parent: PIXI.Container)
    {
        super(coordinates);

        this._parent = parent;
        this._container = new PIXI.Container();

        this._sprite = PIXI.Sprite.from(this.spriteURL);
        this._sprite.scale.set(this.scale, this.scale);
        this.container.addChild(this.sprite);

        this._laserContainer = new PIXI.Container();
        this.container.addChild(this.laserContainer);

        this._rightLaser = null;
        this._leftLaser = null;

        this.parent.addChild(this.container);
    }

    /**
     * Updates the position of the sprite and lasers on game update
     * @param elapsedTime ElapsedTime from last update
     */
    update(elapsedTime: number)
    {
        super.update(elapsedTime);

        this.sprite.x = this.coordinates.x;
        this.sprite.y = this.coordinates.y;

        this.updateLasers();
    }

    /**
     * Updates lasers
     */
    private updateLasers()
    {
        this.removeLasers();

        if (this.engaged && this.targetCoordinates)
        {
            const eyesCoordinates = this.getEyesCoordinates();

            this.leftLaser = new PIXI.Container();
            this.createLaser(eyesCoordinates.left, this.targetCoordinates).forEach((item) =>
            {
                this.leftLaser?.addChild(item);
            });

            this.rightLaser = new PIXI.Container();
            this.createLaser(eyesCoordinates.right, this.targetCoordinates).forEach((item) =>
            {
                this.rightLaser?.addChild(item);
            });

            this.laserContainer.addChild(this.leftLaser);
            this.laserContainer.addChild(this.rightLaser);
        }
    }

    /**
     * Removes lasers from the scene
     */
    private removeLasers()
    {
        if (this.leftLaser)
        {
            this._laserContainer.removeChild(this.leftLaser);
            this.leftLaser = null
        }

        if (this.rightLaser)
        {
            this._laserContainer.removeChild(this.rightLaser);
            this.rightLaser = null
        }
    }

    /**
     * Creates laser items
     * @param from First coordinates of the laser
     * @param to Last coordinates of the laser
     */
    private createLaser(from: Coordinates, to: Coordinates): PIXI.DisplayObject[]
    {
        const items: PIXI.DisplayObject[] = [];

        const laserBlur = new PIXI.Graphics();
        laserBlur.lineStyle(3, 0xFF0000).moveTo(from.x, from.y).lineTo(to.x, to.y);
        laserBlur.filters = [new PIXI.filters.BlurFilter(3), new PIXI.filters.NoiseFilter(1.5, Math.random() * 100)];
        items.push(laserBlur);

        const laserCore = new PIXI.Graphics();
        laserCore.lineStyle(1, 0xAAAA00).moveTo(from.x, from.y).lineTo(to.x, to.y);
        items.push(laserCore);

        return items;
    }

    /**
     * Returns the coordinates of the SupuerGruik eyes
     */
    private getEyesCoordinates(): { left: Coordinates, right: Coordinates }
    {
        const { x, y } = this.coordinates;

        return {
            left: new Coordinates({ x: x + 163 * this.scale, y: y + 41 * this.scale }),
            right: new Coordinates({ x: x+ 163 * this.scale, y: y + 64 * this.scale})
        }
    }

    /**
     * Destroyes SuperGruik from the PIXI scene
     */
    destroy()
    {
        this.parent.removeChild(this.container);
    }
}