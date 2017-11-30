import * as memoize from 'memoizee';
import { connect } from 'react-redux';
import { List } from '../../components/todo-list/List';
import { IAppState } from '../../IAppState';
import { Seq } from 'immutable';

const getIds = (items: string[]) => ({ids: Seq(items)});
const getIdsMemoized = memoize(getIds, {primitive: true});

const mapStateToProps = ({todoList: {items}}: IAppState) => {
  const ids: string[] = items.keySeq().toArray();

  return getIdsMemoized(ids);
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
