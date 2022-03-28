import { useCallback } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useToggleMultiSelect = (
  selectedOptions: string[],
  setSelectedOptions: (value: string[]) => void,
): ((id: any) => void) => {
  const setToggle = useCallback(
    id => {
      const currentIndex = selectedOptions.indexOf(id);
      const newChecked = [...selectedOptions];

      if (currentIndex === -1) {
        newChecked.push(id);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedOptions(newChecked);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedOptions.length],
  );

  return setToggle;
};
