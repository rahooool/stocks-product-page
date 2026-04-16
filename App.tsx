import { Platform, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import StocksProductPage from './StocksProductPage';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'GrowwSans-Regular': require('./assets/fonts/GrowwSans-Regular.otf'),
    'GrowwSans-Medium':  require('./assets/fonts/GrowwSans-Medium.otf'),
    'GrowwSans-Bold':    require('./assets/fonts/GrowwSans-Bold.otf'),
    'GrowwSans-Light':   require('./assets/fonts/GrowwSans-Light.otf'),
    'Sohne-Kraftig':     require('./assets/fonts/Sohne-Kraftig.otf'),
  });

  // Render once fonts are ready or if there's an error (fall back to system font)
  if (!fontsLoaded && !fontError) return null;

  if (Platform.OS !== 'web') return <StocksProductPage />;

  return (
    <View style={styles.webShell}>
      <View style={styles.deviceFrame}>
        <StocksProductPage />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webShell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },
  deviceFrame: {
    width: 360,
    height: 800,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});
