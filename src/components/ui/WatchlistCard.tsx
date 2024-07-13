import { Card, H6, Paragraph, H5, XStack, H4, Button } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { CardProps } from 'tamagui';


type WatchlistCardProps = {
  symbol: string;
  price: number;
  previousClose: number;
} & CardProps;

function WatchlistCard(props : WatchlistCardProps){

  const { symbol, price, previousClose } = props;

  function calculatePriceChanges(currentPrice: number, previousClose: number){
    const priceChange = currentPrice - previousClose;
    const percentageChange = ((priceChange / previousClose) * 100);
    return {
      priceChange: priceChange,
      percentageChange: percentageChange
    };
  }

  const isTrading = price !== 0;
  const { priceChange, percentageChange } = calculatePriceChanges(price, previousClose);

  return (
    <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal='$4' paddingVertical='$2'>
      <Card elevate size='$4' bordered {...props}>
        <Card.Header padded>
            <H4>{symbol}</H4>
            {
              isTrading 
                ? <Paragraph theme='alt2' fontSize='$5'>Current price: ${price}</Paragraph>
                : <Button size='$4'>Not trading right now</Button>
            }
        </Card.Header>
        { isTrading && 
          <Card.Footer padded>
            <XStack flex={1} alignSelf="center" >
              <Ionicons 
                style={{padding: 5}}
                size={20}
                name={percentageChange >= 0 ? 'chevron-up' : 'chevron-down'}
                color={percentageChange >= 0 ? 'green' : 'red'}
              />
              <H5 
                color={percentageChange >= 0 ? '$green11Light' : '$red11Light'}>
                  {percentageChange.toFixed(3)}%
              </H5>
              <H6 
                color={priceChange >= 0 ? '$green11Light' : '$red11Light'} paddingLeft='$3'>
                  ({priceChange.toFixed(3)})
              </H6>
            </XStack>
          </Card.Footer>
        }
      </Card>
    </XStack>
  );
}

export default WatchlistCard;