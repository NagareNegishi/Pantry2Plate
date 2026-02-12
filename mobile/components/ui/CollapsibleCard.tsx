/**
 * CollapsibleCard component for React Native
 * This component renders a card that can be expanded or collapsed to show/hide its content.
 * It includes a header with a customizable title and an icon that indicates the expansion state.
 * The content is displayed only when the card is expanded.
 */
import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// if icon is needed
// import { IconSymbol } from '@/components/ui/icon-symbol';

/**
 * Props for the CollapsibleCard component
 */
interface CollapsibleCardProps extends PropsWithChildren {
  header: React.ReactNode;  // Custom header
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * CollapsibleCard component
 * @param CollapsibleCardProps as destructured props
 * @returns A card that can be expanded or collapsed to show/hide its content
 */
export function CollapsibleCard({
  header,
  isExpanded,
  onToggle,
  children
}: CollapsibleCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.8}
        style={styles.headerContainer}
      >
        {/* if icon is needed, add here
        <IconSymbol
          name="chevron.right"
          size={20}
          color="#374151"
          style={{
            transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
            marginRight: 8
          }}
        /> */}
        <View style={{ flex: 1 }}>
          {header}
        </View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    padding: 12,
    paddingTop: 0,
  }
});