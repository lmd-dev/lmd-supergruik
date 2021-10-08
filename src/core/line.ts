class Line
{
    private _a: number;
    public get a(): number { return this._a; };
    public set a(value: number) { this._a = value; };

    private _b: number;
    public get b(): number { return this._b; };
    public set b(value: number) { this._b = value; };

    private _constant: number;
    public get constant(): number { return this._constant; };
    public set constant(value: number) { this._constant = value; };

    private _vertical: boolean;
    public get vertical(): boolean { return this._vertical; };
    public set vertical(value: boolean) { this._vertical = value; };

	/**
	 * Constructor
	 */
	constructor()
	{
		this._a = 0;
		this._b = 0;
		this._constant = 0;
		this._vertical = false;
	}

	/**
	 * Defines a vertical line from its abcissa
	 */
	initVertical(val: number)
	{
		this.vertical = true;
		this.constant = val;
	}

	/**
	 * Defines a line from two points
	 */
	init2Points(pt1: ICoordinates, pt2: ICoordinates)
	{
		if (pt1.x == pt2.x)
		{
			this.initVertical(pt1.x);
		}
		else
		{
			this.vertical = false;
			this.a = (pt2.y - pt1.y) / (pt2.x - pt1.x);

			this.b = pt1.y - (this.a * pt1.x);
		}
	}

	/**
	 * Defines a non vertical line from a pooint and its slope
	 */
	initPointSlope(pt: ICoordinates, slope: number)
	{
		this.a = slope;
		this.b = pt.y - pt.x * slope;

		this.vertical = false;
	}

	/**
	 * Copies data from the given line
	 */
	copy(source: Line)
	{
		this.a = source.a;
        this.b = source.b;
        this.constant = source.constant;
        this.vertical = source.vertical;
	}

	//Returns the abscissa of a point situated on the line, from its ordinate
	getX(y: number): number
	{
		let valRet = 0.0;

		if (this.vertical)
			valRet = this.constant;
		else if (this.a != 0.0)
			valRet = (y - this.b) / this.a;

		return valRet;
	}

	//Returns the ordinate of a point situated on the line from its abscissa
	getY(x: number): number
	{
		let valRet = 0.0;

		if (this.vertical)
			valRet = 0.0;
		else
			valRet = this.a * x + this.b;

		return valRet;
	}

	//Indicates if the given point is on the line
	onTheLine(pt: ICoordinates): boolean
	{
		var valRet = false;

		if (this.vertical && pt.x == this.constant)
			valRet = true;
		else if (!this.vertical && pt.y == this.getY(pt.x))
			valRet = true;

		return valRet;
	}

	//Indicates if the given point is inside the segment defined by the given two points
	onTheSegment(ptSeg1: ICoordinates, ptSeg2: ICoordinates, pt: ICoordinates): boolean
	{
		var valRet = false;

		if (this.onTheLine(ptSeg1) && this.onTheLine(ptSeg2) && this.onTheLine(pt))
		{
			if (this.vertical)
			{
				valRet = pt.y >= Math.min(ptSeg1.y, ptSeg2.y) && pt.y <= Math.max(ptSeg1.y, ptSeg2.y);
			}
			else
			{
				valRet = pt.x >= Math.min(ptSeg1.x, ptSeg2.x) && pt.x <= Math.max(ptSeg1.x, ptSeg2.x);
			}
		}

		return valRet;
	}

	//Indicates if the line is parallel to the given one
	parallel(line: Line): boolean
	{
		var valRet = false;

		if (this.vertical == line.vertical)
		{
			if (this.vertical)
				valRet = true;
			else if (this.a == line.a)
				valRet = true;
		}

		return valRet;
	}

	/**
	 * Computes the coordinates of the intersection between the current line and the given one
	 * @param line Line to test
	 * @param pt Coordinates of the intersection to compute
	 * @return true if an intersection exists, false else
	 */
	intersectionLine(line: Line, pt: ICoordinates): boolean
	{
		if (this.parallel(line))
		{
			return false;
		}

		if (this.vertical)
		{
			pt.x = this.constant;
			pt.y = line.getY(pt.x);
		}
		else if (line.vertical)
		{
			pt.x = line.constant;
			pt.y = this.getY(pt.x);
		}
		else
		{
			pt.x = (line.b - this.b) / (this.a - line.a);
			pt.y = (line.a * this.b - this.a * line.b) / (line.a - this.a);
        }

		return true;
	}

	/**
	 * Computes the coordinates of the intersection of the current line with the given segment
	 * @param pt1 First point of the segment
	 * @param pt2 Second point of the segment
	 * @param ptInter Coordinates of the computed intersection
	 * @return true if an intersection exists, false else
	 */
	intersectionSegment(pt1: Coordinates, pt2: Coordinates, ptInter: Coordinates): boolean
	{
		let valRet = false;

        let Segment = new Line();
		Segment.init2Points(pt1, pt2);

		if (!this.vertical && !Segment.vertical && this.a == Segment.a && this.a == 0 && this.b == Segment.b)
		{
			valRet = true;
			ptInter.copy((pt1.x > pt2.x ? pt1 : pt2));
		}
		else if (this.intersectionLine(Segment, ptInter))
        {
            if (pt1.isEqual(ptInter) || pt2.isEqual(ptInter))
				valRet = true;
			else if ((pt1.x == pt2.x) || ptInter.x >= Math.min(pt1.x, pt2.x) && ptInter.x <= Math.max(pt1.x, pt2.x))
			{
				if (ptInter.y >= Math.min(pt1.y, pt2.y) && ptInter.y <= Math.max(pt1.y, pt2.y))
					valRet = true;
			}
		}
		return valRet;
	}
}

