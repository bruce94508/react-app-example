import React, { createRef, useMemo } from 'react';

import { OptionList, OptionListProps } from './OptionList';
import useScrollToSingleSelect from '../functions/useScrollToSingleSelect';

export interface OptionListContainerProps<OptionType> extends Omit<OptionListProps<OptionType>, 'listRefList'> {
  /**根據 option 產生 label，將覆蓋 labelOptionList 的 label 屬性 */
  getOptionLabel?: (option: OptionType) => string;
}

export function OptionListContainer<OptionType>(props: OptionListContainerProps<OptionType>) {
  const { labelOptionList, getOptionLabel, selectedIndex, onClickOption } = props;
  const refList = useMemo(() => labelOptionList.map(() => createRef<HTMLLIElement>()), [labelOptionList]);

  const handledLabelOptionList = useMemo(
    () => (getOptionLabel ? labelOptionList.map((labelOption) => ({ ...labelOption, label: getOptionLabel(labelOption.option) })) : labelOptionList),
    [labelOptionList, getOptionLabel]
  );

  useScrollToSingleSelect(refList, selectedIndex);

  return (
    <OptionList<OptionType> labelOptionList={handledLabelOptionList} refList={refList} selectedIndex={selectedIndex} onClickOption={onClickOption} />
  );
}
