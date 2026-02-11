import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SavedScreen() {
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText
              type="title"
              style={{
                fontFamily: Fonts.rounded,
                fontSize: 32,
                // fontStyle: 'italic',
                // fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: '#f6f1ac',  // Fill color
                textShadowColor: '#000000',  // Outline color
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              Find new recipes
            </ThemedText>
          </ThemedView>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 80,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    backgroundColor: 'transparent'
  }
});
