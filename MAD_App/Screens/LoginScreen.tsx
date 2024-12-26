import React from "react";
import { View, ImageBackground } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import styles from "../Styles/Styles";
import LoginForm from "../Components/LoginForm";

interface Props {
  navigation: NavigationProp<any>;
}

export default function LoginScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <LoginForm navigation={navigation} />
    </ImageBackground>
  );
}
