import { ScrollView, XStack } from 'tamagui';
import WatchlistCard from './WatchlistCard';
import type { Stocks } from '@models/watchlist';

type WatchlistProps = {
    watchlist: Stocks;
}

function WatchlistCards({ watchlist }: WatchlistProps){

  return (
    <ScrollView
      width='100%'
      backgroundColor='$background'
    >
      <XStack flexWrap='wrap' alignItems='center' justifyContent='center'>
         {Object.keys(watchlist).map((symbol) => (
            <WatchlistCard 
              key={symbol}
              symbol={symbol}
              price={watchlist[symbol].price}
              previousClose={watchlist[symbol].previousClose}
              animation='bouncy'
              size='$4'
              width={300}
              height={120}
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}  
            />
         ))}
      </XStack>
    </ScrollView>
  );
}

export default WatchlistCards;