import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const PlainItem = props =>
  <div onClick={props.onEditStart}>
    {props.item.index + '. ' + props.item.payload.text}
  </div>;

PlainItem.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    payload: ImmutablePropTypes.contains({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onEditStart: PropTypes.func.isRequired,
};
