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
import API_URL from "../../config/config";

export default function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}

		try {
			await axios.post(`${API_URL}/api/auth/register`, {
				username,
				email,
				password,
			});
			Alert.alert("Registration Successful", "You can now log in");
			router.replace("/auth/LoginScreen");
		} catch (error) {
			Alert.alert(
				"Registration Failed",
				(error as any).response?.data?.message || "An error occurred"
			);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => router.replace("/auth/LoginScreen")}>
				<Image
					source={require("../../assets/icons/back.png")} // Ganti dengan ikon "back"
					style={styles.backIcon}
				/>
			</TouchableOpacity>
			<Text style={styles.title}>Buat Akun</Text>

			{/* Nama Lengkap */}
			<View style={styles.inputContainer}>
				<Image
					source={require("../../assets/icons/user.png")} // Ikon user
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Nama Lengkap"
					value={username}
					onChangeText={setUsername}
					autoCapitalize="words"
				/>
			</View>

			{/* Email */}
			<View style={styles.inputContainer}>
				<Image
					source={require("../../assets/icons/email.png")} // Ikon email
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
				/>
			</View>

			{/* Kata Sandi */}
			<View style={styles.inputContainer}>
				<Image
					source={require("../../assets/icons/pw.png")} // Ikon password
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

			{/* Konfirmasi Kata Sandi */}
			<View style={styles.inputContainer}>
				<Image
					source={require("../../assets/icons/pw.png")} // Ikon confirm password
					style={styles.inputIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Konfirmasi Kata Sandi"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
				/>
			</View>

			{/* Tombol Daftar */}
			<TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
				<Text style={styles.registerButtonText}>DAFTAR</Text>
			</TouchableOpacity>

			{/* Tautan ke Login */}
			<TouchableOpacity
				style={styles.loginLink}
				onPress={() => router.replace("/auth/LoginScreen")}
			>
				<Text style={styles.loginText}>
					Sudah punya akun? <Text style={styles.loginBold}>masuk</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#136f3c",
		padding: 16,
	},
	backIcon: {
		width: 20,
		height: 20,
		marginBottom: 24,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#ffffff",
		marginBottom: 32,
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
		marginBottom: 16,
		paddingHorizontal: 12,
	},
	inputIcon: {
		width: 24,
		height: 24,
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#333333",
	},
	registerButton: {
		width: "100%",
		height: 48,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000000",
		marginBottom: 24,
	},
	registerButtonText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
	},
	loginLink: {
		marginTop: 8,
		alignItems: "center",
	},
	loginText: {
		color: "#ffffff",
		fontSize: 14,
	},
	loginBold: {
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
});
