import React from "react";
import * as firebase from "firebase/app";
import * as Font from "expo-font";
import "firebase/firestore";

import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import ComputerNumbers from "./src/components/ComputerNumbers";
import { GlobalStyles } from "./src/styles/global";
import "dotenv/config";

const App = () => {
  // Your web app's Firebase configuration
  let firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "codwz-42df9.firebaseapp.com",
    databaseURL: "https://codwz-42df9.firebaseio.com",
    projectId: "codwz-42df9",
    storageBucket: "codwz-42df9.appspot.com",
    messagingSenderId: "683716504900",
    appId: "1:683716504900:web:c9f70b7c5f35e3c5b2bb11",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();

  const [loaded, error] = Font.useFonts({
    NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.text}>2179</Text>
        <ComputerNumbers db={db} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;
