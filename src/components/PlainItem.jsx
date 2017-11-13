import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export function PlainItem(props) {
  const clickOnText = () => {
    props.onUpdateItem(
      props.item.setIn(['isEdited'], true),
    );
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
  onUpdateItem: PropTypes.func.isRequired,
};
