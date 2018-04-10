import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IProps {
  errorMessage: string;
  onCloseError: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ItemError: React.StatelessComponent<IProps> = (props: IProps) =>
  (props.errorMessage !== '')
    ? <span
      className="glyphicon glyphicon-exclamation-sign text-danger pull-right"
    >
      <strong>
        Error: {props.errorMessage}
      </strong>
      <button
        className="close pull-right"
        data-dismiss="alert"
        aria-label="close"
        onClick={props.onCloseError}
      >&times;</button>
      <button
        className="close"
        onClick={() => alert('ebebe')}
      >
        &#8634;
      </button>
    </span>
    : null;

ItemError.propTypes = {
  errorMessage: PropTypes.string,
  onCloseError: PropTypes.func.isRequired
};

export { ItemError }