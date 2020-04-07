#  Converts OHLC to Renko bricks. 
Algorithm was based on 
[stocktrends](https://github.com/ChillarAnand/stocktrends).
## How to install
```bash
npm install renko
```

## Usage
```js
const renko = require('renko');
const brickSize = 2;
const candleData = {
    open: [],
    high: [],
    low: [],
    close: []
};
renko.convertCandlesToRenkoData(candleData, brickSize);
```

## Test
```js
npm run test
```

## Build
```js
npm run build
```

## LICENSE
MIT
