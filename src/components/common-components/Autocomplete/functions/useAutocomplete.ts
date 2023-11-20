import { useCallback } from 'react';

import { AutocompleteProps } from '../components/Autocomplete';

interface UseAutocompleteOptions<OptionType> extends Pick<AutocompleteProps<OptionType>, 'labelOptionList' | 'onClickOption'> {
  showOption: () => void;
  closeOption: () => void;
}

function useAutocomplete<OptionType>({ showOption, closeOption, labelOptionList, onClickOption }: UseAutocompleteOptions<OptionType>) {
  const handleSelectOption = useCallback(
    (option: OptionType, label?: string) => {
      onClickOption?.(option, label);
      closeOption();
    },
    [onClickOption, closeOption]
  );

  const handleSelectOptionByIndex = useCallback(
    (index: number) => {
      const selectedOption = labelOptionList[index]?.option;
      const selectedLabel = labelOptionList[index]?.label;
      selectedOption && handleSelectOption(selectedOption, selectedLabel);
    },
    [handleSelectOption, labelOptionList]
  );

  return {
    showOption,
    closeOption,
    handleSelectOptionByIndex,
    handleSelectOption,
  };
}

export default useAutocomplete;
