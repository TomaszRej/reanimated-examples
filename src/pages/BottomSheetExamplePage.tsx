import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import BottomSheet from "../components/BottomSheet";

export const BottomSheetExamplePage = () => {
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.rootView}>
      <View style={styles.buttonWrapper}>
        <Button title="open" onPress={() => setOpen(!open)} />
      </View>
      <BottomSheet open={open}/>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  buttonWrapper: {
    paddingTop: 20
  }
});
