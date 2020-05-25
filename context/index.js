import React, { createContext, useState } from "react";
import userState from "./user/initialState";
import serviceState from "./service/initialState";
import serviceCategoryState from "./serviceCategory/initialState";
import userActions from "./user/actions";
import serviceActions from "./service/actions";
import serviceCategoryActions from "./serviceCategory/actions";
import { toCamel } from "../helpers/util";

// Load initial states from all modules
const INITIAL_STATE = {
  user: userState,
  service: serviceState,
  serviceCategory: serviceCategoryState,
};

// Load actions from all modules
const actions = {
  user: userActions,
  service: serviceActions,
  serviceCategory: serviceCategoryActions,
};

const AppContextProvider = (props) => {
  const [state, setState] = useState(INITIAL_STATE);

  const dispatch = async (type, payload = null) => {
    const namespace = type.match(/@(.*)\//).pop();
    const action = toCamel(type.split("/")[1]);

    // Load action using namespace on actions object
    // { namespace: { action: function } }
    actions[namespace][action](payload, { state, setState });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext();
export default AppContextProvider;
