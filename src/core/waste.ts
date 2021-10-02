abstract class Waste extends GraphicalItem
{
    //Value of the waste when destroyed
    private _value: number;
    public get value(): number { return this._value; }

    //Speed of the waste on the game area
    private _speed: number;
    public get speed(): number { return this._speed; }
    public set speed(value: number) { this._speed = value; }

    //Sounds playable by the waste on destruction
    private _sounds: HTMLAudioElement[];
    public get sounds(): HTMLAudioElement[] { return this._sounds; }

    /**
     * Constructor
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     * @param spriteURL URL of the sprite using to draw the waste
     * @param scale Displaying scale of the waste
     * @param value Value of the waste
     * @param speed Initial speed of the waste
     */
    constructor(coordinates: ICoordinates, rotation: number, spriteURL: string, scale: number, value: number, speed: number)
    {
        super(coordinates, rotation, spriteURL, scale);

        this._value = value;
        this._speed = speed;
        this._sounds = [];
    }

    /**
     * Adds sound file to the sounds collection
     * @param fileName Path to the file to append
     */
    addSound(fileName: string)
    {
        const sound = document.createElement("audio");
        sound.src = fileName;
        sound.preload = "auto";

        this._sounds.push(sound);
    }

    /**
     * Updates waste coordinates
     * @param elapsedTime ElpasedTime frm last update
     */
    update(elapsedTime: number)
    {
        this.coordinates.move({ x: elapsedTime * -this._speed, y: 0 });
    }

    /**
     * Called when the waste is destroyed
     */
    destroy()
    {
        if (this.sounds.length)
        {
            const iSound = Math.floor(Math.random() * this.sounds.length);

            this.sounds[iSound].play();
        }
    }
}