import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomSkinMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 4.6493355330066, lng: -74.395033434259 }}
      defaultOptions={{

        scrollwheel: false,
        zoomControl: true,
        mapTypeId: "hybrid",
        mapTypeControl: false,
        streetViewControl: false

      }}
    >
      <Marker position={{ lat: 4.6493355330066, lng: -74.395033434259 }} />
    </GoogleMap>
  ))
);

export default function FullScreenMap() {
  return (
    <CustomSkinMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyXNgKS0gtLrB611nCh-J3gVqu7v_via0"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
