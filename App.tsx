import { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import HomePage from './HomePage';
import StocksProductPage from './StocksProductPage';
import ProfilePage from './ProfilePage';
import { StockConfig, STOCK_CONFIGS } from './stocks';
import { useTheme, colors } from './tokens';

type Screen = 'home' | 'stocks' | 'profile';

function AppContent() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedStock, setSelectedStock] = useState<StockConfig>(STOCK_CONFIGS.ZOMATO);

  if (screen === 'stocks') {
    return <StocksProductPage key={selectedStock.symbol} stock={selectedStock} onBack={() => setScreen('home')} />;
  }
  if (screen === 'profile') {
    return <ProfilePage onBack={() => setScreen('home')} />;
  }
  return (
    <HomePage
      onNavigateToStocks={(stock) => {
        setSelectedStock(stock);
        setScreen('stocks');
      }}
      onNavigateToProfile={() => setScreen('profile')}
    />
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'GrowwSans-Regular': require('./assets/fonts/GrowwSans-Regular.otf'),
    'GrowwSans-Medium':  require('./assets/fonts/GrowwSans-Medium.otf'),
    'GrowwSans-Bold':    require('./assets/fonts/GrowwSans-Bold.otf'),
    'GrowwSans-Light':   require('./assets/fonts/GrowwSans-Light.otf'),
    'Sohne-Kraftig':     require('./assets/fonts/Sohne-Kraftig.otf'),
  });

  if (!fontsLoaded && !fontError) return null;

  if (Platform.OS !== 'web') return <AppContent />;

  return <WebShell />;
}

function WebShell() {
  useTheme();
  return (
    <View style={[styles.webShell, { backgroundColor: colors.backgroundTertiary }]}>
      <View style={[styles.deviceFrame, { backgroundColor: colors.backgroundPrimary }]}>
        <AppContent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webShell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceFrame: {
    width: 360,
    height: 800,
    overflow: 'hidden',
  },
});
