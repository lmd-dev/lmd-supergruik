﻿abstract class SuperGruik extends GraphicalItem
{
    //Supergruik's Power status
    private _power: number;
    public get power(): number { return this._power; }
    public set power(value: number) { this._power = value; }

    //SuperGruik moving speed
    private _speed: number;
    public get speed(): number { return this._speed; }
    public set speed(value: number) { this._speed = value; }

    //Is supergruik engaged with a target
    private _engaged: boolean;
    public get engaged(): boolean { return this._engaged; }
    public set engaged(value: boolean) { this._engaged = value; }

    //Coordinates of the target
    private _targetCoordinates: Coordinates | null;
    public get targetCoordinates(): Coordinates | null { return this._targetCoordinates; }
    public set targetCoordinates(value: Coordinates | null) { this._targetCoordinates = value; }

    /**
     * Constructor
     */
    constructor(coordinates: Coordinates)
    {
        super(coordinates, 0, "img/sprites/supergruik.png", 1);

        this._speed = 0;
        this._power = 100;
        this._engaged = false;
        this._targetCoordinates = null;
    }

    /**
     * Supergruik fires with its eyes on the target coordinates
     * @param targetCoordinates: Coordinates of the target to destroy
     */
    startFire(targetCoordinates: Coordinates)
    {
        if (this.power > 0)
        {
            this.engaged = true;
            this.targetCoordinates = new Coordinates(targetCoordinates);
        }
    }

    /**
     * Supergruik's eyes stop fire on the target
     */
    stopFire()
    {
        this.engaged = false;
        this.targetCoordinates = null;
    }

    /**
     * Updates SuperGruik's position
     * @param elapsedTime Elpased time from last update
     */
    update(elapsedTime: number)
    {
        this.coordinates.move({ x: 0, y: elapsedTime * this.speed });
    }
}