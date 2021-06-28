import { Expo } from 'expo-server-sdk';
const expo = new Expo();

export const handlePushTokens = (title, body,savedPushTokens) => {

    let notifications = [];
    for (let pushToken of savedPushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
    
      notifications.push({
        to: pushToken,
        sound: "default",
        title: title,
        body: "y",
        data: { body }
      });
    }


    let chunks = expo.chunkPushNotifications(notifications);
  
    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  };