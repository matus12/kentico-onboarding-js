import * as React from 'react';
import * as PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

interface IProps {
  onClick: () => void;
  label: string;
  primary?: boolean;
  secondary?: boolean;
}

const Button: React.SFC<IProps> = (props: IProps): JSX.Element =>
  <MuiThemeProvider>
    <FlatButton
      onClick={props.onClick}
      label={props.label}
      primary={props.primary}
      secondary={props.secondary}
    />
  </MuiThemeProvider>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool
};

export { Button }
