import React from 'react';
import { AddedItemRedux } from '../containers/todo-list/AddedItem';
import { TsComponent } from './TsComponent.tsx';
import { ItemRedux } from '../containers/todo-list/Item';
import PropTypes from 'prop-types';
import { OrderedMap } from 'immutable';

export function List(props) {
  return (
    <div className="row">
      <div className="row">
        <div className="col-sm-12 text-center">
          <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
        </div>
      </div>
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {props.items
            .entrySeq()
            .map(([uniqueKey, item], index) =>
              <ItemRedux
                key={uniqueKey}
                item={item}
                index={index + 1}
              />,
            )
          }
          <AddedItemRedux />
        </ul>
      </div>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.instanceOf(OrderedMap).isRequired,
};
