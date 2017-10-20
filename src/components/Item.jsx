import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlainText } from './PlainText';
import { EditedText } from './EditedText';

export class Item extends PureComponent {
  static propTypes = {
    onSaveItem: PropTypes.func.isRequired,
    setIsEdited: PropTypes.func.isRequired,
    actionDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.item.text,
      textBackup: props.item.text,
    };
  }

  onDelete = () => {
    this.props.actionDelete(this.props.item.id);
  };

  onSaveItem = () => {
    this.setState({
      textBackup: this.state.text,
    });
    this.props.onSaveItem(this.props.item.id, this.state.text);
    this.props.setIsEdited(this.props.item.id, false);
  };

  onCancel = () => {
    this.setState({
      text: this.state.textBackup,
    });
    this.props.onCancel(this.props.item.id);
    this.props.setIsEdited(this.props.item.id, false);
  };

  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  onClick = () => {
    this.props.setIsEdited(this.props.item.id, true);
  };

  render() {
    return (
      <li className="list-group-item">
        {(this.props.item.isEdited) ?
          <EditedText
            text={this.state.text}
            onSaveItem={this.onSaveItem}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
            onChange={this.onChange}
          /> :
          <div onClick={this.onClick}>
            <PlainText
              index={this.props.index + 1}
              text={this.state.text}
            />
          </div>}
      </li>
    );
  }
}
