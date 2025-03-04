import L from "leaflet";
import { useEffect } from "react";
import "leaflet-routing-machine";
import { RouteCoords } from "../types";
import { useMap } from "react-leaflet";

type Props = {
  route: RouteCoords;
  altRoute: boolean;
};

const RoutingMachine = ({ altRoute, route }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(route.start.lat, route.start.lon), L.latLng(route.end.lat, route.end.lon)],
      lineOptions: {
        styles: [{ color: "#1c4ae0", weight: 4 }],
      },
      altLineOptions: {
        styles: [{ color: "#6fa1ec", weight: 4 }],
      },
      createMarker: function (i: number, waypoint, n: number) {
        let popupContent = "Waypoint " + (i + 1);
        if (i === 0) {
          popupContent = "Route Start";
        } else if (i === n - 1) {
          popupContent = "Route End";
        }
        return L.marker(waypoint.latLng).bindPopup(popupContent);
      },
      pointMarkerStyle: {
        color: "#ee4f4f",
      },
      show: true,
      autoRoute: true,
      addWaypoints: false,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: altRoute,
      collapsible: true,
    });

    routingControl.addTo(map);

    return () => {
      if (map) {
        map.removeControl(routingControl);
      }
    };
  }, [map, route, altRoute]);

  return null;
};

export default RoutingMachine;
