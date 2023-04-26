import axios from "axios";
let convertedVapidKey = null;
const getPublicKey = async () => {
  const response = await fetch(`http://localhost:3000/notify/publicKey`);
  const responseData = await response.json();
  //   console.log(responseData.data);
  convertedVapidKey = urlBase64ToUint8Array(responseData.data);
  //   console.log(convertedVapidKey);
  return convertedVapidKey;
};

getPublicKey();

function urlBase64ToUint8Array(base64String) {
  //   console.log(base64String);

  if (!base64String) return null;
  //   console.log(base64String);
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //   console.log(base64String);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscription(subscription) {
  const response = await axios.post(
    `http://localhost:3000/notify/subscribe`,
    subscription
  );
  console.log(response.data);
}

export function subscribeUser(data) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(function (registration) {
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log("New subscription added.", newSubscription);
                  const body = {
                    subscription: newSubscription,
                    data: data,
                  };
                  sendSubscription(body);
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              sendSubscription({
                subscription: existedSubscription,
                data: data,
              });
            }
          });
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  }
}
