import React, { PureComponent } from 'react';
import { AddedItem } from './AddedItem';
import { generateId } from '../utils/generateId';
import { generateList } from '../utils/initItemList';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { OrderedMap } from 'immutable';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: new OrderedMap(
        generateList()
          .map((itemText) => (
            [
              generateId(),
              itemText,
            ]
            ),
          ),
      ),
    };
  }

  addItem = (newText) => {
    this.setState((prevState) => {
      return {
        items: prevState.items
          .set(generateId(), newText),
      };
    });
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
      return {
        items: prevState.items
          .delete(id),
      };
    });
  };

  saveItem = (id, savedText) => {
    this.setState((prevState) => {
      return {
        items: prevState.items
          .set(id, savedText),
      };
    });
  };

  cancel = (id) => {
    this.setIsEdited(id, false);
  };

  clickedOnText = (id) => {
    this.setIsEdited(id, true);
  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.state.items
              .entrySeq()
              .map(([uniqueKey, value], index) =>
                <Item
                  key={uniqueKey}
                  item={{ id: uniqueKey, text: value }}
                  index={index}
                  onDeleteItem={this.deleteItem}
                  onSaveItem={this.saveItem}
                  onCancel={this.cancel}
                  onTextClick={this.clickedOnText}
                />,
              )
            }
            <AddedItem onAddItem={this.addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
