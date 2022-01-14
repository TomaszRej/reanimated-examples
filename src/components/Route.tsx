import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Route = ({route}) => {
  const name = route.params.name;
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})
