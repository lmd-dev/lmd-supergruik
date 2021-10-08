class PixiTools
{
    /**
     * Converts a PIXI.Rectangle structure to a Shape
     * @param rect PIXI.Rectangle to convert
     */
    static PixiRectangleToShape(rect: PIXI.Rectangle): Shape
    {
        const shape = new Shape();

        const { top, bottom, left, right } = rect;

        shape.points.push(new Coordinates({ x: left, y: top }));
        shape.points.push(new Coordinates({ x: right, y: top }));
        shape.points.push(new Coordinates({ x: right, y: bottom }));
        shape.points.push(new Coordinates({ x: left, y: bottom }));
        shape.points.push(new Coordinates({ x: left, y: top }));

        return shape;
    }
}