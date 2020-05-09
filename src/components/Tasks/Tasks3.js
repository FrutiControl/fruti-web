import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks3(props) {
  const classes = useStyles();
  const { tasks } = props;
  const tableCellClasses = classnames(classes.tableCell);
  return (
    <Table className={classes.table}>
      <TableBody>
          <TableRow className={classes.tableRow}>
            <TableCell className={tableCellClasses}>{tasks[0]}</TableCell>
          </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={tableCellClasses}>{tasks[1]}</TableCell>
          <TableCell className={classes.tableActions}>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={tableCellClasses}>{tasks[2]}</TableCell>
          <TableCell className={classes.tableActions}>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={tableCellClasses}>{tasks[3]}</TableCell>
          <TableCell className={classes.tableActions}>
          </TableCell>
        </TableRow>


      </TableBody>
    </Table>
  );
}

Tasks3.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  checkedIndexes: PropTypes.array
};
