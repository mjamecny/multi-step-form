import { createContext, useContext, useReducer } from "react"

const MultiStepContext = createContext()

const initialState = {
  step: 1,
  name: "",
  email: "",
  phone: "",
  plan: {},
  billing: "",
  addons: [],
  confirmed: false,
}

function reducer(state, action) {
  switch (action.type) {
    case "addPersonalInfo":
      return {
        ...state,
        step: 2,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
      }
    case "addPlan":
      return {
        ...state,
        step: 3,
        plan: action.payload.plan,
        billing: action.payload.billing,
      }
    case "addAddons":
      return {
        ...state,
        step: 4,
        addons: action.payload,
      }
    case "stepBack":
      return {
        ...state,
        step: state.step - 1,
      }
    case "setStep":
      return {
        ...state,
        step: action.payload,
      }
    case "confirm":
      return {
        ...state,
        confirmed: true,
      }
    default:
      throw new Error("Unknown action")
  }
}

export function MultiStepProvider({ children }) {
  const [
    { step, name, email, phone, plan, billing, addons, confirmed },
    dispatch,
  ] = useReducer(reducer, initialState)

  return (
    <MultiStepContext.Provider
      value={{
        step,
        name,
        email,
        phone,
        plan,
        billing,
        addons,
        confirmed,
        dispatch,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  )
}

export function useMulti() {
  const context = useContext(MultiStepContext)

  if (context === undefined) {
    throw new Error(
      "MultiStepContext was used outside of the MultiStepProvider"
    )
  }

  return context
}
