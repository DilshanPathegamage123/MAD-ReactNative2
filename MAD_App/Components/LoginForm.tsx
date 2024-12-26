import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../Styles/Styles";

interface Props {
  navigation: NavigationProp<any>;
}

export default function LoginForm({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const storedCredentials = await AsyncStorage.getItem("userCredentials");
      if (storedCredentials) {
        const {
          email: storedEmail,
          password: storedPassword,
          userName: storedUserName,
        } = JSON.parse(storedCredentials);
        if (email === storedEmail && password === storedPassword) {
          Alert.alert("Success", "User logged in successfully");
          navigation.navigate("Home", { username: storedUserName });
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
      } else {
        Alert.alert("Error", "No user found. Please register first.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve user credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CovidTrack</Text>
      <Text style={styles.title}>Welcome to CovidTrack</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Signin</Text>
      </TouchableOpacity>
      <Text
        style={styles.textClass}
        onPress={() => navigation.navigate("SignUp")}
      >
        Create Account
      </Text>
    </View>
  );
}
