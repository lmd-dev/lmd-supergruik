abstract class WasteFish extends Waste
{
    /**
     * Constructor
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     * @param speed Initial speed of the waste
     */
    constructor(coordinates: { x: number, y: number }, rotation: number, speed: number);
    constructor(coordinates: Coordinates, rotation: number, speed: number)
    {
        super(coordinates, rotation, "img/sprites/waste-fish.png", 0.2, 100, speed);
    }
}