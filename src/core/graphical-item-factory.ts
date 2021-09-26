interface GraphicalItemFactory
{
    /**
     * Creates new waste
     * @param type Type of the waste to create
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     */
    createWaste(type: WasteType, coordinates: { x: number, y: number }, rotation: number, speed: number): Waste;
    createWaste(type: WasteType, coordinates: Coordinates, rotation: number, speed: number): Waste;

    /**
     * Creates a superGruik
     * @param coordinates Initiales coordinates of superGruik
     */
    createSuperGruik(coordinates: { x: number, y: number }): SuperGruik;
    createSuperGruik(coordinates: Coordinates): SuperGruik;
}