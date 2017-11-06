import React, { PureComponent } from 'react';
import { AddedItem } from './AddedItem';
import { generateId } from '../utils/generateId';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { generateItems } from '../utils/generateItems';
import { ItemRecord } from '../utils/itemRecord';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: generateItems(),
    };
  }

  addItem = (newText) => {
    const guid = generateId();

    this.setState((prevState) => ({
      items: prevState.items
        .set(guid, new ItemRecord({
          id: guid,
          text: newText,
        })),
    }));
  };

  deleteItem = (id) => {
    this.setState((prevState) => ({
      items: prevState.items
        .delete(id),
    }));
  };

  saveItem = (guid, savedText) => {
    this.setState((prevState) => ({
      items: prevState.items
        .set(guid, new ItemRecord({
          id: guid,
          text: savedText,
        })),
    }));
  };

  setIsEdited = (guid, edited) => {
    this.setState((prevState) => ({
      items: prevState.items
        .set(guid, new ItemRecord({
          id: guid,
          text: this.state.items
            .get(guid).text,
          isEdited: edited,
        })),
    }));
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
              .map(([uniqueKey, mapItem], index) =>
                <Item
                  key={uniqueKey}
                  item={mapItem}
                  index={index + 1}
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
