import React, { useState } from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";

export default function LoginScreen() {
	const [username, setUsername] = useState(""); // Ganti ke username
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, {
				username, // Gunakan username di sini
				password,
			});
			const { token } = response.data.data;
			await AsyncStorage.setItem("token", token);
			router.replace("/(tabs)"); // Prevent back navigation to login
		} catch (error) {
			const errorMessage =
				(error as any).response?.data?.message || "An error occurred";
			Alert.alert("Login Failed", errorMessage);
		}
	};

	return (
		<ThemedView style={styles.container}>
			<Image
				source={require("../../assets/images/universitas.png")} // Ganti dengan gambar logo universitas
				style={styles.logo}
			/>
			<Text style={styles.universityTitle}>
				Universitas Islam Riau{" "}
				<Text style={styles.newsText}>News</Text>
			</Text>
			<Text style={styles.subtitle}>Login</Text>
			<Text style={styles.instructions}>
				Silakan masuk untuk melanjutkan
			</Text>
			{/* Input Username */}
			<View style={styles.inputContainer}>
				<Image
					source={require("../../assets/images/iconemail.png")} // Ganti dengan ikon username
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Username"
					value={username} // Ganti ke username
					onChangeText={setUsername}
					autoCapitalize="none"
				/>
			</View>
			{/* Input Password */}
			<View style={styles.inputContainer}>
				<Image
					source={require("../../assets/images/iconpw.png")} // Ganti dengan ikon password
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Kata Sandi"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
			</View>
			{/* Tombol Lupa Kata Sandi */}
			<TouchableOpacity
				style={styles.forgotPasswordButton}
				onPress={() => Alert.alert("Forgot Password", "Under development")}
			>
				<Text style={styles.forgotPasswordText}>Lupa Kata Sandi?</Text>
			</TouchableOpacity>
			{/* Tombol Login */}
			<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
				<Text style={styles.loginButtonText}>SIGN IN</Text>
			</TouchableOpacity>
			<Text style={styles.orText}>atau masuk menggunakan</Text>
			<View style={styles.socialButtons}>
				<TouchableOpacity>
					<Image
						source={require("../../assets/images/favicon.png")} // Ganti dengan ikon Google
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Image
						source={require("../../assets/images/favicon1.png")} // Ganti dengan ikon Facebook
						style={styles.socialIcon}
					/>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={styles.registerLink}
				onPress={() => router.push("/auth/RegisterScreen")}
			>
				<Text style={styles.registerText}>
					Tidak punya akun? <Text style={styles.registerBold}>Daftar</Text>
				</Text>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#136f3c", // Warna hijau latar belakang
	},
	logo: {
		width: 120,
		height: 120,
		marginBottom: 16,
		resizeMode: "contain",
	},
	universityTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		textAlign: "center",
		marginBottom: 8,
	},
	newsText: {
		color: "red", // Warna merah untuk kata "News"
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#ffffff",
		marginBottom: 4,
		textAlign: "center",
	},
	instructions: {
		fontSize: 14,
		color: "#e0e0e0",
		marginBottom: 16,
		textAlign: "center",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		height: 48,
		borderWidth: 1,
		borderColor: "#ffffff",
		borderRadius: 8,
		backgroundColor: "#ffffff",
		marginBottom: 12,
		paddingHorizontal: 12,
	},
	inputIcon: {
		width: 20,
		height: 20,
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 14,
		color: "#333333",
	},
	forgotPasswordButton: {
		alignSelf: "flex-end",
		marginBottom: 16,
	},
	forgotPasswordText: {
		color: "#ffffff",
		fontSize: 12,
		textDecorationLine: "underline",
	},
	loginButton: {
		width: "100%",
		height: 48,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000000", // Warna tombol login
		marginBottom: 16,
	},
	loginButtonText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "600",
	},
	orText: {
		color: "#e0e0e0",
		fontSize: 14,
		marginBottom: 16,
	},
	socialButtons: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 24,
	},
	socialIcon: {
		width: 36,
		height: 36,
		marginHorizontal: 8,
	},
	registerLink: {
		marginTop: 8,
	},
	registerText: {
		color: "#ffffff",
		fontSize: 14,
		textAlign: "center",
	},
	registerBold: {
		fontWeight: "bold",
	},
});
