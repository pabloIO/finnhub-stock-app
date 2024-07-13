import { Button, Avatar, View } from 'tamagui';
import { useAuth0 } from 'react-native-auth0';

function AccountLogin(){

    const {authorize, user, clearSession} = useAuth0();

    async function handleLogin(){
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    }

    async function handleLogout(){
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    }

    const avatarUrl = user ? 
        'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
        : require('@assets/user-profile-default.png');

    return(
        <View 
            alignContent='center' 
            alignItems='center'
            width={'100%'}
            padding='$4' 
            borderWidth={1}
            borderColor="$gray10Light"
            borderRadius="$4"
            >
            <Avatar circular size='$12' marginVertical='$3'>
                <Avatar.Image
                accessibilityLabel='Cam'
                src={avatarUrl}
                />
                <Avatar.Fallback backgroundColor='$blue10' />
            </Avatar>
            {
                !user 
                    ? <Button
                        backgroundColor={'$green10'}
                        color={'$white1'} 
                        onPress={handleLogin}>
                        Login to receive notifications
                    </Button>
                    : <Button
                        backgroundColor={'$red11Light'}
                        color={'$white1'} 
                        variant='outlined'
                        onPress={handleLogout}>
                        Logout
                    </Button>
            }
            
        </View>
    );
}

export default AccountLogin;