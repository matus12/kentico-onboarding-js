import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IItemDataProps, Item } from '../../components/todo-list/Item';
import { IAppState } from '../../reducers/IAppState';
import { getIndexedItem } from '../../selectors/getIndexedItem';

interface IProps {
  readonly id: string;
  readonly index: number;
}

const mapStateToProps = (state: IAppState, { id, index }: IProps): IItemDataProps => ({
  item: getIndexedItem(state, index, id),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
