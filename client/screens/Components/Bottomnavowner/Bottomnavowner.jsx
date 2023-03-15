import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const BottomNavigationBarowner = ({}) => {
  const [activeTab, setActiveTab] = useState("calendar");
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
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name={activeTab === "Home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "home" ? "#C147E9" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress("HandleOwnerTerrains")}
      >
        <Ionicons
          name={activeTab === "calendar-outline" ? "calendar" : "calendar"}
          size={24}
          color={activeTab === "calendar" ? "#C147E9" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        // onPress={() => handleTabPress("Profile")}
      >
        <Ionicons
          name={activeTab === "Profile" ? "profile" : "person-outline"}
          size={24}
          color={activeTab === "profile" ? "#C147E9" : "lightgrey"}
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
          navigation.navigate("ownerlogin");
        }}
      >
        <Ionicons
          name={activeTab === "log-out-outline" ? "logout" : "log-out-sharp"}
          size={24}
          color={activeTab === "logout" ? "#C147E9" : "lightgrey"}
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
    borderTopWidth: 1,
    borderTopColor: "#C147E9",
    borderTopStartRadius: 10,
    elevation: 20,
    borderTopEndRadius: 10,
    top: -50,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomNavigationBarowner;
