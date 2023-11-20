import { Box, ListItem, ListItemText } from '@mui/material';
import React, { ReactNode, Ref } from 'react';

export interface OptionListItemProps<OptionType> {
  index?: number;
  icon?: ReactNode;
  /**用以呈現選項*/
  label: string;
  /**目前選項呈現僅使用到 label, option 屬性保留供擴充 */
  option?: OptionType;
  listItemRef?: Ref<any>;
  /**用於套用選取狀態之樣式 */
  isSelected?: boolean;
  onClick?: () => any;
}

export function OptionListItem<OptionType>(props: OptionListItemProps<OptionType>) {
  const { listItemRef, icon, label, isSelected, onClick } = props;

  return (
    <ListItem button ref={listItemRef} selected={isSelected} onClick={onClick}>
      <Box display="flex" alignItems="center">
        {icon && (
          <Box display="flex" alignItems="center" padding={0.5}>
            {icon}
          </Box>
        )}
        <ListItemText primary={label} />
      </Box>
    </ListItem>
  );
}
