import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../Styles/HomeStyles";

interface CountryCardProps {
  countryDetails: {
    id: string;
    name: string;
    image: string;
    confirmed: number;
    recovered: number;
    deaths: number;
    population: number;
  };
  onAdd: () => void;
  onRemove: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  countryDetails,
  onAdd,
  onRemove,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleToggle = () => {
    if (isAdded) {
      onRemove();
    } else {
      onAdd();
    }
    setIsAdded(!isAdded);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: countryDetails.image }} style={styles.image} />
      <Text style={styles.name}>{countryDetails.name}</Text>
      <Text style={styles.details}>Confirmed: {countryDetails.confirmed}</Text>
      <Text style={styles.details}>Recovered: {countryDetails.recovered}</Text>
      <Text style={styles.details}>Deaths: {countryDetails.deaths}</Text>
      <Text style={styles.details}>
        Population: {countryDetails.population}
      </Text>
      <TouchableOpacity
        style={[styles.toggleButton, isAdded && styles.toggleButtonAdded]}
        onPress={handleToggle}
      >
        <Text style={styles.toggleButtonText}>{isAdded ? "-" : "+"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CountryCard;
