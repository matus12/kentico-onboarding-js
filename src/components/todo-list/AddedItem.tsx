import * as React from 'react';
import * as PropTypes from 'prop-types';
import Form from '../../containers/Form';

interface IState {
  readonly inputText: string;
  readonly isInputValid: boolean;
}

export interface IAddedItemCallbackProps {
  readonly onAddItem: (text: string) => void;
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

  render(): JSX.Element {
    return (
      <div className="col-xs-6">
        <Form
          form="addForm"
          initialValues={
            {
              text: 'TO DO',
            }
          }
          onSubmit={this._addItem} />
      </div>
    );
  }

  private _addItem = (values: any): void => {
    this.props.onAddItem(values.todo);

    this.setState({
      inputText: '',
      isInputValid: false,
    });
  };
}
