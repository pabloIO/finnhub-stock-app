import { useState, useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppProvider } from '@context/app-context';
import type { HomeTabParamList } from '@models/navigation';
import AlertsScreen from '@components/screens/AlertsScreen';
import WatchlistScreen from '@components/screens/WatchlistScreen';
import ChartScreen from '@components/screens/ChartScreen';
import AccountScreen from '@components/screens/AccountScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function AppNavigator() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Inter': require('@assets/fonts/Inter.ttf'),
          'InterBold': require('@assets/fonts/InterBold.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // hide splash screen immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
      <AppProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Tab.Navigator
          initialRouteName="Watchlist"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
          }}>
          <Tab.Screen
            name='Watchlist'
            options={{ 
              tabBarLabel: 'Stocks', 
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              )
            }}
            component={WatchlistScreen}
          />
          <Tab.Screen
            name='StockAlerts'
            options={{ 
              tabBarLabel: 'Price alerts',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="notifications" color={color} size={size} />
              )
             }}
            component={AlertsScreen}
          />
          <Tab.Screen
            name='Charts'
            options={{ 
              tabBarLabel: 'Charts',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bar-chart" color={color} size={size} />
              ) 
            }}
            component={ChartScreen}
          />
          <Tab.Screen
            name='Account'
            options={{ 
              tabBarLabel: 'Account',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ) 
            }}
            component={AccountScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </AppProvider>
  );
}
