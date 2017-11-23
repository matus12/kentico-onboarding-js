import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { validateText } from '../../utils/validateText';
import { Input } from './Input';

export class EditedItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditStop: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isInputValid: true,
    };
  }

  changeItemText = (event) => {
    this.setState({
      editedText: event.currentTarget.value,
      isInputValid: validateText(event.currentTarget.value),
    });
  };

  saveItem = () => {
    this.props.onUpdateItem(
      this.state.editedText,
    );
  };

  render() {
    const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'Empty item cannot be stored.\nTip: Use delete button to remove an item';

    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="input-group">
            <span className="input-group-addon">
              {this.props.index}.
            </span>
            <Input
              value={this.state.editedText}
              isValid={this.state.isInputValid}
              onChange={this.changeItemText}
              title={invalidTextTitle}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.saveItem}
          title={invalidTextTitle}
          disabled={!this.state.isInputValid}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.props.onEditStop}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDeleteItem}
        >
          Delete
        </button>
      </div>
    );
  }
}
