abstract class SuperGruik extends GraphicalItem
{
    //Supergruik's Power status
    private _power: number;
    public get power(): number { return this._power; }

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

        this._speed = 0;
        this._power = 100;
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
        if (this.power > 0)
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
}