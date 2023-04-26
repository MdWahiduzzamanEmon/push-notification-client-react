self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("New notification", data);
  // const data = {
  //     name,
  //     email,
  //     message
  //   }
  const options = {
    title: "New message from " + data.name,
    body: `Email: ${data.email} \nMessage: ${data.message}`,
    icon: "https://i.imgur.com/3g7nmJC.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Go to the site",
        icon: "https://i.imgur.com/3g7nmJC.png",
      },
      {
        action: "close",
        title: "Close the notification",
        icon: "https://i.imgur.com/3g7nmJC.png",
      },
    ],
  };
  event.waitUntil(self.registration.showNotification(data.name, options));
});
