import * as React from 'react';
import { IAction } from '../../actions/IAction';

interface IProps {
  index: number;
  text: string;
  onEditStart: () => IAction;
}

export const PlainItem = (props: IProps) =>
  <div onClick={props.onEditStart}>
    {props.index + '. ' + props.text}
  </div>;
