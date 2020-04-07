import { Renko } from "../src/lib";
const fs = require("fs");

describe("OHVCLRenko", () => {
    test("RENKO LOW DATA", async (done) => {
        const ohvcl = fs.readFileSync("./data/ohvcl.json", "utf8");
        const renkoData = Renko.convertCandlesToRenkoData(JSON.parse(ohvcl));
        expect({
            date: ["2019-01-01", "2019-08-20"],
            open: [446, 446],
            high: [448, 446],
            low: [446, 444],
            close: [448, 444],
            upTrend: [true, false],
        }).toEqual(renkoData);
        done();
    });
    test("RENKO HIGH DATA", async (done) => {
        const ohvcl = fs.readFileSync("./data/HDFCLIFE.json", "utf8");
        const ohvclRenko = fs.readFileSync("./data/HDFCLIFE.renko.json", "utf8");
        const renkoData = Renko.convertCandlesToRenkoData(JSON.parse(ohvcl));
        expect(JSON.parse(ohvclRenko)).toEqual(renkoData);
        done();
    });
});
