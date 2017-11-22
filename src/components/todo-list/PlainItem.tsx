import * as React from 'react';
import { IListItem } from '../../models/IListItem';
import { IAction } from '../../actions/IAction';

interface IProps {
  index: number;
  item: IListItem;
  onEditStart: () => IAction;
}

export const PlainItem = (props: IProps) =>
  <div onClick={props.onEditStart}>
    {props.index + '. ' + props.item.text}
  </div>;
