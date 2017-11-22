import * as React from 'react';
import { IListItem } from '../../models/IListItem';

interface IProps {
  index: number;
  item: IListItem;
  onEditStart: () => void;
}

export const PlainItem = (props: IProps) =>
  <div onClick={props.onEditStart}>
    {props.index + '. ' + props.item.text}
  </div>;
