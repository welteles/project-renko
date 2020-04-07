import * as Core from "..";
/**
 * Technical Analysis Investing.
 */
export declare abstract class Renko {
    /**
     * Convert candles.
     *
     * @param candles
     * @param brickSize
     */
    static convertCandlesToRenkoData(candles: Core.ICandleModel, brickSize?: number): Core.ICandleModel;
}
