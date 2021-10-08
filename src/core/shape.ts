class Shape
{
    //Points defining the path of the shape
    private _points: Coordinates[];
    public get points(): Coordinates[] { return this._points; }

    /**
     * Constructor
     */
    constructor()
    {
        this._points = [];
    }

    /**
     * Indicates if the given point is contains inside the shape
     * @param point Coordinates to test
     */
    contains(point: ICoordinates): boolean
    {
        let intersections = 0;

        const ray = new Line();
        ray.initPointSlope(point, 0);

        const intersection = new Coordinates({ x: 0, y: 0 });

        for (let i = 0; i < this.points.length - 1; ++i)
        {
            if (
                ray.intersectionSegment(this.points[i], this.points[i + 1], intersection) &&
                intersection.x >= point.x
            )
            {
                ++intersections;
            }
        }

        return (intersections & 1) === 1;
    }
}