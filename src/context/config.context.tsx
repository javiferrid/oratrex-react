/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";

interface Props {
  children: JSX.Element;
}

interface ConfigContextInterface {
  automatic: Automatic;
  selectedEvent: any;
  toggleAutomatic: () => void;
  saveEvent: (value: any) => void;
}

export enum Automatic {
  OFF = "off",
  ON = "on",
}

const ConfigContext = createContext<ConfigContextInterface>({
  automatic: localStorage?.getItem("automatic") as Automatic | Automatic.OFF,
  selectedEvent: {},
  toggleAutomatic: () => {},
  saveEvent: () => {},
});

const ConfigProviderWrapper = ({ children }: Props): JSX.Element => {
  const localAutomatic =
    (localStorage?.getItem("automatic") as Automatic) || Automatic.OFF;
  const [automatic, setAutomatic] = useState<Automatic>(
    localAutomatic as Automatic
  );

  const [selectedEvent, setEvent] = useState({});

  const toggleAutomatic = (): void => {
    if (automatic === Automatic.OFF) {
      setAutomatic(Automatic.ON);
      localStorage.setItem("automatic", Automatic.ON);
    } else if (automatic === Automatic.ON) {
      setAutomatic(Automatic.OFF);
      localStorage.setItem("automatic", Automatic.OFF);
    }
  };

  const saveEvent = (value: any): void => {
    setEvent(value);
  };

  return (
    <ConfigContext.Provider
      value={{
        automatic,
        toggleAutomatic,
        selectedEvent,
        saveEvent,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProviderWrapper };
