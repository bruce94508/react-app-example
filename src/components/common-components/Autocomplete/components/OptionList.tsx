import { Box, Paper } from '@mui/material';
import React, { ReactNode } from 'react';

import { OptionListItem } from './OptionListItem';

export type LabelOption<OptionType> = {
  icon?: ReactNode;
  /**如無 label 屬性，則須有 getOptionLabel 以製作 label */
  label?: string;
  option: OptionType;
};

export interface OptionListProps<OptionType> {
  labelOptionList: LabelOption<OptionType>[];
  /** 目前僅用於控制 selected 選項進入視野 */
  refList?: React.RefObject<HTMLLIElement>[];
  /** 目前僅用於套用選取狀態之樣式 */
  selectedIndex?: number;
  /**受控元件, selectedOption 需透過onClickOption由父層管理 */
  onClickOption: (option: OptionType, label?: string) => void;
  className?: string;
}

// RenToDo 缺少 loding/error 狀態, 看是否以 LoadingErrorEmptyMessageWrapper 包覆
export function OptionList<OptionType>(props: OptionListProps<OptionType>) {
  const { labelOptionList, refList, selectedIndex, onClickOption, className } = props;

  return labelOptionList.length > 0 ? (
    <Box
      sx={{
        width: '100%',
        position: 'absolute',
        top: 'calc(100% + 5px)',
        zIndex: 10000,
      }}
      className={className}>
      <Paper
        sx={{
          maxHeight: 300,
          overflowY: 'scroll',
        }}>
        <ul style={{ padding: 0, margin: 0 }}>
          {labelOptionList.map((labelOption, i) => {
            const { label = '', option, icon } = labelOption;
            return (
              <OptionListItem<OptionType>
                key={i}
                listItemRef={refList?.[i]}
                icon={icon}
                label={label}
                option={option}
                isSelected={selectedIndex === i}
                onClick={() => onClickOption(option, label)}
              />
            );
          })}
        </ul>
      </Paper>
    </Box>
  ) : null;
}
