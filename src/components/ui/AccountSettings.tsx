import { Switch, ListItem, YGroup, View, YStack, H3, XStack, Text } from 'tamagui';
import { useAuth0 } from 'react-native-auth0';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppContext } from '@context/app-context';

function AccountSettings(){

    const { user } = useAuth0();
    const { receiveNotifications, handleReceiveNotifications } = useAppContext();

    if (!user) return null;

    return(
        <View 
            alignContent='center' 
            alignItems='center'
            width={'100%'}
            borderWidth={1}
            borderColor='$gray10Light'
            borderRadius='$4'
            padding='$2'
            marginTop='$3'
            >
            <YStack gap='$3' >
                <H3>Custom Alerts</H3>
                <YGroup alignSelf='center' bordered width={'100%'} size='$4' marginTop='$2'>
                    <YGroup.Item>
                    <ListItem hoverTheme icon={<Ionicons name='notifications' size={20}/>}>
                        <XStack gap='$5'>
                            <Text fontSize={'$5'}>Receive price notifications</Text>
                            <Switch 
                                onCheckedChange={handleReceiveNotifications}
                                size={'$3'} 
                                checked={receiveNotifications}
                                backgroundColor={receiveNotifications ? '$green10' : '$gray5Light'}
                            >
                                <Switch.Thumb 
                                    backgroundColor={receiveNotifications ? '$green1' : '$gray11Light'} 
                                    animation='quicker' 
                                />
                            </Switch>
                        </XStack>
                    </ListItem>
                    </YGroup.Item>
                </YGroup>
            </YStack>
            
        </View>
    );
}

export default AccountSettings;