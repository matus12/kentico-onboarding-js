import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { IndexedItem } from '../../models/IndexedItem';
import * as PropTypes from 'prop-types';

interface IPlainItemDataProps {
  item: IndexedItem;
}

export interface IPlainItemCallbackProps {
  onEditStart: () => IAction;
}

const PlainItem: React.SFC<IPlainItemCallbackProps & IPlainItemDataProps> = (props: IPlainItemCallbackProps & IPlainItemDataProps) =>
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
