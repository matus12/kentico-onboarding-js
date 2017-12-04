import  * as React from 'react';
import { validateText } from '../../utils/validateText';
import { Input } from './Input';
import * as PropTypes from 'prop-types';

interface IState {
  readonly inputText: string;
  readonly isInputValid: boolean;
}

export interface IAddedItemCallbackProps {
  onAddItem: (text: string) => void;
}

export class AddedItem extends React.PureComponent<IAddedItemCallbackProps, IState> {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props: IAddedItemCallbackProps) {
    super(props);

    this.state = ({
      inputText: '',
      isInputValid: false,
    });
  }

  changeItemText = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      inputText: event.currentTarget.value,
      isInputValid: validateText(event.currentTarget.value),
    });
  };

  addItem = (): void => {
    this.props.onAddItem(this.state.inputText);
    this.setState({
      inputText: '',
      isInputValid: false,
    });
  };

  render(): JSX.Element {
    const invalidTextTitle: string | undefined = (this.state.isInputValid)
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
