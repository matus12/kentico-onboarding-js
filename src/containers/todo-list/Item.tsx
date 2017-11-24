import { connect } from 'react-redux';
import memoize from 'memoizee';
import { Item } from '../../components/todo-list/Item';
import { IAppState } from '../../IAppState';
import {
  createIndexedItem,
} from '../../reducers/todo-list/items/selectors/createIndexedItem';
import { IListItem } from '../../models/IListItem';

const createIndexedItemMemoized = memoize(createIndexedItem);

interface IProps {
  id: string;
  index: number;
}

const mapStateToProps = ({todoList: {items}}: IAppState, {id, index}: IProps) => {
  const retrievedItem: IListItem = items.get(id);
  const retrievedIndexedItem = createIndexedItemMemoized(retrievedItem, index);

  return retrievedIndexedItem;
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

export { connectedComponent as Item };
