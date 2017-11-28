import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { IndexedItem } from '../../models/IndexedItem';

interface IProps {
  item: IndexedItem;
  onEditStart: () => IAction;
}

export const PlainItem = (props: IProps) =>
  <div onClick={props.onEditStart}>
    {props.item.index + '. ' + props.item.text}
  </div>;
