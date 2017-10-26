import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlainItem } from './PlainItem';
import { EditedItem } from './EditedItem';

export class Item extends PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.item.text,
      textBackup: props.item.text,
      isEdited: false,
    };
  }

  deleteItem = () => {
    this.props.onDeleteItem(this.props.item.id);
  };

  saveItem = (savedText) => {
    this.setState({
      text: savedText,
      textBackup: savedText,
      isEdited: false,
    });
    this.props.onSaveItem(
      this.props.item.id,
      savedText,
    );
  };

  cancelChange = () => {
    this.setState({
      text: this.state.textBackup,
      isEdited: false,
    });
  };

  changeOfInput = (event) => {
    this.setState({ text: event.target.value });
  };

  clickedOnText = () => {
    this.setState({
      isEdited: true,
    });
  };

  render() {
    return (
      <li className="list-group-item">
        {(this.state.isEdited) ?
          <EditedItem
            item={this.props.item}
            index={this.props.index}
            onSaveItem={this.saveItem}
            onDelete={this.deleteItem}
            onCancel={this.cancelChange}
            onChange={this.changeOfInput}
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
