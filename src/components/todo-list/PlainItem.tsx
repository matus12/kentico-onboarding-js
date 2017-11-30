import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { IndexedItem } from '../../models/IndexedItem';
import { PropTypes } from 'react';

interface IProps {
  item: IndexedItem;
  onEditStart: () => IAction;
}

const PlainItem: React.SFC<IProps> = (props: IProps) =>
  <div onClick={props.onEditStart}>
    {props.item.index + '. ' + props.item.text}
  </div>;

PlainItem.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onEditStart: PropTypes.func.isRequired,
};

export { PlainItem }
