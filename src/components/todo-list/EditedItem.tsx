import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../models/IndexedItem';
import { HotKeys } from 'react-hotkeys';
import Form from './Form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

export interface IEditedItemCallbackProps {
  readonly onUpdateItem: (text: string) => void;
  readonly onEditStop: () => void;
  readonly onDeleteItem: () => void;
}

export interface IEditedItemDataProps {
  readonly item: IndexedItem;
}

interface IState {
  readonly editedText: string;
  readonly isInputValid: boolean;
}

export class EditedItem extends React.PureComponent<IEditedItemCallbackProps & IEditedItemDataProps, IState> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditStop: PropTypes.func.isRequired,
  };

  map = {
    'cancelEdit': 'esc'
  };

  handlers = {
    'cancelEdit': (_event: any) => this.props.onEditStop()
  };

  constructor(props: IEditedItemCallbackProps & IEditedItemDataProps) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isInputValid: true,
    };
  }

  render(): JSX.Element {
    /*const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'Empty item cannot be stored.\nTip: Use delete button to remove an item';
*/
    return (
      <HotKeys
        keyMap={this.map}
        handlers={this.handlers}
      >
        <div className="row">
          <div className="col-xs-4">
            <div className="input-group">
              {this.props.item.index}.
              {/*<Input
                value={this.state.editedText}
                isValid={this.state.isInputValid}
                onChange={this._changeItemText}
                title={invalidTextTitle}
              />*/}
              <Form
                form={this.props.item.id.toString()}
                initialValues={{text: this.props.item.text}}
                onSubmit={this._saveItem}
              />
            </div>
          </div>
          {/*          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveItem}
            title={invalidTextTitle}
            disabled={!this.state.isInputValid}
          >
            Save
          </button>*/}
          <MuiThemeProvider>
            <FlatButton
              onClick={this.props.onEditStop}
            >
              CANCEL
            </FlatButton>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <FlatButton
              secondary={true}
              onClick={this._deleteItem}
            >
              DELETE
            </FlatButton>
          </MuiThemeProvider>
        </div>
      </HotKeys>
    );
  }

  /*private _changeItemText = ({currentTarget: {value}}: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      editedText: value,
      isInputValid: validateText(value),
    });
  };*/

  private _saveItem = (values: any): void => {
    this.props.onUpdateItem(
      values.todo
    );
  };

  private _deleteItem = (): void => {
    this.props.onDeleteItem();
  };
}
