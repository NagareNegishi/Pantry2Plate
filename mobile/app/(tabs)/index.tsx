/**
 * index.tsx
 * simply redirects to the default tab (generate) when the user visits the root of the tabs section.
 */
import { Redirect } from 'expo-router';

export default function TabsIndex() {
  return <Redirect href="/(tabs)/generate" />;
}