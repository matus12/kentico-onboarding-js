import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const PlainItem = props =>
  <div onClick={props.onEditStart}>
    {props.item.index}. {props.item.text}
  </div>;

PlainItem.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onEditStart: PropTypes.func.isRequired,
};
