import React, { useState, forwardRef } from "react"
import { useMulti } from "./contexts/MultiStepContext"

const plans = [
  {
    name: "Arcade",
    priceMonthly: 9,
    priceYearly: 90,
    icon: "icon-arcade.svg",
  },
  {
    name: "Advanced",
    priceMonthly: 12,
    priceYearly: 120,
    icon: "icon-advanced.svg",
  },
  {
    name: "Pro",
    priceMonthly: 15,
    priceYearly: 150,
    icon: "icon-pro.svg",
  },
]

export const Plans = forwardRef((props, ref) => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0])
  const [isChecked, setIsChecked] = useState(false)
  const { dispatch } = useMulti()

  function handleSubmit(e) {
    e.preventDefault()

    dispatch({
      type: "addPlan",
      payload: {
        plan: selectedPlan,
        billing: isChecked ? "yearly" : "monthly",
      },
    })
  }

  // Pass the ref to the parent component
  React.useImperativeHandle(ref, () => ({
    handleSubmit,
  }))

  return (
    <>
      <h2 className="font-bold text-marineBlue text-2.4 md:text-3">
        Select your plan
      </h2>
      <p className="text-coolGray">
        You have the option of monthly or yearly billing.
      </p>
      <ul className="flex flex-col md:flex-row gap-1.2">
        {plans.map((plan, i) => (
          <li
            key={i}
            className={`flex md:flex-col md:flex-1 items-center md:items-start gap-1.2 md:gap-3.2 p-1.2 border ${
              selectedPlan.name === plan.name
                ? "bg-magnolia border-purplishBlue"
                : "border-lightGray"
            } rounded-md cursor-pointer hover:border-purplishBlue transition-colors duration-300`}
            onClick={() => setSelectedPlan(plan)}
          >
            <img src={plan.icon} alt={`${plan.name} plan icon`} />
            <div>
              <p className="text-marineBlue font-medium">{plan.name}</p>
              <p className="text-coolGray">
                {isChecked
                  ? `$${plan.priceYearly}/yr`
                  : `$${plan.priceMonthly}/mo`}
              </p>
              {isChecked && (
                <p className="text-marineBlue text-1.4">2 months free</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-1.4 font-bold flex justify-center items-center gap-1.6 bg-magnolia rounded-md py-1.2">
        <p className={`${!isChecked ? "text-marineBlue" : "text-coolGray"}`}>
          Monthly
        </p>
        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="slider round"></span>
        </label>
        <p className={`${isChecked ? "text-marineBlue" : "text-coolGray"}`}>
          Yearly
        </p>
      </div>
    </>
  )
})
