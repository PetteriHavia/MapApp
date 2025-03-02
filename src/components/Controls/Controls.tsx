import React, { memo } from "react";
import { useState } from "react";
import { Coords, RouteCoords } from "../../types";
import MapGeolocation from "./MapGeolocation";
import FindDevice from "./FindDevice";
import RoutePlanner from "./RoutePlanner";
import { TabIndex } from "../../types";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
  setRoute: React.Dispatch<React.SetStateAction<RouteCoords | undefined>>;
  setAltRoute: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Controls = memo(({ setLocation, setRoute, setAltRoute, setDrawerToggle }: Props) => {
  const [tabIndex, setTabIndex] = useState<TabIndex>(TabIndex.Location);

  const tabs = [
    { index: 0, label: "Location", content: <MapGeolocation setLocation={setLocation} /> },
    { index: 1, label: "Find Device", content: <FindDevice setLocation={setLocation} /> },
    {
      index: 2,
      label: "Route Planner",
      content: <RoutePlanner setRoute={setRoute} setAltRoute={setAltRoute} />,
    },
  ];

  return (
    <div className="grow">
      <div className="flex mr-5 justify-end mr-5">
        <button className="relative cursor-pointer p-1" onClick={() => setDrawerToggle((prev) => !prev)}>
          <span className="absolute bg-stone-950 block h-[2px] w-5 rotate-45"></span>
          <span className="absolute bg-stone-950 block h-[2px] w-5 -rotate-45"></span>
        </button>
      </div>
      <div className="flex gap-4 mb-5 mt-5">
        {tabs.map((tab) => (
          <p
            key={tab.index}
            onClick={() => setTabIndex(tab.index)}
            className={`pb-1 ${tabIndex === tab.index ? "border-b-3 rounded-xs border-sky-400" : ""} shrink-0`}
          >
            {tab.label}
          </p>
        ))}
      </div>
      {tabs[tabIndex].content}
    </div>
  );
});

export default Controls;
