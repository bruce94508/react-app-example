import { useEffect } from 'react';

const defaultScrollIntoViewOptions: ScrollIntoViewOptions = {
  block: 'nearest',
  // behavior: 'smooth',
};

const useScrollToSingleSelect = (
  refList: React.RefObject<HTMLDivElement | HTMLLIElement>[],
  selectedIndex: number | undefined,
  scrollIntoViewOptions = defaultScrollIntoViewOptions
) => {
  useEffect(() => {
    if (typeof selectedIndex === 'number') {
      const selectedRef = refList[selectedIndex];
      if (selectedRef?.current?.scrollIntoView) {
        selectedRef.current.scrollIntoView(scrollIntoViewOptions);
      }
    }
  }, [selectedIndex, refList]);

  return {};
};

export default useScrollToSingleSelect;
