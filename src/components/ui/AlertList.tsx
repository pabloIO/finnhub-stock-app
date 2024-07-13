import { useAppContext } from "@context/app-context";
import { H5, ListItem, Separator, XStack, YGroup } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AlertItems from "./AlertItems";


function AlertList() {

    const { watchlist } = useAppContext();

    return (
      <YGroup alignSelf="center" bordered width={'100%'} size="$4" marginTop='$2'>
        {
            Object.keys(watchlist).map((trade, index) => (
                <AlertItems 
                    key={index} 
                    trade={trade} 
                    alerts={watchlist[trade].alerts}
                />
            ))
        }
      </YGroup>
    );
}

export default AlertList;