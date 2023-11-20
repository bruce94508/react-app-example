import { TextFieldProps } from '@mui/material';
import useDelayCallback from 'functions/hooks/useDelayCallback';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import type { Ref, ChangeEvent } from 'react';

import { Autocomplete, AutocompleteProps } from './components/Autocomplete';

export type AutocompleteInputValueHandle = {
  clearInputValue: () => void;
  setInputValue: (value: string) => void;
  getInputValue: () => string;
};

export interface AutocompleteWithQueryProps<OptionType> extends Omit<AutocompleteProps<OptionType>, 'value' | 'onChange'> {
  /**元件內部管理有value狀態, 只需傳入初始值*/
  initInputValue?: string;
  queryDelayTime?: number;
  onQueryOptionList: (value: string) => void;
  /**內部已管理有value狀態, 不需包含setValue*/
  onChange?: TextFieldProps['onChange'];
  /** 暴露直接操作元件內部狀態之方法 */
  autocompleteWithQueryRef?: Ref<AutocompleteInputValueHandle>;
}

/**管理inputValue狀態及query之執行 */
export function AutocompleteWithQuery<OptionType>(props: AutocompleteWithQueryProps<OptionType>) {
  const {
    initInputValue = '',
    labelOptionList,
    onChange,
    onClickOption,
    onQueryOptionList,
    getOptionLabel,
    queryDelayTime = 500,
    autocompleteWithQueryRef,
    ...otherProps
  } = props;
  const [value, setValue] = useState(initInputValue);

  const handleChange: AutocompleteProps<OptionType>['onChange'] = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );
  const handleClickOption = useCallback(
    (option: OptionType, label?: string) => {
      if (getOptionLabel) {
        setValue(getOptionLabel(option));
      } else {
        label && setValue(label);
      }
      onClickOption(option, label);
    },
    [getOptionLabel, onClickOption]
  );

  const handleCancel = useCallback(() => {
    setValue('');
  }, []);

  const { handleDelayedCallback } = useDelayCallback({
    delayTime: queryDelayTime,
  });

  useImperativeHandle(autocompleteWithQueryRef, () => {
    return {
      clearInputValue: () => setValue(''),
      setInputValue: (value: string) => setValue(value),
      getInputValue: () => value,
    };
  });

  useEffect(() => {
    handleDelayedCallback(() => onQueryOptionList(value));
  }, [handleDelayedCallback, onQueryOptionList, value]);

  return (
    <Autocomplete<OptionType>
      value={value}
      onChange={handleChange}
      onCancel={handleCancel}
      onClickOption={handleClickOption}
      labelOptionList={labelOptionList}
      {...otherProps}
    />
  );
}
