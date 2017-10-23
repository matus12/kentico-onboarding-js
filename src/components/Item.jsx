import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlainItem } from './PlainItem';
import { EditedItem } from './EditedItem';

export class Item extends PureComponent {
  static propTypes = {
    actionDelete: PropTypes.func.isRequired,
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

  onDelete = () => {
    this.props.actionDelete(this.props.item.id);
  };

  onSaveItem = (savedText) => {
    this.setState({
      text: savedText,
      textBackup: savedText,
      isEdited: false,
    });
    this.props.onSaveItem(
      this.props.item.id,
      savedText
    );
  };

  onCancel = () => {
    this.setState({
      text: this.state.textBackup,
      isEdited: false,
    });
  };

  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  onClick = () => {
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
            onSaveItem={this.onSaveItem}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
            onChange={this.onChange}
          /> :
          <PlainItem
            index={this.props.index + 1}
            item={this.props.item}
            onClick={this.onClick}
          />
        }
      </li>
    );
  }
}
