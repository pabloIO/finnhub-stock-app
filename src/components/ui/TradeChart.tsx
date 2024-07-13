import { useEffect, useRef, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { YStack, H3 } from "tamagui";

type TradeChartProps = {
    trade: string;
    chartData: {value: number}[];
};

function TradeChart({trade, chartData}: TradeChartProps){

    if(chartData.length === 0){
        return null;
    }

    const [data, setData] = useState(chartData);
    const ref = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setData([...chartData]);
            if (ref.current) {
                ref.current.scrollToEnd();
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [chartData.length]);

    const yAxisOffset = data[0].value - 10;

    return (
        <YStack 
            borderWidth={1}
            borderColor="$gray10Light"
            borderRadius="$4"
            flexWrap="wrap" 
            alignItems="center" 
            justifyContent="center" 
            margin='$2'
        >
            <H3 marginTop='$2'>{trade}</H3>
            <View style={{margin: 20}}>
                <LineChart
                    scrollRef={ref}
                    width={Dimensions.get('window').width - 120}
                    height={220}
                    data={data}
                    noOfSections={5}
                    areaChart
                    thickness={2}
                    hideDataPoints
                    curved
                    hideRules
                    yAxisOffset={yAxisOffset}
                    yAxisLabelPrefix='$'
                    spacing={10}
                    startFillColor="rgba(20,105,81,0.3)"
                    endFillColor="rgba(20,85,81,0.01)"
                    color="#00ff83"
                    startOpacity={0.9}
                    endOpacity={0.2}
                    yAxisColor="white"
                    yAxisThickness={0}
                    yAxisTextStyle={{color: 'gray', fontSize: 9}}
                />
            </View>
        </YStack>
    );
}   

export default TradeChart;