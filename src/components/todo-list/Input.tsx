import * as React from 'react';
import * as classnames from 'classnames';
import * as PropTypes from 'prop-types';

interface IProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  readonly value: string;
  readonly isValid: boolean;
  readonly title: string | undefined;
}

interface IState {
  readonly isFocused: boolean;
}

export class Input extends React.PureComponent<IProps, IState> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    title: PropTypes.string,
  };

  constructor(props: IProps) {
    super(props);

    this.state = ({
      isFocused: false,
    });
  }

  focus = (): void => {
    this.setState({
      isFocused: true,
    });
  };

  blur = (): void => {
    this.setState({
      isFocused: false,
    });
  };

  render(): JSX.Element {
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
