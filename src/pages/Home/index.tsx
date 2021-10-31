import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Container } from './styles';
interface INavigation extends NativeStackNavigationProp<any, any> {}

const Home: React.FC = () => {
  const navigation = useNavigation<INavigation>();

  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          navigation.navigate("AnimateCircleSize");
        }}
      >
        <Text style={styles.labelButton}>Change circle size</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          navigation.navigate("SwipeDownModal");
        }}
      >
        <Text style={styles.labelButton}>Swipe Down Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  menuButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgb(0,156,256)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
    marginTop:20
  },

  labelButton: {
    color: "#FFF",
    fontSize: 19,
  },
});
