import React, { PureComponent } from 'react';

export class PlainText extends PureComponent {
  render() {
    return (
      <div>
        {this.props.index}. {this.props.text}
      </div>
    );
  }
}
