import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";

type NewsItem = {
  title: string;
  description: string;
  image: any; // Replace 'any' with the correct type if you have an image type.
};

type WeatherItem = {
  location: string;
  temperature: string;
  condition: string;
};

const HomeScreen: React.FC = () => {
  const [home, setHome] = useState<NewsItem[]>([
    {
      title: "Perpustakaan Universitas Islam Riau Raih Akreditasi A",
      description: "Perpustakaan UIR siap jadi rujukan perpustakaan nasional.",
      image: require("../../assets/images/pendidikan1.jpg"), // Local image
    },
    {
      title: "Dosen UIR Gelar Sosialisasi Integrasi Sains dan Nilai Islam",
      description: "Sosialisasi diadakan di MAN 2 Model Pekanbaru.",
      image: require("../../assets/images/pendidikan2.jpg"), // Local image
    },
  ]);

  const [education, setEducation] = useState<NewsItem[]>([
    {
      title: "Kampus UIR Adakan Seminar Internasional",
      description: "Seminar bertema teknologi dan pendidikan modern.",
      image: require("../../assets/images/pendidikan2.jpg"),
    },
    {
      title: "Pelatihan Guru di UIR Berjalan Sukses",
      description: "Dukungan teknologi untuk pendidikan berbasis digital.",
      image: require("../../assets/images/pendidikan2.jpg"),
    },
  ]);

  const [weather, setWeather] = useState<WeatherItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("news");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchWeather = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=e571c522b4903ec3fbdc23b05abdb84c`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather([
          {
            location: `${data.name}, ${data.sys.country}`,
            temperature: `${data.main.temp}°C`,
            condition: data.weather[0].description,
          },
        ]);
      } else {
        setWeather([]);
      }
    } catch (error) {
      console.error(error);
      setWeather([]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (category === "news") {
      return (
        <FlatList
          data={home}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Card.Content>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )
          }
        />
      );
    } else if (category === "education") {
      return (
        <FlatList
          data={education}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Card.Content>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )
          }
        />
      );
    } else if (category === "weather") {
      return (
        <FlatList
          data={weather}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>{item.location}</Text>
                <Text style={styles.description}>{item.temperature}</Text>
                <Text style={styles.description}>{item.condition}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )
          }
        />
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/universitas1.png")}
          style={styles.headerLogo}
        />
        <Text style={styles.headerTitle}>Universitas Islam Riau NEWS</Text>
        
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search news or type city for weather"
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={() => {
            if (category === "weather" && searchQuery.trim() !== "") {
              fetchWeather(searchQuery);
            }
          }}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setCategory("news")}>
          <Text style={styles.tabText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory("education")}>
          <Text style={styles.tabText}>Pendidikan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory("weather")}>
          <Text style={styles.tabText}>Cuaca</Text>
        </TouchableOpacity>
      </View>

      {/* Breaking News */}
      <View style={styles.breakingNewsContainer}>
        <Text style={styles.breakingNewsTitle}>Breaking News</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>Lihat Semua >></Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#009688",
    padding: 10,
  },
  headerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  tabText: {
    fontSize: 16,
    color: "#009688",
    fontWeight: "bold",
  },
  breakingNewsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  breakingNewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    fontSize: 14,
    color: "#009688",
  },
  card: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  noDataText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default HomeScreen;
