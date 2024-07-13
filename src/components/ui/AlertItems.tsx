import { H3, ListItem, YGroup } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type AlertItemsProps = {
    trade: string;
    alerts: {targetPrice: number}[] | undefined;
}

function AlertItems({trade, alerts}: AlertItemsProps){

    if (alerts === undefined){
        return;
    }

    return (
        <>
        {
            alerts?.map((alert, index) => (
                <YGroup.Item key={index}>
                    <ListItem 
                        hoverTheme 
                        icon={<FontAwesome name='dollar' />} 
                        title={trade} 
                        subTitle={`Target price: ${alert.targetPrice.toString()}`} />
                </YGroup.Item>
            ))
        }
        </>
    )
}

export default AlertItems;