import React from "react";
import { connect } from "react-redux";
import { parse } from "wkt";
import { LoadScript, GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import { farms, trees } from "actions";

import styles from "assets/jss/material-dashboard-pro-react/views/FullScreenMapStyle";

const useStyles = makeStyles(styles);

function FullScreenMap(props) {
  const classes = useStyles();
  const [farms, setFarms] = React.useState([]);
  const [trees, setTrees] = React.useState([]);
  const [center, setCenter] = React.useState({
    lat: 4.644048217838231,
    lng: -74.39119476824999
  });
  const mapFarms = myFarms => {
    return myFarms.map((farm, key) => {
      let farm_WKT = farm.polygon.substring(farm.polygon.indexOf(";") + 1);
      let farm_points = parse(farm_WKT).coordinates[0];
      let farm_path = farm_points.map(point => {
        return { lat: point[0], lng: point[1] };
      });
      return [<Polygon path={farm_path} key={key} />];
    });
  };
  const mapTrees = myTrees => {
    return myTrees.map((tree, key) => {
      let tree_WKT = tree.location.substring(tree.location.indexOf(";") + 1);
      let tree_point = parse(tree_WKT).coordinates;
      let tree_position = { lat: tree_point[0], lng: tree_point[1] };
      return (
        <Marker
          position={tree_position}
          key={key}
          title={`Árbol: ${tree.id}. ${getSpecie(tree.specie)}`}
        />
      );
    });
  };
  React.useEffect(() => {
    props.fetchFarms();
    props.fetchTrees();
  }, []);
  React.useEffect(() => {
    setFarms(mapFarms(props.farms));
    setTrees(mapTrees(props.trees));
  }, [props.farms, props.trees]);
  return (
    <div className={classes.App}>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDyXNgKS0gtLrB611nCh-J3gVqu7v_via0"
        language="es"
        region="co"
      >
        <GoogleMap
          mapContainerClassName={classes.AppMap}
          center={center}
          zoom={20}
          options={{
            scrollwheel: false,
            zoomControl: true,
            mapTypeId: "hybrid",
            mapTypeControl: false,
            streetViewControl: false
          }}
          version="weekly"
          on
        >
          {farms}
          {trees}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
const getSpecie = specie => {
  switch (specie) {
    case "M":
      return "Mango Tommy";
    case "F":
      return "Mango Farchild";
    case "N":
      return "Naranja";
    case "A":
      return "Aguacate";
    case "D":
      return "Mandarina";
    case "L":
      return "Limón";
    case "B":
      return "Banano";
    default:
      return "Frutal";
  }
};
const mapStateToProps = state => {
  return {
    farms: state.farms,
    trees: state.trees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFarms: () => dispatch(farms.fetchFarms()),
    fetchTrees: () => dispatch(trees.fetchTrees())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullScreenMap);
