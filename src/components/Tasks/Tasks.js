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
import LaunchIcon from "@material-ui/icons/Launch";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
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
              title="Mosca de la fruta"
              href="https://www.syngenta.es/mosca-de-la-fruta"
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
              title="Trips"
              placement="top"
              href="https://www.seminis.mx/blog-que-son-los-trips-y-como-manejarlos/"
              target="_blank"
              rel="noopener noreferrer"
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
              title="Hormiga Arriera"
              href="https://sioc.minagricultura.gov.co/Aguacate/Normatividad/Manual%20Hormiga%20Arriera.pdf"
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
              title="Hemípteros"
              href="http://plaguicidas-y-alternativas.org/contenido/2012-06-20-hem%C3%ADpteros-depredadores"
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

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  checkedIndexes: PropTypes.array
};
