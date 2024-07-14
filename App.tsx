import { TamaguiProvider } from 'tamagui';
import appConfig from './tamagui.config';
import AppNavigator from '@navigation/AppNavigator';
import {Auth0Provider} from 'react-native-auth0';

const AUTH0_DOMAIN = 'dev-dvns8ddirp5zn4ni.us.auth0.com';
const AUTH0_CLIENT_ID = 'euJXEsJ4nUckZ53ucOLV36ktllOEHckx';

export default function App() {
  
  return (
    <Auth0Provider 
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}>
      <TamaguiProvider config={appConfig}>
        <AppNavigator />
      </TamaguiProvider>
    </Auth0Provider>
  );
}