import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export function PlainItem(props) {
  const clickOnText = () => {
    props.onEditStart(props.item);
  };

  return (
    <div onClick={clickOnText}>
      {props.index + '. ' + props.item.text}
    </div>
  );
}

PlainItem.propTypes = {
  item: ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEditStart: PropTypes.func.isRequired,
};
