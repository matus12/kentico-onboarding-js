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
      isEdited: false,
    };
  }

  deleteItem = () => {
    this.props.onDeleteItem(this.props.item.id);
  };

  saveItem = (savedText) => {
    this.setState({
      isEdited: false,
    });
    this.props.onSaveItem(
      this.props.item.id,
      savedText,
    );
  };

  cancelChange = () => {
    this.setState({
      isEdited: false,
    });
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
