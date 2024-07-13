import type { Stocks } from '@models/watchlist';

// THE PREVIOUS CLOSING AND OPENING PRICES ARE TAKEN FROM YAHOO FINANCE
// ON DATE 13th JULY
export const initialWatchlist: Stocks = {
    'AMZN': {
        price: 194.51,
        previousClose: 195.05,
        chartData: [],
    },
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
    'TSLA': {
        price: 235.73,
        previousClose: 241.03,
        chartData: [],
    },
    'NVDA': {
        price: 128.26,
        previousClose: 127.40,
        chartData: [],
    },
    'GOOG': {
        price: 186.90,
        previousClose: 187.30,
        chartData: [],
    },
    'META': {
        price: 497.76,
        previousClose: 512.70,
        chartData: [],
    },
    'BINANCE:BTCUSDT': {
        price: 58621.99,
        previousClose: 58621.99,
        chartData: []
    },

};

// Symbols that will be tracked in the app
export const symbolsToSubscribe: string[] = [
    'APPL',
    'AMZN',
    'MSFT',
    'TSLA',
    'NVDA',
    'GOOG',
    'META',
    'BINANCE:BTCUSDT'
];