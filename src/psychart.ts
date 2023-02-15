import { Color } from './color';
import { JMath } from './jmath';
import { PsyState } from './psystate';
import { PsyOptions, Datum, Layout, Point, Region, StyleOptions } from './types';

const NS = 'http://www.w3.org/2000/svg';

export class Psychart {
    /**
     * Defines the string representations of the current unit system.
     */
    private readonly units = {
        temp: '',
        hr: '',
        vp: '',
        h: '',
        v: '',
    };
    /**
     * Defines the base element to attach to the viewing window.
     */
    private readonly base: SVGElement = document.createElementNS(NS, 'svg');
    /**
     * Defines all the groups in the SVG ordered by layer.
     */
    private readonly g = {
        regions: document.createElementNS(NS, 'g'),
        axes: document.createElementNS(NS, 'g'),
        text: document.createElementNS(NS, 'g'),
        trends: document.createElementNS(NS, 'g'),
        points: document.createElementNS(NS, 'g'),
        tooltips: document.createElementNS(NS, 'g'),
    };
    /**
     * Layout settings for Psychart.
     */
    private readonly layout = {} as Layout;
    /**
     * Configuration options for Psychart.
     */
    private readonly config = {} as PsyOptions;
    /**
     * Styling options for Psychart.
     */
    private readonly style = {} as StyleOptions;
    /**
     * Gradient source: https://waldyrious.net/viridis-palette-generator/
     */
    private readonly gradients = {
        viridis: [
            new Color(253, 231, 37),
            new Color(94, 201, 98),
            new Color(33, 145, 140),
            new Color(59, 82, 139),
            new Color(68, 1, 84),
        ],
        inferno: [
            new Color(252, 255, 164),
            new Color(249, 142, 9),
            new Color(188, 55, 84),
            new Color(87, 16, 110),
            new Color(0, 0, 4),
        ],
        magma: [
            new Color(252, 253, 191),
            new Color(252, 137, 97),
            new Color(183, 55, 121),
            new Color(81, 18, 124),
            new Color(0, 0, 4),
        ],
        plasma: [
            new Color(240, 249, 33),
            new Color(248, 149, 64),
            new Color(204, 71, 120),
            new Color(126, 3, 168),
            new Color(13, 8, 135),
        ],
    };
    /**
     * Predefined regions source: 2021 Equipment Thermal Guidelines for Data Processing Environments
     */
    private readonly regions: { [index: string]: Region } = {
        dca4: {
            tooltip: 'Data center A4\nASHRAE comfort zone',
            data: [
                { db: 5, dp: -12 },
                { db: 22.5, rh: 0.08 },
                { db: 45.0, rh: 0.08 },
                { db: 45.0, dp: 24 },
                { db: 25.8, rh: 0.90 },
                { db: 5, rh: 0.90 },
            ],
        },
        dca3: {
            tooltip: 'Data center A3\nASHRAE comfort zone',
            data: [
                { db: 5, dp: -12 },
                { db: 22.5, rh: 0.08 },
                { db: 40.0, rh: 0.08 },
                { db: 40.0, dp: 24 },
                { db: 26.7, rh: 0.85 },
                { db: 5, rh: 0.85 },
            ],
        },
        dca2: {
            tooltip: 'Data center A2\nASHRAE comfort zone',
            data: [
                { db: 10.0, dp: -12 },
                { db: 22.5, rh: 0.08 },
                { db: 35.0, rh: 0.08 },
                { db: 35.0, dp: 21 },
                { db: 24.7, rh: 0.80 },
                { db: 10.0, rh: 0.80 },
            ],
        },
        dca1: {
            tooltip: 'Data center A1\nASHRAE comfort zone',
            data: [
                { db: 15.0, dp: -12 },
                { db: 22.5, rh: 0.08 },
                { db: 32.0, rh: 0.08 },
                { db: 32.0, dp: 17 },
                { db: 20.6, rh: 0.80 },
                { db: 15.0, rh: 0.80 },
            ],
        },
        dclo: {
            tooltip: 'Recommended ASHRAE data center\nconditions for low levels of pollutants',
            data: [
                { db: 18.0, dp: -9 },
                { db: 27.0, dp: -9 },
                { db: 27.0, dp: 15 },
                { db: 20.7, rh: 0.70 },
                { db: 18.0, rh: 0.70 },
            ],
        },
        dchi: {
            tooltip: 'Recommended ASHRAE data center\nconditions for high levels of pollutants',
            data: [
                { db: 18.0, dp: -9 },
                { db: 27.0, dp: -9 },
                { db: 27.0, dp: 15 },
                { db: 26.2, rh: 0.50 },
                { db: 18.0, rh: 0.50 },
            ],
        },
    };
    /**
     * The last state plotted on Psychart.
     */
    private lastState: PsyState;
    /**
     * Construct a new instance of `Psychart` given various configuration properties.
     */
    constructor(layout: Layout, config: PsyOptions, style: StyleOptions) {
        // Set internal variables.
        this.layout = layout;
        this.config = config;
        this.style = style;
        // Compute a first-time initialization of psychrolib
        PsyState.initialize(layout, config);
        // Set the chart's viewport size.
        this.base.setAttribute('viewBox', '0 0 ' + this.layout.size.x + ' ' + this.layout.size.y);
        // Sets the displayed units based on the unit system.
        this.units.temp = '\u00B0' + (this.config.unitSystem === 'IP' ? 'F' : 'C');
        this.units.hr = (this.config.unitSystem === 'IP' ? 'lbw/lba' : 'kgw/kga');
        this.units.vp = (this.config.unitSystem === 'IP' ? 'Psi' : 'Pa');
        this.units.h = (this.config.unitSystem === 'IP' ? 'Btu/lb' : 'J/kg');
        this.units.v = (this.config.unitSystem === 'IP' ? 'ft\u00B3/lb' : 'm\u00B3/kg');
        // Convert regions to the IP unit system if applicable
        if (this.config.unitSystem === 'IP') {
            for (let region in this.regions) {
                this.regions[region].data.forEach(datum => {
                    datum.db = JMath.CtoF(datum.db);
                    if ('wb' in datum) {
                        datum.wb = JMath.CtoF(datum.wb);
                    } else if ('dp' in datum) {
                        datum.dp = JMath.CtoF(datum.dp);
                    }
                });
            }
        }
        // Create new SVG groups, and append all the
        // layers into the chart.
        for (let groupName in this.g) {
            this.base.appendChild(this.g[groupName]);
        }
        // Draw constant dry bulb vertical lines.
        for (let db = this.config.dbMin; db <= this.config.dbMax; db += this.style.major) {
            const data: PsyState[] = [];
            // The lower point is on the X-axis (rh = 0%)
            data.push(new PsyState({ db: db, rh: 0 }));
            // The upper point is on the saturation line (rh = 100%)
            data.push(new PsyState({ db: db, rh: 1 }));
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(db + this.units.temp, data[0], TextAnchor.N, 'Dry Bulb');
        }
        // Draw constant dew point horizontal lines.
        for (let dp = 0; dp <= this.config.dpMax; dp += this.style.major) {
            const data: PsyState[] = [];
            // The left point is on the saturation line (db = dp)
            data.push(new PsyState({ db: dp, dp: dp }));
            // The right point is at the maximum dry bulb temperature
            data.push(new PsyState({ db: this.config.dbMax, dp: dp }));
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(dp + this.units.temp, data[1], TextAnchor.W, 'Dew Point');
        }
        // Draw constant wet bulb diagonal lines.
        for (let wb = this.config.dbMin; wb <= this.config.dpMax; wb += this.style.major) {
            const data: PsyState[] = [];
            // Dry bulb is always equal or greater than wet bulb.
            for (let db = wb; db <= this.config.dbMax; db += this.style.resolution) {
                data.push(new PsyState({ db: db, wb: wb }));
            }
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(wb + this.units.temp, data[0], TextAnchor.SE, 'Wet Bulb');
        }
        // Draw constant relative humidity lines.
        for (let rh = 0; rh <= 100; rh += this.style.major) {
            const data: PsyState[] = [];
            let preferredAnchor: TextAnchor = TextAnchor.NE;
            // Must iterate through all dry bulb temperatures to calculate each Y-coordinate
            for (let db = this.config.dbMin; db <= this.config.dbMax; db += this.style.resolution) {
                data.push(new PsyState({ db: db, rh: rh / 100 }));
                // Stop drawing when the line surpasses the bounds of the chart
                if (data[data.length - 1].dp >= this.config.dpMax) {
                    preferredAnchor = TextAnchor.S;
                    break;
                }
            }
            // Draw the axis and the label
            this.drawAxis(data);
            if (rh > 0 && rh < 100) {
                this.drawLabel(rh + '%', data[data.length - 1], preferredAnchor, 'Relative Humidity');
            }
        }
    }
    /**
     * Draw an axis line given an array of psychrometric states.
     */
    private drawAxis(data: PsyState[]): void {
        this.g.axes.appendChild(this.createLine(data, this.style.lineColor, 1.0));
    }
    /**
     * Create a line to append onto a parent element.
     */
    private createLine(data: PsyState[], color: Color, weight: number): SVGPathElement {
        const line = document.createElementNS(NS, 'path');
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', color.toString());
        line.setAttribute('stroke-width', weight + 'px');
        line.setAttribute('vector-effect', 'non-scaling-stroke');
        // Convert the array of psychrometric states into an array of (x,y) points.
        line.setAttribute('d', 'M ' + data.map(psy => psy.toXY().toString()).join(' '));
        return line;
    }
    /**
     * Draw an axis label.
     */
    private drawLabel(text: string, location: PsyState, anchor: TextAnchor, tooltip?: string): void {
        const label = this.createLabel(text, location.toXY(), this.style.fontColor, anchor);
        this.g.text.appendChild(label);
        if (!!tooltip) {
            label.addEventListener('mouseover', e => this.drawTooltip(tooltip, new Point(e.offsetX, e.offsetY), this.style.fontColor));
            label.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
        }
    }
    /**
     * Create a label to append onto a parent element.
     */
    private createLabel(text: string, location: Point, color: Color, anchor: TextAnchor): SVGTextElement {
        const label = document.createElementNS(NS, 'text');
        label.setAttribute('fill', color.toString());
        label.setAttribute('font-family', 'sans-serif');
        label.setAttribute('font-size', this.style.fontSize + 'px');
        // Use the `x`, `y`, `text-anchor`, and `dominant-baseline` properties to set the text anchor
        switch (anchor) {
            case (TextAnchor.NW): {
                label.setAttribute('x', (location.x + this.style.fontSize / 2).toString());
                label.setAttribute('y', (location.y + this.style.fontSize / 2).toString());
                label.setAttribute('text-anchor', 'start');
                label.setAttribute('dominant-baseline', 'hanging');
                break;
            }
            case (TextAnchor.N): {
                label.setAttribute('x', location.x.toString());
                label.setAttribute('y', (location.y + this.style.fontSize / 2).toString());
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'hanging');
                break;
            }
            case (TextAnchor.NE): {
                label.setAttribute('x', (location.x - this.style.fontSize / 2).toString());
                label.setAttribute('y', (location.y + this.style.fontSize / 2).toString());
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'hanging');
                break;
            }
            case (TextAnchor.E): {
                label.setAttribute('x', (location.x - this.style.fontSize / 2).toString());
                label.setAttribute('y', location.y.toString());
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'middle');
                break;
            }
            case (TextAnchor.SE): {
                label.setAttribute('x', (location.x - this.style.fontSize / 2).toString());
                label.setAttribute('y', (location.y - this.style.fontSize / 2).toString());
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'alphabetic');
                break;
            }
            case (TextAnchor.S): {
                label.setAttribute('x', location.x.toString());
                label.setAttribute('y', (location.y - this.style.fontSize / 2).toString());
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'alphabetic');
                break;
            }
            case (TextAnchor.SW): {
                label.setAttribute('x', (location.x + this.style.fontSize / 2).toString());
                label.setAttribute('y', (location.y - this.style.fontSize / 2).toString());
                label.setAttribute('text-anchor', 'start');
                label.setAttribute('dominant-baseline', 'alphabetic');
                break;
            }
            case (TextAnchor.W): {
                label.setAttribute('x', (location.x + this.style.fontSize / 2).toString());
                label.setAttribute('y', location.y.toString());
                label.setAttribute('text-anchor', 'start');
                label.setAttribute('dominant-baseline', 'middle');
                break;
            }
            case (TextAnchor.C): {
                label.setAttribute('x', location.x.toString());
                label.setAttribute('y', location.y.toString());
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'middle');
                break;
            }
            default: {
                throw new Error('Text anchor ' + anchor + ' is invalid.');
            }
        }
        label.textContent = text;
        return label;
    }
    /**
     * Create a tooltip element.
     */
    private drawTooltip(text: string, location: Point, color: Color): void {
        const tooltipBase = document.createElementNS(NS, 'g'),
            labelElements: SVGTextElement[] = [],
            padding = 10,
            background = document.createElementNS(NS, 'rect');
        // Generate an array of SVGTextElement containing each line of this tooltip
        text.split('\n').forEach((line, i) => labelElements.push(this.createLabel(line, new Point(0, i * this.style.fontSize), color.getContrastingColor(), TextAnchor.NW)));
        // Append the elements onto the window
        tooltipBase.appendChild(background);
        labelElements.forEach(element => tooltipBase.appendChild(element));
        this.g.tooltips.appendChild(tooltipBase);
        // Compute the maximum width of any line in this tooltip and height for the background
        const maxWidth = labelElements.map(element => element.getBBox().width).reduce((a, b) => Math.max(a, b)) + padding,
            maxHeight = labelElements.length * this.style.fontSize + padding;
        // Define styling properties for the tooltip background
        background.setAttribute('stroke', color.getContrastingColor().toString());
        background.setAttribute('fill', color.toString());
        background.setAttribute('x', '0');
        background.setAttribute('y', '0');
        background.setAttribute('width', maxWidth + 'px');
        background.setAttribute('height', maxHeight + 'px');
        background.setAttribute('rx', (padding / 2) + 'px');
        background.setAttribute('stroke-width', '1px');
        // Adjust the position if out-of-bounds
        if (location.x + padding + maxWidth > this.layout.size.x) {
            location.x -= (maxWidth + padding);
        } else {
            location.x += padding;
        }
        if (location.y + padding + maxHeight > this.layout.size.y) {
            location.y -= (maxHeight + padding);
        } else {
            location.y += padding;
        }
        tooltipBase.setAttribute('transform', 'translate(' + location.x + ',' + location.y + ')');
    }
    /**
     * Remove all the children from an element.
     */
    private clearChildren(element: Element): void {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    /**
     * Plot one psychrometric state onto the psychrometric chart.
     */
    plot(state: Datum, time: number = Date.now(), startTime: number = Date.now(), endTime: number = Date.now() + 1): void {
        const currentState = new PsyState(state),
            location = currentState.toXY();
        // Compute the current color to plot
        const normalized = JMath.normalize(time, startTime, endTime),
            color = Color.gradient(normalized, this.gradients[this.config.gradient]);
        // Determine whether to connect the states with a line
        if (!!this.lastState && this.config.lineWidth > 0) {
            this.g.trends.appendChild(this.createLine([this.lastState, currentState], color, this.config.lineWidth));
        }
        this.lastState = currentState;
        // Define a 0-length path element and assign its attributes.
        const point = document.createElementNS(NS, 'path');
        point.setAttribute('fill', 'none');
        point.setAttribute('stroke', color.toString());
        point.setAttribute('stroke-width', this.config.pointRadius + 'px');
        point.setAttribute('stroke-linecap', 'round');
        point.setAttribute('vector-effect', 'non-scaling-stroke');
        point.setAttribute('d', 'M ' + location.x + ',' + location.y + ' h 0');
        this.g.points.appendChild(point);
        // Generate the text to display on mouse hover.
        const tooltipString = new Date(time).toLocaleString() + '\n' +
            JMath.round(currentState.db, 1) + this.units.temp + ' Dry Bulb\n' +
            JMath.round(currentState.rh * 100) + '% Rel. Hum.\n' +
            JMath.round(currentState.wb, 1) + this.units.temp + ' Wet Bulb\n' +
            JMath.round(currentState.dp, 1) + this.units.temp + ' Dew Point' +
            (this.config.advanced ? '\n' +
                JMath.round(currentState.hr, 2) + ' ' + this.units.hr + ' Hum. Ratio\n' +
                JMath.round(currentState.vp, 1) + ' ' + this.units.vp + ' Vap. Press.\n' +
                JMath.round(currentState.h, 1) + ' ' + this.units.h + ' Enthalpy\n' +
                JMath.round(currentState.v, 2) + ' ' + this.units.v + ' Volume' : '');
        // Set the behavior when the user interacts with this point
        point.addEventListener('mouseover', e => this.drawTooltip(tooltipString, new Point(e.offsetX, e.offsetY), color));
        point.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
    }
    /**
     * Draw a shaded region on Psychart.
     */
    drawRegion(states: Datum[], color: Color, tooltip?: string): void {
        // Add the first state to the data set
        const data: PsyState[] = [new PsyState(states[0])];
        for (let i = 1; i < states.length; i++) {
            const lastDatum = states[i - 1],
                currentDatum = states[i];
            // Check if iso-relative humidity (curved line)
            if ('rh' in lastDatum && 'rh' in currentDatum && JMath.approx(lastDatum.rh, currentDatum.rh)) {
                const range = Math.abs(currentDatum.db - lastDatum.db);
                // Calculate several psychrometric states with a dry bulb step of `resolution`
                for (let i = 0; i < range; i += this.style.resolution) {
                    const db = JMath.translate(i, 0, range, lastDatum.db, currentDatum.db);
                    data.push(new PsyState({ db: db, rh: lastDatum.rh }));
                }
            }
            // Assume iso-dry bulb, wet bulb, or dew point (straight line)
            data.push(new PsyState(currentDatum));
        }
        // Create the SVG element to render the shaded region
        const region = document.createElementNS(NS, 'path');
        region.setAttribute('fill', color.toString());
        region.setAttribute('d', 'M ' + data.map(psy => psy.toXY().toString()).join(' ') + ' z');
        this.g.regions.appendChild(region);
        // Optionally render a tooltip on mouse hover
        if (!!tooltip) {
            region.addEventListener('mouseover', e => this.drawTooltip(tooltip, new Point(e.offsetX, e.offsetY), color));
            region.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
        }
    }
    /**
     * Draw predefined regions on Psychart.
     */
    drawRegions(regionIds: string[], gradient: [Color, Color]): void {
        regionIds.forEach((id, i) => this.drawRegion(this.regions[id].data, Color.gradient(i / regionIds.length, gradient), this.regions[id].tooltip));
    }
    /**
     * Clear all plotted data from Psychart.
     */
    clearData(): void {
        this.clearChildren(this.g.points);
        this.clearChildren(this.g.trends);
    }
    /**
     * Clear all rendered regions from Psychart.
     */
    clearRegions(): void {
        this.clearChildren(this.g.regions);
    }
    /**
     * Return the SVG element to append on the parent.
     */
    getElement(): SVGElement {
        return this.base;
    }
}

/**
 * Represents where the origin is in relation to the text.
 */
enum TextAnchor {
    NW, N, NE, E, SE, S, SW, W, C
}