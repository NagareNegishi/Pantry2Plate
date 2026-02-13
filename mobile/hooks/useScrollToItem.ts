/**
 * Custom hook to scroll to a specific item in a ScrollView when the active index changes.
 */
import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';

export function useScrollToItem(activeIndex: number | null) {
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<{ [key: number]: View | null }>({});

  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({
            y: y - 20,
            animated: true
          });
        },
        () => {}
      );
    }
  }, [activeIndex]);

  const setItemRef = (index: number) => (ref: View | null) => {
    itemRefs.current[index] = ref;
  };

  return { scrollViewRef, setItemRef };
}