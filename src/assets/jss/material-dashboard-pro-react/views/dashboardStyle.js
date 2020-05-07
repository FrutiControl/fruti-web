import {
  successColor,
  tooltip,
  cardTitle,
  grayColor
} from "assets/jss/material-dashboard-pro-react.js";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.js";
import {
  dangerColor,
  infoColor,
  primaryColor,
  roseColor,
  warningColor
} from "assets/jss/material-dashboard-pro-react";

const dashboardStyle = {
  ...hoverCardStyle,
  tooltip,
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  legendTitle: {
    color: grayColor[0],
    margin: "10px 0 !important",
    display: "flex"
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center"
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: grayColor[0]
  },
  stats: {
    color: grayColor[0],
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-flex",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px"
    }
  },
  productStats: {
    paddingTop: "7px",
    paddingBottom: "7px",
    margin: "0"
  },
  successText: {
    color: successColor[0]
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
  price: {
    color: "inherit",
    "& h4": {
      marginBottom: "0px",
      marginTop: "0px"
    }
  },
  primary: {
    color: primaryColor[0]
  },
  warning: {
    color: warningColor[0]
  },
  danger: {
    color: dangerColor[0]
  },
  success: {
    color: successColor[0]
  },
  info: {
    color: infoColor[0]
  },
  rose: {
    color: roseColor[0]
  },
  gray: {
    color: grayColor[0]
  },
  lightBlue: {
    color: "#00bcd4"
  },
  lightRed: {
    color: "#f05b4f"
  },
  yellow: {
    color: "#f4c63d"
  },
  lightBrown: {
    color:"#d17905"
  },
  darkBlue: {
    color:"#2b2ba1"
  },
  darkGreen: {
    color:"#59922b"
  },
  pieStyle: {
    "& .ct-series-e .ct-slice-pie": { fill: "#2b2ba1" },
    "& .ct-label": { fill: "white", fontWeight: "bold" }
  }
};

export default dashboardStyle;
