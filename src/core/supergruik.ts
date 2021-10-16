abstract class SuperGruik extends GraphicalItem
{
    private _life: number;
    public get life(): number { return this._life; }

    private readonly _powerSpeed = 10;

    //Supergruik's Power status
    private _power: number;
    public get power(): number { return this._power; }

    private _overloaded: boolean;
    public get overloaded(): boolean { return this._overloaded; }

    //SuperGruik moving speed
    private _speed: number;
    public get speed(): number { return this._speed; }
    public set speed(value: number) { this._speed = value; }

    //Is supergruik engaged with a target
    private _engaged: boolean;
    public get engaged(): boolean { return this._engaged; }

    //Coordinates of the target
    private _targetCoordinates: Coordinates | null;
    public get targetCoordinates(): Coordinates | null { return this._targetCoordinates; }

    //Sound played when lasers are enabled
    private _laserSound: HTMLAudioElement;

    /**
     * Constructor
     * @param coordinates: Initial coordinates of SuperGruik
     */
    constructor(coordinates: ICoordinates)
    {
        super(coordinates, 0, "img/sprites/supergruik.png", 1);

        this._life = 3;
        this._speed = 0;
        this._power = 100;
        this._overloaded = false;
        this._engaged = false;
        this._targetCoordinates = null;

        this._laserSound = document.createElement("audio");
        this._laserSound.src = "sounds/laser.mp3";
        this._laserSound.preload = "auto";
    }

    /**
     * Supergruik fires with its eyes on the target coordinates
     * @param targetCoordinates: Coordinates of the target to destroy
     */
    startFire(targetCoordinates: ICoordinates)
    {
        if (this.power > 0 && !this.overloaded)
        {
            this._targetCoordinates = new Coordinates(targetCoordinates);

            if (!this._engaged)
            {
                this._engaged = true;
                this._laserSound.currentTime = 0;
                this._laserSound.play();
            }
        }
    }

    /**
     * Supergruik's eyes stop fire on the target
     */
    stopFire()
    {
        this._engaged = false;
        this._targetCoordinates = null;
        this._laserSound.pause();
    }

    /**
     * Updates SuperGruik's position
     * @param elapsedTime Elpased time from last update
     */
    update(elapsedTime: number)
    {
        this.coordinates.move({ x: 0, y: elapsedTime * this.speed });

        if (this.engaged)
        {
            this._power = Math.max(0, this._power - elapsedTime * this._powerSpeed);

            if (this._power === 0)
            {
                this.stopFire();
                this._overloaded = true;
            }
        }
        else
        {
            if (this._power < 100)
            {
                this._power = Math.min(100, this._power + elapsedTime * this._powerSpeed);

                if (this._power === 100)
                    this._overloaded = false;
            }
        }
    }

    /**
     * Returns the coordinates of the SupuerGruik eyes
     */
    public getEyesCoordinates(): { left: ICoordinates, right: ICoordinates }
    {
        const { x, y } = this.coordinates;

        return {
            left: new Coordinates({ x: x + 163 * this.scale, y: y + 41 * this.scale }),
            right: new Coordinates({ x: x + 163 * this.scale, y: y + 64 * this.scale })
        }
    }

    /**
     * Hits SuperGruik and removes him one point of life
     */
    public hit()
    {
        this._life = Math.max(0, this._life - 1);
    }
}