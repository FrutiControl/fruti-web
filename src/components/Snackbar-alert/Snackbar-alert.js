/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={9} variant="filled" {...props}/>;
}
export default function SnackbarAlert(props) {
    const {message, closeProps, severity, open, duration} = props;
    return(
        <Snackbar open={open} autoHideDuration={duration} {...closeProps}>
            <Alert {...closeProps} severity= {severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}

SnackbarAlert.propTypes = {
    closeProps: PropTypes.object
};