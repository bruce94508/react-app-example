import { Close } from '@mui/icons-material';
import { Box, TextField, TextFieldProps, InputAdornment } from '@mui/material';
import useDelayCallback from 'functions/hooks/useDelayCallback';
import { useOpenState } from 'functions/hooks/useOpenState';
import React, { useCallback, useMemo, useEffect, useImperativeHandle } from 'react';
import type { ChangeEvent, FocusEvent, Ref } from 'react';

import { OptionListContainer, OptionListContainerProps } from './OptionListContainer';
import { useFnsByKeyCode, useAutocomplete } from '../functions';

export interface AutocompleteBaseProps<OptionType> extends OptionListContainerProps<OptionType> {
  isShowOption?: boolean;
  /**給textField的label, 與placeholder擇一使用 */
  label?: string;
  placeholder?: string;
  value: string;
  /**受控元件, onChange內須包含setValue */
  onChange: TextFieldProps['onChange'];
  onFocus?: TextFieldProps['onFocus'];
  onCancel?: () => void;
  /**點擊背景時呼叫 onCloseOptionList 關閉選單 */
  onCloseOptionList?: () => any;
  /**主要利用InputProps插入客製修飾, 如有endAdornment將會覆蓋預設的取消按鈕  */
  textFieldOtherProps?: TextFieldProps;
  /**覆蓋Autocomplete最外層Box的className */
  className?: string;
}

export type AutocompleteOptionListHandle = {
  isShowOption: boolean;
  showOption: () => void;
  closeOption: () => void;
};

export interface AutocompleteProps<OptionType> extends Omit<AutocompleteBaseProps<OptionType>, 'isShowOption' | 'selectedIndex'> {
  initShowOption?: boolean;
  onOpenOptionList?: () => any;
  autocompleteRef?: Ref<AutocompleteOptionListHandle>;
}

/**供 Autocomplete 元件內部使用 */
function AutocompleteBase<OptionType>(props: AutocompleteBaseProps<OptionType>) {
  const { className, textFieldOtherProps, label, placeholder, value, onChange, onFocus, isShowOption, onCloseOptionList, ...OptionListProps } = props;
  const handledTextFieldOtherProps = useMemo(
    () => ({
      ...textFieldOtherProps,
      inputProps: {
        'aria-label': label ?? placeholder,
        ...textFieldOtherProps?.inputProps,
      },
      InputProps: {
        endAdornment: props.value ? (
          <InputAdornment
            position="end"
            style={{
              borderRadius: '0px 100% 100% 0px',
              cursor: 'pointer',
              zIndex: 1050,
            }}
            onClick={props.onCancel}>
            <Close style={{ fill: '#888' }} />
          </InputAdornment>
        ) : undefined,
        ...textFieldOtherProps?.InputProps,
      },
    }),
    [label, placeholder, props.onCancel, props.value, textFieldOtherProps]
  );

  const { handleDelayedCallback } = useDelayCallback({ delayTime: 300 });
  const handleBlur = () => handleDelayedCallback(onCloseOptionList);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        paddingRight: '8px',
        zIndex: 'inherit',
      }}>
      <TextField
        {...handledTextFieldOtherProps}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        value={value}
        label={label}
        placeholder={placeholder}
        fullWidth
      />
      {isShowOption && <OptionListContainer {...OptionListProps} />}
    </Box>
  );
}

/**管理選單開關狀態及點擊（不包含過濾功能）, value及selectedOption則由父層管理 */
export function Autocomplete<OptionType>(props: AutocompleteProps<OptionType>) {
  const {
    initShowOption = false,
    onOpenOptionList,
    onCloseOptionList,
    onFocus,
    onChange,
    onClickOption,
    autocompleteRef,
    labelOptionList,
    ...otherProps
  } = props;
  const { isOpen: isShowOption, setOpen: showOption, setClose: closeOption } = useOpenState(initShowOption);
  const { handleSelectOption, handleSelectOptionByIndex } = useAutocomplete({
    showOption,
    closeOption,
    onClickOption,
    labelOptionList,
  });

  const { index, setIndex } = useFnsByKeyCode({
    inUse: isShowOption,
    lastIndex: labelOptionList.length - 1,
    confirmFn: handleSelectOptionByIndex,
    escapeFn: closeOption,
  });

  const handleCloseOption = useCallback(() => {
    isShowOption && onCloseOptionList && onCloseOptionList();
    closeOption();
  }, [isShowOption, closeOption, onCloseOptionList]);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      if (e.target.value) {
        showOption();
      }
    },
    [onFocus, showOption]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (e.target.value) {
        showOption();
      } else {
        handleCloseOption();
      }
    },
    [onChange, showOption, handleCloseOption]
  );

  useEffect(() => {
    if (isShowOption) {
      onOpenOptionList?.();
    }
    if (!isShowOption) {
      setIndex(0);
    }
  }, [isShowOption, onOpenOptionList, setIndex]);

  useImperativeHandle(
    autocompleteRef,
    () => ({
      isShowOption,
      showOption,
      closeOption: handleCloseOption,
    }),
    [isShowOption, showOption, handleCloseOption]
  );

  return (
    <AutocompleteBase
      labelOptionList={labelOptionList}
      isShowOption={isShowOption}
      selectedIndex={index}
      onClickOption={handleSelectOption}
      onCloseOptionList={handleCloseOption}
      onFocus={handleFocus}
      onChange={handleChange}
      {...otherProps}
    />
  );
}
