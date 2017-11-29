import  * as React from 'react';
import { validateText } from '../../utils/validateText';
import { Input } from './Input';
import { IAction } from '../../actions/IAction';
import { PropTypes } from 'react';

interface IState {
  inputText: string;
  isInputValid: boolean;
}

interface IProps {
  onAddItem: (text: string) => IAction;
}

export class AddedItem extends React.PureComponent<IProps, IState> {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props: IProps) {
    super(props);

    this.state = ({
      inputText: '',
      isInputValid: false,
    });
  }

  changeItemText = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      inputText: event.currentTarget.value,
      isInputValid: validateText(event.currentTarget.value),
    });
  };

  addItem = () => {
    this.props.onAddItem(this.state.inputText);
    this.setState({
      inputText: '',
      isInputValid: false,
    });
  };

  render() {
    const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'New item must consist of non-empty text';

    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <Input
            value={this.state.inputText}
            isValid={this.state.isInputValid}
            onChange={this.changeItemText}
            title={invalidTextTitle}
          />
        </div>
        <button
          type="button"
          title={invalidTextTitle}
          className="btn btn-primary"
          disabled={!this.state.isInputValid}
          onClick={this.addItem}
        >
          Add
        </button>
      </li>
    );
  }
}
