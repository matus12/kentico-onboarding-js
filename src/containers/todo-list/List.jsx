import memoize from 'memoizee';
import { connect } from 'react-redux';
import { List } from '../../components/todo-list/List';
import { Seq } from 'immutable';

const getIds = items => ({ ids: Seq(items) });
const getIdsMemoized = memoize(getIds, { primitive: true });

const mapStateToProps = ({ todoList: { items } }) => {
  const ids = items.keySeq().toArray();

  return getIdsMemoized(ids);
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
