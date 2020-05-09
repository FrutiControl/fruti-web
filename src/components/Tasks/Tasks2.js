import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import LaunchIcon from '@material-ui/icons/Launch';
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks2(props) {
  const classes = useStyles();
  const { tasks } = props;
  const tableCellClasses = classnames(classes.tableCell);
  return (
    <Table className={classes.table}>
      <TableBody>
          <TableRow className={classes.tableRow}>
            <TableCell className={tableCellClasses}>{tasks[0]}</TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top-start"
                title="Antracnosis"
                href="https://www.deccoiberica.es/que-es-la-antracnosis-y-como-afecta-a-los-cultivos/"
                target="_blank"
                rel="noopener noreferrer"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Ir al link"
                  className={classes.tableActionButton}
                >
                  <LaunchIcon
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={tableCellClasses}>{tasks[1]}</TableCell>
          <TableCell className={classes.tableActions}>
            <Tooltip
                id="tooltip-top-start"
                title="Lasiodiplodia"
                href="https://www.ecured.cu/Lasiodiplodia_theobromae"
                target="_blank"
                rel="noopener noreferrer"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                  aria-label="Ir al link"
                  className={classes.tableActionButton}
              >
                <LaunchIcon
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={tableCellClasses}>{tasks[2]}</TableCell>
          <TableCell className={classes.tableActions}>
            <Tooltip
                id="tooltip-top-start"
                title="Mildiu"
                href="http://www.massogarden.com/es/plagas-y-enfermedades-es/mildiu-mildium"
                target="_blank"
                rel="noopener noreferrer"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                  aria-label="Ir al link"
                  className={classes.tableActionButton}
              >
                <LaunchIcon
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={tableCellClasses}>{tasks[3]}</TableCell>
          <TableCell className={classes.tableActions}>
            <Tooltip
                id="tooltip-top-start"
                title="Mancha foliar"
                href="https://seminis-andina.com/recursos/guias-de-enfermedades/cruciferas/bacterial-leaf-spot/"
                target="_blank"
                rel="noopener noreferrer"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                  aria-label="Ir al link"
                  className={classes.tableActionButton}
              >
                <LaunchIcon
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>


      </TableBody>
    </Table>
  );
}

Tasks2.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  checkedIndexes: PropTypes.array
};
