import React from "react";
import { View, ImageBackground } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import styles from "../Styles/Styles";
import RegistrationForm from "../Components/RegistrationForm";

interface Props {
  navigation: NavigationProp<any>;
}

export default function RegistrationScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <RegistrationForm navigation={navigation} />
    </ImageBackground>
  );
}
