import { LayersControl, TileLayer } from "react-leaflet";

const LayerControlComponent = () => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="Marker with popup">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap HOT">
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenTopoMap">
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default LayerControlComponent;
