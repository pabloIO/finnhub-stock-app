import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Theme } from 'tamagui';

import type { HomeTabParamList } from '@models/navigation';

const Tab = createBottomTabNavigator<HomeTabParamList>();

// function screenOptions(route: any) {
//   return {
//     tabBarActiveTintColor: '#C41848',
//     tabBarInactiveTintColor: '#8a8a92',
//     tabBarIcon: ({ focused, color }: { focused: boolean; color: string;}) => {
//       let component;
//       if (route.name === 'risk-sensor-tab') {
//         component = (
//           <Image
//             source={
//               focused
//                 ? require('../assets/images/__sensor-icon-blue-complete-red.png')
//                 : require('../assets/images/__sensor-icon-grey.png')
//             }
//             style={dimensions.icon}
//           />
//         );
//       } else if (route.name === 'map-tab') {
//         component = (
//           <Image
//             source={
//               focused
//                 ? require('../assets/images/__sensor-map-blue-complete-red.png')
//                 : require('../assets/images/__sensor-map-grey.png')
//             }
//             style={dimensions.icon}
//           />
//         );
//       } else if (route.name === 'chat-tab') {
//         component = <Icon name="chatbubble-outline" type="ionicon" size={25} color={color} />;
//       } else if (route.name === 'reports-tab') {
//         component = <Icon name="megaphone" type="entypo" size={25} color={color} />;
//       } else if (route.name === 'settings-tab') {
//         component = <Icon name="settings" type="feather" size={25} color={color} />;
//       }
//       return component;
//     },
//   };
// }

function SimpleView() {
  return <View><Text>Hola</Text></View>;
}

export default function AppNavigator() {
  return (
    // <Tab.Navigator screenOptions={({ route }) => screenOptions(route)}>
    <Theme>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name='Watchlist'
            options={{ tabBarLabel: 'Stocks' }}
            component={SimpleView}
          />
          <Tab.Screen
            name='StockAlerts'
            options={{ tabBarLabel: 'Stock alerts' }}
            component={SimpleView}
          />
          <Tab.Screen
            name='FinancialChart'
            options={{ tabBarLabel: 'Chart' }}
            component={SimpleView}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Theme>
  );
}
