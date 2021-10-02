interface GraphicalItemFactory
{
    /**
     * Creates new waste
     * @param type Type of the waste to create
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     */
    createWaste(type: WasteType, coordinates: ICoordinates, rotation: number, speed: number): Waste;

    /**
     * Creates a superGruik
     * @param coordinates Initiales coordinates of superGruik
     */
    createSuperGruik(coordinates: ICoordinates): SuperGruik;
}