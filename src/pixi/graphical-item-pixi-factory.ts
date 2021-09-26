class GraphicalItemPixiFactory implements GraphicalItemFactory
{
    //Layer where to append waste
    private _wastesLayer: PIXI.Container;
    public get wastesLayer(): PIXI.Container { return this._wastesLayer; }
    public set wastesLayer(value: PIXI.Container) { this._wastesLayer = value; }

    //Layer where to append SuperGruik
    private _superGruikLayer: PIXI.Container;
    public get superGruikLayer(): PIXI.Container { return this._superGruikLayer; }
    public set superGruikLayer(value: PIXI.Container) { this._superGruikLayer = value; }

    /**
     * Constructor
     * @param superGruikLayer Layer to create superGruik instances
     * @param wastesLayer Layer to create wastes instances
     */
    constructor(superGruikLayer: PIXI.Container, wastesLayer: PIXI.Container)
    {
        this._superGruikLayer = superGruikLayer;
        this._wastesLayer = wastesLayer;
    }

    /**
     * Creates new waste
     * @param type Type of the waste to create
     * @param coordinates Initial coordinates of the waste
     * @param rotation Initial angle of rotation of the waste
     */
    createWaste(type: WasteType, coordinates: { x: number; y: number; }, rotation: number, speed: number): Waste;
    createWaste(type: WasteType, coordinates: Coordinates, rotation: number, speed: number): Waste
    {
        switch (type)
        {
            case WasteType.FISH: return new WasteFishPixi(coordinates, rotation, speed, this.wastesLayer); break;
        }

        throw `Unknown waste type : ${type}`;
    }

    /**
     * Creates a superGruik
     * @param coordinates Initiales coordinates of superGruik
     */
    createSuperGruik(coordinates: { x: number; y: number; }): SuperGruik;
    createSuperGruik(coordinates: Coordinates): SuperGruik
    {
        return new SuperGruikPixi(coordinates, this.superGruikLayer);
    }
    
}