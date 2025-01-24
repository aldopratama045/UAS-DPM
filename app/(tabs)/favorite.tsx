import React from "react";
import { FlatList, Image, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import { useFavorites } from "@/context/FavoritesContext"; // Sesuaikan path sesuai struktur Anda

const FavoritesScreen: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <FlatList
      data={favorites}
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
        <Text style={styles.noDataText}>No favorites added</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
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

export default FavoritesScreen;