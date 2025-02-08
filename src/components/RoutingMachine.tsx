import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { RouteCoords } from "../types";

type Props = {
  route: RouteCoords;
};

const createRoutineMachineLayer = (props: any) => {
  const { route }: Props = props;
  const instance = L.Routing.control({
    waypoints: [L.latLng(route.start.lat, route.start.lon), L.latLng(route.end.lat, route.end.lon)],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    collapsible: true,
  });
  console.log(instance.waypoints);
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
