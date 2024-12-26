import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import CountryCard from "../Components/CountryCard";
import styles from "../Styles/HomeStyles";
import { useCount } from "../contextAPI/CountProvider";

type Props = StackScreenProps<RootStackParamList, "Home">;

interface Country {
  id: string;
  name: string;
  flag: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  population: number;
}

export default function HomeScreen({ navigation, route }: Props) {
  const username = route.params?.username || "Guest";
  const {
    countryCount,
    setCountryCount,
    selectedCountries,
    setSelectedCountries,
  } = useCount();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCovidStatistics();
  }, []);

  const normalizeCountryName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/&ccedil;/g, "ç")
      .replace(/&eacute;/g, "é");
  };

  const fetchCovidStatistics = async () => {
    try {
      const covidResponse = await fetch(
        `https://covid-193.p.rapidapi.com/statistics`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key":
              "f3ed113650mshe29e315d832acd9p1394b6jsn76f70863c668",
          },
        }
      );
      if (!covidResponse.ok) {
        throw new Error(`HTTP error! status: ${covidResponse.status}`);
      }
      const covidData = await covidResponse.json();
      const covidDetails = covidData.response.slice(0, 100); // Limit to first 100 countries

      const countriesWithCovidData = await Promise.all(
        covidDetails.map(async (covid: any) => {
          const countryName = normalizeCountryName(covid.country);
          try {
            const flagResponse = await fetch(
              `https://restcountries.com/v3.1/name/${countryName}`
            );
            if (!flagResponse.ok) {
              throw new Error(`HTTP error! status: ${flagResponse.status}`);
            }
            const flagData = await flagResponse.json();
            const flagUrl = flagData[0]?.flags?.png || "";

            return {
              id: covid.country,
              name: covid.country,
              flag: flagUrl,
              confirmed: covid.cases.total,
              recovered: covid.cases.recovered,
              deaths: covid.deaths.total,
              population: covid.population,
            };
          } catch (error) {
            console.log(`Error fetching flag for ${covid.country}:`, error);
            return null;
          }
        })
      );

      // Filter out countries without a flag and sort alphabetically by name
      const filteredCountries = countriesWithCovidData
        .filter((country) => country && country.flag)
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(filteredCountries);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching COVID-19 statistics:", error);
      setLoading(false);
    }
  };

  const handleAddCountry = (country: Country) => {
    setSelectedCountries([...selectedCountries, country]);
    setCountryCount(countryCount + 1);
  };

  const handleRemoveCountry = (country: Country) => {
    setSelectedCountries(selectedCountries.filter((c) => c.id !== country.id));
    setCountryCount(countryCount - 1);
  };

  const totalConfirmed = selectedCountries.reduce(
    (sum, country) => sum + country.confirmed,
    0
  );
  const totalRecovered = selectedCountries.reduce(
    (sum, country) => sum + country.recovered,
    0
  );
  const totalDeaths = selectedCountries.reduce(
    (sum, country) => sum + country.deaths,
    0
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}!</Text>
      <Text style={styles.heading1}>Current Covid 19 Spread in Worldwide</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CountryCard
            countryDetails={{
              id: item.id,
              name: item.name,
              image: item.flag,
              confirmed: item.confirmed,
              recovered: item.recovered,
              deaths: item.deaths,
              population: item.population,
            }}
            onAdd={() => handleAddCountry(item)}
            onRemove={() => handleRemoveCountry(item)}
          />
        )}
        numColumns={2} // Display 2 cards per row
      />
      <View style={styles.exerciseCountContainer}>
        <Text style={styles.exerciseCountText}>
          Countries Added: {countryCount}
        </Text>
        <Text style={styles.exerciseCountText}>
          Total Confirmed: {totalConfirmed}
        </Text>
        <Text style={styles.exerciseCountText}>
          Total Recovered: {totalRecovered}
        </Text>
        <Text style={styles.exerciseCountText}>
          Total Deaths: {totalDeaths}
        </Text>
      </View>
    </View>
  );
}
