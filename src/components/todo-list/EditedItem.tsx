import * as React from 'react';
import { validateText } from '../../utils/validateText';
import { Input } from './Input';
import { IAction } from '../../actions/IAction';
import { IndexedItem } from '../../models/IndexedItem';
import { PropTypes } from 'react';

interface IProps {
  item: IndexedItem;
  onUpdateItem: (text: string) => IAction;
  onEditStop: () => IAction;
  onDeleteItem: () => IAction;
}

interface IState {
  editedText: string;
  isInputValid: boolean;
}

export class EditedItem extends React.PureComponent<IProps, IState> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditStop: PropTypes.func.isRequired,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isInputValid: true,
    };
  }

  changeItemText = (event: React.FormEvent<HTMLInputElement>) => {
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
    const invalidTextTitle: string | undefined = (this.state.isInputValid)
      ? undefined
      : 'Empty item cannot be stored.\nTip: Use delete button to remove an item';

    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="input-group">
            <span className="input-group-addon">
              {this.props.item.index}.
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
