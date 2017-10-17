import React, { PureComponent } from 'react';

export class Add extends PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      inputValue: '',
    });
  }
  handleOnChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
    this.props.handleOnChange(event.target.value);
  }
  handleAdd() {
    this.props.handleAdd(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  }
  render() {
    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <input className="form-control" value={this.state.inputValue} onChange={(value) => this.handleOnChange(value)} />
        </div>
        <button type="button" className="btn btn-light" onClick={() => this.handleAdd()}>Add</button>
      </li>
    );
  }
}

