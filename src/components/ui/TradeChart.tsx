import { useEffect, useRef, useState, memo } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { YStack, H3, H5 } from 'tamagui';

type TradeChartProps = {
    trade: string;
    chartData: {value: number}[];
};

function TradeChart({trade, chartData}: TradeChartProps){

    const [data, setData] = useState(chartData);
    const ref = useRef(null);

    useEffect(() => {
        setData([...chartData]);
        if (ref.current) {
            ref.current.scrollToEnd();
        }
    }, [chartData.length]);


    return (
        <YStack 
            borderWidth={1}
            borderColor='$gray10Light'
            borderRadius='$4'
            alignItems='center' 
            justifyContent='center'
            margin='$2'
        >
            <H3 marginTop='$2'>{trade}</H3>
            {
                data.length === 0 && 
                    <H5 textAlign='center'>No data available to show</H5>
            }
            {
                data.length > 0 &&
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
                        yAxisOffset={ data[0].value - 10}
                        yAxisLabelPrefix='$'
                        spacing={10}
                        startFillColor='rgba(20,105,81,0.3)'
                        endFillColor='rgba(20,85,81,0.01)'
                        color='#00ff83'
                        startOpacity={0.9}
                        endOpacity={0.2}
                        yAxisColor='white'
                        yAxisThickness={0}
                        yAxisTextStyle={{color: 'gray', fontSize: 9}}
                    />
                </View>
            }
        </YStack>
    );
}   

export default memo(TradeChart);