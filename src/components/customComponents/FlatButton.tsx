import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent, Button } from "react-native";

interface FlatButtonProps{
  title:string;
  onPress:((event: GestureResponderEvent) => void);
}

const FlatButton: React.FC<FlatButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#2f89fc",
    marginHorizontal: 60,
    marginBottom:10
  },
  buttonText: {
    color: "#E4E6eb",
    fontFamily: "NunitoBold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

export default FlatButton;
