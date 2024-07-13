export type Stocks = {
    [key: string]: StockTrade;
};

export type Alert = {
    targetPrice: number;
};

export type ChartData = {
    value: number;
};

export type StockTrade = {
    price: number;
    previousClose: number;
    chartData: ChartData[],
    alerts?: Alert[],
};