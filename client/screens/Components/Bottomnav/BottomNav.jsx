import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const BottomNavigationBar = ({}) => {
  const [activeTab, setActiveTab] = useState("Home");
  const auth = getAuth();
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.bottomNavigationBar}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("Home")}
      >
        <Ionicons
          name={activeTab === "Home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "Home" ? "darkorange" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("Search")}
      >
        <Ionicons
          name={activeTab === "calendar-outline" ? "search" : "calendar"}
          size={24}
          color={activeTab === "Search" ? "darkorange" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          signOut(auth)
            .then(() => {})
            .catch((error) => {
              console.error(error);
            });
          navigation.navigate("playerlogin");
        }}
      >
        <Ionicons
          name={activeTab === "log-out-outline" ? "logout" : "log-out-sharp"}
          size={24}
          color={activeTab === "Logout" ? "darkorange" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("Profile")}
      >
        <Ionicons
          name={activeTab === "Profile" ? "person" : "person-outline"}
          size={24}
          color={activeTab === "Profile" ? "darkorange" : "lightgrey"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    borderTopWidth: 2,
    borderTopColor: "darkorange",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomNavigationBar;
