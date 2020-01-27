import React from "react"
import Router from "./src/Router"
import {StoreInitialState,Storereducer} from "./src/Store"

export const Context=React.createContext();

export default App=()=>{
  const [Storestate,Storedispatch]=React.useReducer(Storereducer,StoreInitialState)
  return(
    <Context.Provider value={{Storestate,Storedispatch}}>
    <Router/>
    </Context.Provider>
  )
}