importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyCty5qQN1thUfGHu_He0-yQFwqgO9SpogU",
  authDomain: "internship-app-f1160.firebaseapp.com",
  databaseURL: "https://internship-app-f1160.firebaseio.com",
  projectId: "internship-app-f1160",
  storageBucket: "internship-app-f1160.appspot.com",
  messagingSenderId: "156908797671",
  appId: "1:156908797671:web:ff5682ac5ad8fd1700ac42",
  measurementId: "G-BW3ERX7G6E",
});


const messaging = firebase.messaging();

/*
messaging.setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
 */

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});
