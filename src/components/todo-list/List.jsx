import React from 'react';
import { AddedItem } from '../../containers/todo-list/AddedItem';
import { TsComponent } from './TsComponent.tsx';
import { Item } from '../../containers/todo-list/Item';
import PropTypes from 'prop-types';
import { Seq } from 'immutable';

export const List = props =>
  <div className="row">
    <div className="row">
      <div className="col-sm-12 text-center">
        <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
      </div>
    </div>
    <div className="col-sm-12 col-md-offset-2 col-md-8">
      <ul className="list-group">
        {props.ids
          .map((id, index) =>
            <Item
              key={id}
              id={id}
              index={index + 1}
            />,
          )
        }
        <AddedItem />
      </ul>
    </div>
  </div>;

List.propTypes = {
  ids: PropTypes.instanceOf(Seq).isRequired,
};
