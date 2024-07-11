import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from 'tamagui';
import appConfig from './tamagui.config';
import AppNavigator from '@navigation/AppNavigator';

export default function App() {
  return (
      <TamaguiProvider config={appConfig}>
        <StatusBar></StatusBar>
        <AppNavigator />
      </TamaguiProvider>
  );
}