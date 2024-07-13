import type { Stocks } from "@models/watchlist";

// THE PREVIOUS CLOSING AND OPENING PRICES ARE TAKEN FROM YAHOO FINANCE
// ON DATE 12th JULY
export const initialWatchlist: Stocks = {
    'AMZN': {
        price: 194.51,
        previousClose: 195.05,
        chartData: [],
    },
    // 'BINANCE:BTCUSDT': {
    //     price: 0,
    //     previousClose: 195.26,
    // },
    'APPL': {
        price: 229.0,
        previousClose: 227.57,
        chartData: [],
    },
    'MSFT': {
        price: 454.33,
        previousClose: 454.70,
        chartData: [],
    },
    'BTC/USD': {
        price: 57341.20,
        previousClose: 57341.195,
        chartData: [],
    },
    'ETH/USD': {
        price: 3099.99,
        previousClose: 3099.99,
        chartData: [],
    },
    'EUR/USD': {
        price: 1.0871,
        previousClose: 1.0870,
        chartData: [],
    },
    'GBP/USD': {
        price: 1.2914,
        previousClose: 1.2914,
        chartData: [],
    }
};

// Symbols that will be tracked in the app
export const symbolsToSubscribe: string[] = [
    'BINANCE:BTCUSDT',
    'APPL',
    'AMZN',
    'BTC/USD',
    'ETH/USD',
    'EUR/USD',
    'GBP/USD',
    'MSFT'
];