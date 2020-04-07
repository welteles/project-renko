/*
 * Copyright (C) 2020 Wellington Rocha
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

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
