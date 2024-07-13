import { H3, ScrollView, XStack, YStack } from "tamagui";
import { useAppContext } from "src/context/app-context";
import TradeChart from "./TradeChart";
import { useEffect, useState } from "react";

function TradeCharts(){
    
    const { watchlist } = useAppContext();

    return (
        <ScrollView
            width="100%"
            backgroundColor="$background"
            >
            {
                Object.keys(watchlist).map((symbol) => (
                    <TradeChart 
                        key={symbol}
                        chartData={watchlist[symbol].chartData} 
                        trade={symbol}
                    />
                ))
            }
        </ScrollView>
    );
}

export default TradeCharts;