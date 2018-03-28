import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../models/IndexedItem';
import { HotKeys } from 'react-hotkeys';
import Form from '../../containers/Form';

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
    'cancelEdit': (_event: KeyboardEvent) => this.props.onEditStop()
  };

  constructor(props: IEditedItemCallbackProps & IEditedItemDataProps) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isInputValid: true,
    };
  }

  render(): JSX.Element {
    return (
      <HotKeys
        keyMap={this.map}
        handlers={this.handlers}
      >
        <div className="row">
          <div className="col-xs-4">
            <div className="input-group">
              {this.props.item.index}.
              <Form
                form={this.props.item.id.toString()}
                initialValues={
                  {
                    text: this.props.item.text,
                  }
                }
                onSubmit={this._saveItem}
              />
            </div>
          </div>
        </div>
      </HotKeys>
    );
  }

  private _saveItem = (values: {todo: string}): void => {
    this.props.onUpdateItem(
      values.todo
    );
  };
}
