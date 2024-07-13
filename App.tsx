import { TamaguiProvider } from 'tamagui';
import appConfig from './tamagui.config';
import AppNavigator from '@navigation/AppNavigator';
import {Auth0Provider} from 'react-native-auth0';

export default function App() {
  
  return (
    <Auth0Provider 
      domain={'dev-dvns8ddirp5zn4ni.us.auth0.com'}
      clientId={'euJXEsJ4nUckZ53ucOLV36ktllOEHckx'}>
      <TamaguiProvider config={appConfig}>
        <AppNavigator />
      </TamaguiProvider>
    </Auth0Provider>
  );
}