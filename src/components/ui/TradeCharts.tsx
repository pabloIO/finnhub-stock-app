import { ScrollView} from 'tamagui';
import { useAppContext } from '@context/app-context';
import TradeChart from './TradeChart';

function TradeCharts(){
    
    const { watchlist } = useAppContext();

    return (
        <ScrollView
            width='100%'
            backgroundColor='$background'
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