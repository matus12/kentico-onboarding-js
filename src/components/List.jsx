import React, { PureComponent } from 'react';
import { AddedItemRedux } from '../containers/todo-list/AddedItem';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { ListItem } from '../models/ListItem';

export class List extends PureComponent {

  deleteItem = (id) => {
    this.setState((prevState) => ({
      items: prevState.items
        .delete(id),
    }));
  };

  saveItem = (id, savedText) => {
    const item = new ListItem({
      id,
      text: savedText,
      isEdited: false,
    });

    this.props.onUpdateItem(item);
  };

  setIsEdited = (id, isEdited) => {
    const item = this.props.items.get(id);

    const editedItem = new ListItem({
      id,
      text: item.text,
      isEdited,
    });

    this.props.onUpdateItem(editedItem);
  };

  cancel = (id) => {
    this.setIsEdited(id, false);
  };

  clickOnText = (id) => {
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
            {this.props.items
              .entrySeq()
              .map(([uniqueKey, item], index) =>
                <Item
                  key={uniqueKey}
                  item={item}
                  index={index + 1}
                  onDeleteItem={this.deleteItem}
                  onSaveItem={this.saveItem}
                  onCancel={this.cancel}
                  onTextClick={this.clickOnText}
                />,
              )
            }
            <AddedItemRedux />
          </ul>
        </div>
      </div>
    );
  }
}
