import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log('fsdfs')
  return (
    <View style={styles.container}>
      <Text>... up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2c2c2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
