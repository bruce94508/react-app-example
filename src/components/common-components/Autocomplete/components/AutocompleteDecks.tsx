import { TextFieldProps } from '@mui/material';
import React, { ReactNode } from 'react';

import { Autocomplete, AutocompleteProps } from './Autocomplete';

type renderProps<T> = AutocompleteProps<T> & {
  [index: string]: any;
};

export interface AutocompleteDecksProps<OptionType, Names extends string = 'from' | 'to'> {
  namedLabelOptionList: Record<Names, AutocompleteProps<OptionType>['labelOptionList']>;
  /**受控元件不管理狀態, 接收 namedInputValue 決定輸入框顯示值 */
  namedInputValue: Record<Names, string>;
  /**受控元件, 應包含 namedInputValue set state 處理, 使用 input name 屬性辨識 stateName */
  onChange: TextFieldProps['onChange'];
  /**HOF, 回傳函式內建議包含 namedSelectedOption set state 處理 */
  onClickOption: (name: Names) => AutocompleteProps<OptionType>['onClickOption'];
  getOptionLabel?: AutocompleteProps<OptionType>['getOptionLabel'];
  textFieldOtherProps?: AutocompleteProps<OptionType>['textFieldOtherProps'];
  render?: (props: renderProps<OptionType>) => ReactNode;
}

/**無狀態之受控元件, 負責安排 Autocomplete */
export function AutocompleteDecks<Names extends string, OptionType>(props: AutocompleteDecksProps<OptionType, Names>) {
  const { namedLabelOptionList, namedInputValue, onChange, onClickOption, textFieldOtherProps, render } = props;
  // FIXME 看能否不用斷言, 詳 https://fettblog.eu/typescript-iterating-over-objects/
  const names = Object.keys(namedLabelOptionList) as Names[];

  return (
    <>
      {names.map((name, i) => {
        const renderProps = {
          value: namedInputValue[name],
          labelOptionList: namedLabelOptionList[name],
          onChange,
          onClickOption: onClickOption(name),
          textFieldOtherProps: { name, ...textFieldOtherProps },
        };
        return render ? render({ ...renderProps }) : <Autocomplete<OptionType> key={name} {...renderProps} />;
      })}
    </>
  );
}
