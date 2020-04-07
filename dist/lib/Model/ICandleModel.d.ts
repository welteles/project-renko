/**
 * OHVCL Model.
 */
export interface ICandleModel {
    /**
     * Open.
     */
    date: string[];
    /**
     * Open.
     */
    open: number[];
    /**
     * High.
     */
    high: number[];
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
