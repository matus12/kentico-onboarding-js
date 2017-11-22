import * as React from 'react';
import * as classnames from 'classnames';

interface IProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  isValid: boolean;
  title: string | undefined;
}

interface IState {
  isFocused: boolean;
}

export class Input extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = ({
      isFocused: false,
    });
  }

  focus = () => {
    this.setState({
      isFocused: true,
    });
  };

  blur = () => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    return (
      <div
        className={classnames(
          'input-group',
          this.state.isFocused && {
            'has-success': this.props.isValid,
            'has-error': !this.props.isValid,
          })
        }
      >
        <input
          className="form-control"
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.focus}
          onBlur={this.blur}
          title={this.props.title}
        />
      </div>
    );
  }
}
