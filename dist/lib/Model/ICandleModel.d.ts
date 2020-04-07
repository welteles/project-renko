/**
 * OHVCL Model.
 */
export interface ICandleModel {
    /**
     * Open.
     */
    date?: string[];
    /**
     * Open.
     */
    open: number[];
    /**
     * High.
     */
    high: number[];
    /**
     * High.
     */
    volume: number[];
    /**
     * Low.
     */
    low: number[];
    /**
     * Close.
     */
    close: number[];
    /**
     * Up trend.
     */
    upTrend: boolean[];
}
