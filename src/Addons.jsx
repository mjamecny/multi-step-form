import React, { useState, forwardRef } from "react"
import { useMulti } from "./contexts/MultiStepContext"

const addons = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
  },
]

export const Addons = forwardRef((props, ref) => {
  const [checkedState, setCheckedState] = useState(
    new Array(addons.length).fill(false)
  )
  const { dispatch, billing } = useMulti()

  function handleSubmit(e) {
    e.preventDefault()

    const selectedAddons = addons.filter((addon, i) => {
      return checkedState[i]
    })

    dispatch({ type: "addAddons", payload: selectedAddons })
  }

  function handleOnChange(position) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  // Pass the ref to the parent component
  React.useImperativeHandle(ref, () => ({
    handleSubmit,
  }))

  return (
    <>
      <h2 className="font-bold text-marineBlue text-2.4 md:text-3">
        Pick add-ons
      </h2>
      <p className="text-coolGray">
        Add-ons help enhance your gaming experience.
      </p>
      <ul className="flex flex-col gap-1.2">
        {addons.map((addon, i) => (
          <li
            key={i}
            className={`flex items-center p-1.2 border border-lightGray ${
              checkedState[i]
                ? "bg-magnolia border-purplishBlue"
                : "border-lightGray"
            } rounded-md`}
          >
            <div className="flex gap-1.2 items-center">
              <label className="container">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${i}`}
                  name={addon.name}
                  value={addon.name}
                  checked={checkedState[i]}
                  onChange={() => handleOnChange(i)}
                />
                <span className="checkmark"></span>
              </label>
              <div className="flex flex-col">
                <p className="text-1.4 text-marineBlue font-bold">
                  {addon.name}
                </p>
                <p className="text-1.2 text-coolGray">{addon.description}</p>
              </div>
            </div>

            <p className="text-purplishBlue text-1.2 ml-auto">
              {billing === "yearly"
                ? `+$${addon.priceYearly}/yr`
                : `+$${addon.priceMonthly}/mo`}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
})
