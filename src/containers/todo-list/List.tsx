import memoize from 'memoizee';
import { connect } from 'react-redux';
import { List } from '../../components/todo-list/List';
import { IAppState } from '../../IAppState';
import { OrderedMap, Seq } from 'immutable';
import { ListItem } from '../../models/ListItem';

const getIds = (items: OrderedMap<string, ListItem>) => ({ids: Seq(items)});
const getIdsMemoized = memoize(getIds, {primitive: true});

const mapStateToProps = ({todoList: {items}}: IAppState) => {
  const ids = items.keySeq().toArray();

  return getIdsMemoized(ids);
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
