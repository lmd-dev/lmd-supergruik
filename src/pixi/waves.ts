class Waves extends PIXI.Container
{
    // Parent PIXI application
    private _app: PIXI.Application;
    public get app(): PIXI.Application { return this._app; }

    //Points composing the shape of the wave
    private _wavePoints: Coordinates[];
    public get wavePoints(): Coordinates[] { return this._wavePoints; }

    //Width in pixels representing a period of cosinus wave
    private _cosinusWidth: number;
    public get cosinusWidth(): number { return this._cosinusWidth; }
    public set cosinusWidth(value: number) { this._cosinusWidth = value; }

    //Horizontal offset speed
    private _offsetSpeed: number;
    public get offsetSpeed(): number { return this._offsetSpeed; }
    public set offsetSpeed(value: number) { this._offsetSpeed = value; }

    //Vertical amplitude of the wave
    private _waveAmplitude: number;
    public get waveAmplitude(): number { return this._waveAmplitude; }
    public set waveAmplitude(value: number) { this._waveAmplitude = value; }

    //Accumulate value of the offset on the time
    private _waveOffset: number;

    //PIXI graphics used to display the first wave
    private _wave1: PIXI.Graphics;

    //PIXI graphics used to display the second wave
    private _wave2: PIXI.Graphics;

    /**
     * Constructor
     * @param app Parent PIXI application
     * @param cosinusWidth Width in pixels representing a period of cosinus wave
     * @param waveAmplitude Vertical amplitude of the wave
     * @param offsetSpeed Horizontal offset speed
     */
    constructor(app: PIXI.Application, cosinusWidth: number, waveAmplitude: number, offsetSpeed: number)
    {
        super();

        this._app = app;
        this._wavePoints = [];
        this._cosinusWidth = cosinusWidth;
        this._waveAmplitude = waveAmplitude;
        this._offsetSpeed = offsetSpeed;
        this._waveOffset = 0;

        this._wave1 = new PIXI.Graphics();
        this._wave2 = new PIXI.Graphics();

        this.addChild(this._wave1);
        this.addChild(this._wave2);
    }

    /**
     * Updates the drawing of waves
     */
    update(elapsedTime: number)
    {
        this.buildWavePoints(elapsedTime);

        this.buildWaveLine(this._wave1, 0);
        this.buildWaveLine(this._wave2, -250);

    }

    /**
     * Builds points array of the wave
     * @param elapsedTime Elpased time from the last update
     */
    private buildWavePoints(elapsedTime: number)
    {
        const offset = -this._offsetSpeed * elapsedTime;
        this._waveOffset -= offset;

        let indexLess0: number | null = null;

        this.wavePoints.forEach((point, index) =>
        {
            point.move({ x: offset, y: 0 });

            if (point.x >= 0 && indexLess0 === null)
                indexLess0 = Math.max(0, index - 1);
        });

        if (indexLess0 !== null)
            this.wavePoints.splice(0, indexLess0);

        let x = this.wavePoints.length ? this.wavePoints[this.wavePoints.length - 1].x + 5 : 0;

        while (x < this.app.renderer.width + 300)
        {
            this.wavePoints.push(new Coordinates({ x: x, y: Math.cos((((x + this._waveOffset) % this.cosinusWidth) / this.cosinusWidth) * (2 * Math.PI)) * this.waveAmplitude }));

            x += 5;
        }
    }

    /**
     * Create the PIXI graphics representing the wave
     * @param wave PIXI Graphics to used
     * @param xOffset Horizontal offset
     */
    private buildWaveLine(wave: PIXI.Graphics, xOffset: number)
    {
        wave.clear();

        wave.lineStyle(30, 0xFFFFFF, 0.4);
        wave.beginFill(0x0000FF, 0.7);
        this.wavePoints.forEach((point, index) =>
        {
            if (index === 0)
                wave.moveTo(point.x + xOffset, point.y + Math.sin((this._waveOffset - xOffset) / 50) * 25);
            else
                wave.lineTo(point.x + xOffset, point.y + Math.sin((this._waveOffset - xOffset) / 50) * 25);
        });

        wave.lineTo(this.app.renderer.width, -100);
        wave.lineTo(0, -100);
        wave.endFill();
    }
}