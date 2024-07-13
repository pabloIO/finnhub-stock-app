import { Text, Button, ListItem, YGroup, XStack, YStack } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppContext } from 'src/context/app-context';

type AlertItemsProps = {
    trade: string;
    alerts: {targetPrice: number}[] | undefined;
}

function AlertItems({trade, alerts}: AlertItemsProps){

    const { removePriceAlert } = useAppContext();

    if (alerts === undefined){
        return;
    }

    return (
        <>
        {
            alerts?.map((alert, index) => (
                <YGroup.Item key={index}>
                    <ListItem hoverTheme>
                        <XStack gap='$14'>
                            <YStack>
                                <Text fontSize={'$5'}>{trade}</Text>
                                <Text fontSize={'$3'}>Target price: {alert.targetPrice}</Text>
                            </YStack>
                            <Button 
                                borderRadius={'$10'} 
                                alignSelf='center' 
                                backgroundColor='$red10Light'
                                icon={<FontAwesome name='trash' color='white' size={20}/>} 
                                size='$2.5'
                                onPress={() => removePriceAlert(trade, alert.targetPrice)}
                            />
                        </XStack>
                    </ListItem>
                </YGroup.Item>
            ))
        }
        </>
    )
}

export default AlertItems;