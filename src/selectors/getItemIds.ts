import * as memoize from 'memoizee';
import { Seq } from 'immutable';
import { IAppState } from '../models/IAppState';

const getIds = (items: string[]): Seq.Indexed<string> => Seq(items);

const getIdsMemoized = memoize(getIds, { primitive: true });

export const getItemIds = ({ todoList: { items } }: IAppState): Seq.Indexed<string> =>
  getIdsMemoized(items.keySeq().toArray());
