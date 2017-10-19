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
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      textBackup: props.text,
    };
  }

  onDelete = () => {
    this.props.actionDelete(this.props.index);
  };

  onSaveItem = () => {
    this.setState({
      textBackup: this.state.text,
    });
    this.props.onSaveItem(this.props.index, this.state.text);
    this.props.setIsEdited(this.props.index, false);
  };

  onCancel = () => {
    this.setState({
      text: this.state.textBackup,
    });
    this.props.onCancel(this.props.index);
    this.props.setIsEdited(this.props.index, false);
  };

  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  onClick = () => {
    this.props.setIsEdited(this.props.index, true);
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
