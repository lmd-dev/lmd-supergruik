abstract class WasteFish extends Waste
{
    /**
     * Constructor
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     * @param speed Initial speed of the waste
     */
    constructor(coordinates: ICoordinates, rotation: number, speed: number)
    {
        super(coordinates, rotation, "img/sprites/waste-fish.png", 0.2, 100, speed);

        this.addSound("sounds/plop-1.mp3");
    }
}