import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from 'tamagui';
import appConfig from './tamagui.config';
import AppNavigator from '@navigation/AppNavigator';
import {Auth0Provider} from 'react-native-auth0';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from "expo-constants"; // Optional

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    if (Constants.easConfig?.projectId) {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId, // you can hard code project id if you dont want to use expo Constants
        })
      ).data;
      console.log(token);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function App() {

  // useEffect(() => {
  //   registerForPushNotificationsAsync();

  //   async function schedulePushNotification() {
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "You've got notification! 🔔",
  //         body: 'Here is the notification body',
  //         data: { data: 'goes here' },
  //       },
  //       trigger: { seconds: 2 },
  //     });
  //   }
  // }, [])

  
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