import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class PlainItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.index}. {this.props.text}
      </div>
    );
  }
}
