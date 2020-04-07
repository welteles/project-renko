/*
 * Copyright (C) 2020 Wellington Rocha
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import BigNumber from "bignumber.js";
import * as Core from "..";

/**
 * Technical Analysis Investing.
 */
export abstract class Renko {
    /**
     * Convert candles.
     *
     * @param candles
     * @param brickSize
     */
    public static convertCandlesToRenkoData(
        candles: Core.ICandleModel,
        brickSize: number = 2
    ): Core.ICandleModel {
        const firstClose = new BigNumber(candles.close[0])
            .div(brickSize)
            .times(brickSize)
            .decimalPlaces(0, BigNumber.ROUND_FLOOR)
            .toNumber();
        const firstDate = candles.date[0];
        let trends: Array<{
            /**
             * Date.
             */
            date: string;

            /**
             * Open.
             */
            open: number;

            /**
             * High.
             */
            high: number;

            /**
             * Low.
             */
            low: number;

            /**
             * Close.
             */
            close: number;

            /**
             * Up trend.
             */
            upTrend: boolean;
        }> = [] as any;
        trends.push({
            date: firstDate,
            open: firstClose - brickSize,
            high: firstClose,
            low: firstClose - brickSize,
            close: firstClose,
            upTrend: true,
        });
        Object.keys(candles.open).forEach((index: any) => {
            const date = candles.date[index];
            const close = candles.close[index];
            const lastTrend = trends[trends.length - 1];
            let upTrend = lastTrend.upTrend;
            let lastTrendClose = lastTrend.close;
            let bricks = parseInt(
                String((close - lastTrendClose) / brickSize),
                undefined
            );
            const data: any = [];
            if (upTrend && bricks >= 1) {
                for (const brick of Array(Math.abs(bricks)).keys()) {
                    data.push({
                        date,
                        open: lastTrendClose,
                        high: lastTrendClose + brickSize,
                        low: lastTrendClose,
                        close: lastTrendClose + brickSize,
                        upTrend,
                    });
                    lastTrendClose += brickSize;
                }
            } else if (upTrend && bricks <= -2) {
                upTrend = !upTrend;
                bricks += 1;
                lastTrendClose -= brickSize;
                for (const brick of Array(Math.abs(bricks)).keys()) {
                    data.push({
                        date,
                        open: lastTrendClose,
                        high: lastTrendClose,
                        low: lastTrendClose - brickSize,
                        close: lastTrendClose - brickSize,
                        upTrend,
                    });
                    lastTrendClose -= brickSize;
                }
            } else if (!upTrend && bricks <= -1) {
                for (const brick of Array(Math.abs(bricks)).keys()) {
                    data.push({
                        date,
                        open: lastTrendClose,
                        high: lastTrendClose,
                        low: lastTrendClose - brickSize,
                        close: lastTrendClose - brickSize,
                        upTrend,
                    });
                    lastTrendClose -= brickSize;
                }
            } else if (!upTrend && bricks >= 2) {
                upTrend = !upTrend;
                bricks -= 1;
                lastTrendClose += brickSize;
                for (const brick of Array(Math.abs(bricks)).keys()) {
                    data.push({
                        date,
                        open: lastTrendClose,
                        high: lastTrendClose + brickSize,
                        low: lastTrendClose,
                        close: lastTrendClose + brickSize,
                        upTrend,
                    });
                    lastTrendClose += brickSize;
                }
            } else {
                return;
            }
            trends = [...trends, ...data];
        });
        const trendsResponse: Core.ICandleModel = {
            date: [],
            open: [],
            high: [],
            low: [],
            close: [],
            upTrend: [],
        } as any;
        trends.forEach((trend) => {
            trendsResponse.date.push(trend.date);
            trendsResponse.open.push(trend.open);
            trendsResponse.high.push(trend.high);
            trendsResponse.low.push(trend.low);
            trendsResponse.close.push(trend.close);
            trendsResponse.upTrend.push(trend.upTrend);
        });
        return trendsResponse;
    }
}
