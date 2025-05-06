import { ScrollView, View, type ViewProps } from 'react-native';
import { ThemedView } from './ThemedView';

interface scroll {
  children: React.ReactNode;
}

export function ThemedScroll({ children }:scroll) {
  return (
  <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
    <ThemedView style={{flex:1}}>
      {children}
    </ThemedView>
  </ScrollView>
  );
}
