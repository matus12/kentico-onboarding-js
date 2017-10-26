import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlainItem } from './PlainItem';
import { EditedItem } from './EditedItem';

export class Item extends PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    setIsEdited: PropTypes.func.isRequired,
    chooseFormStyle: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      isEdited: PropTypes.bool,
    }).isRequired,
  };

  deleteItem = () => {
    this.props.onDeleteItem(this.props.item.id);
  };

  saveItem = (savedText) => {
    this.props.onSaveItem(
      this.props.item.id,
      savedText,
    );
  };

  cancelChange = () => {
    this.props.setIsEdited(
      this.props.item.id,
      false
    );
  };

  clickedOnText = () => {
    this.props.setIsEdited(
      this.props.item.id,
      true
    );
  };

  render() {
    return (
      <li className="list-group-item">
        {(this.props.item.isEdited) ?
          <EditedItem
            item={this.props.item}
            index={this.props.index}
            onSaveItem={this.saveItem}
            onDelete={this.deleteItem}
            onCancel={this.cancelChange}
            onChange={this.changeOfInput}
            chooseFormStyle={this.props.chooseFormStyle}
          /> :
          <PlainItem
            index={this.props.index}
            item={this.props.item}
            onClick={this.clickedOnText}
          />
        }
      </li>
    );
  }
}
