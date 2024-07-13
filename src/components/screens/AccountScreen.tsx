import { Button, YStack } from 'tamagui';
import AccountLogin from '@components/ui/AccountLogin';
import AccountSettings from '@components/ui/AccountSettings';

function AccountScreen (){
    
    return (
        <YStack 
            flex={1}
            padding='$2'
            width='100%'
            alignItems='center'
            backgroundColor='$background'>
            <AccountLogin />
            <AccountSettings/>
        </YStack>
    );
}

export default AccountScreen;