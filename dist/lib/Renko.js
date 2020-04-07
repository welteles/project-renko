"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) 2020 Wellington Rocha
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
const bignumber_js_1 = require("bignumber.js");
/**
 * Technical Analysis Investing.
 */
class Renko {
    /**
     * Convert candles.
     *
     * @param candles
     * @param brickSize
     */
    static convertCandlesToRenkoData(candles, brickSize = 2) {
        const firstClose = new bignumber_js_1.default(candles.close[0])
            .div(brickSize)
            .times(brickSize)
            .decimalPlaces(0, bignumber_js_1.default.ROUND_FLOOR)
            .toNumber();
        const firstDate = candles.date[0];
        let trends = [];
        trends.push({
            date: firstDate,
            open: firstClose - brickSize,
            high: firstClose,
            low: firstClose - brickSize,
            close: firstClose,
            upTrend: true,
        });
        Object.keys(candles.open).forEach((index) => {
            const date = candles.date[index];
            const close = candles.close[index];
            const lastTrend = trends[trends.length - 1];
            let upTrend = lastTrend.upTrend;
            let lastTrendClose = lastTrend.close;
            let bricks = parseInt(String((close - lastTrendClose) / brickSize), undefined);
            const data = [];
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
            }
            else if (upTrend && bricks <= -2) {
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
            }
            else if (!upTrend && bricks <= -1) {
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
            }
            else if (!upTrend && bricks >= 2) {
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
            }
            else {
                return;
            }
            trends = [...trends, ...data];
        });
        const trendsResponse = {
            date: [],
            open: [],
            high: [],
            low: [],
            close: [],
            upTrend: [],
        };
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
exports.Renko = Renko;
exports.default = Renko;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVua28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL1JlbmtvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILCtDQUFxQztBQUdyQzs7R0FFRztBQUNILE1BQXNCLEtBQUs7SUFDdkI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMseUJBQXlCLENBQ25DLE9BQTBCLEVBQzFCLFlBQW9CLENBQUM7UUFFckIsTUFBTSxVQUFVLEdBQUcsSUFBSSxzQkFBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0MsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUNkLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDaEIsYUFBYSxDQUFDLENBQUMsRUFBRSxzQkFBUyxDQUFDLFdBQVcsQ0FBQzthQUN2QyxRQUFRLEVBQUUsQ0FBQztRQUNoQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQThCTCxFQUFTLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsVUFBVSxHQUFHLFNBQVM7WUFDNUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFLFVBQVUsR0FBRyxTQUFTO1lBQzNCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzdDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxNQUFNLFNB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