import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB2VtiHtdrTQkhSiCbT_ML648prqcHpT2k",
  authDomain: "task-manager-app-93876.firebaseapp.com",
  projectId: "task-manager-app-93876",
  storageBucket: "task-manager-app-93876.appspot.com",
  messagingSenderId: "940264426356",
  appId: "1:940264426356:web:4b7004de8e28caa1baba21",
  measurementId: "G-WGFGSZK395",
  databaseURL: "https://task-manager-app-93876-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission == "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BB6HtxPBvfwqPWLfv0c39iR0VgonBVoA4lY3KYDXsHEwC7Ov-MFioGvVEcCxf0p2fErtIu1IoNpGz6MLRd5p_AU",
    });
    console.log(token);
  }
};
