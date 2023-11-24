import React, { forwardRef } from "react"
import { useMulti } from "./contexts/MultiStepContext"

export const Summary = forwardRef((props, ref) => {
  const { dispatch, billing, addons, plan, confirmed } = useMulti()
  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "confirm" })
  }

  // Pass the ref to the parent component
  React.useImperativeHandle(ref, () => ({
    handleSubmit,
  }))

  const totalPriceAddons = addons.reduce(
    (acc, addon) =>
      acc + (billing === "yearly" ? addon.priceYearly : addon.priceMonthly),
    0
  )

  const totalPrice =
    totalPriceAddons +
    (billing === "yearly" ? plan.priceYearly : plan.priceMonthly)

  return (
    <>
      {confirmed ? (
        <div className="flex flex-col gap-1.6 justify-center items-center">
          <img
            className="w-[50px]"
            src="icon-thank-you.svg"
            alt="thank you icon"
          />
          <div className="flex flex-col items-center gap-1.2">
            <h2 className="font-bold text-marineBlue text-2.4 md:text-3">
              Thank you!
            </h2>
            <p className="text-coolGray text-center">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-marineBlue text-2.4 md:text-3">
            Finishing up
          </h2>
          <p className="text-coolGray">
            Double-check everything looks OK before confirming.
          </p>
          <div className="bg-magnolia p-1.6 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-1.4 text-marineBlue font-bold">
                  {plan.name} {""}
                  {`(${billing})`}
                </p>
                <p
                  onClick={() => dispatch({ type: "setStep", payload: 2 })}
                  className="cursor-pointer underline text-coolGray text-1.4 hover:text-purplishBlue"
                >
                  Change
                </p>
              </div>
              <p className="text-marineBlue text-1.4 font-bold">{`$${
                billing === "yearly" ? plan.priceYearly : plan.priceMonthly
              }/${billing === "yearly" ? "yr" : "mo"}`}</p>
            </div>
            {addons.length > 0 && <hr className="text-lightGray mt-1.2" />}
            <ul className="flex flex-col gap-1.2 mt-1.2">
              {addons.map((addon, i) => (
                <li key={i} className="flex items-center justify-between">
                  <p className="text-coolGray text-1.4">{addon.name}</p>
                  <p className="text-1.4 text-marineBlue">{`+$${
                    billing === "yearly"
                      ? addon.priceYearly
                      : addon.priceMonthly
                  }/${billing === "yearly" ? "yr" : "mo"}`}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center px-1.6">
            <p className="text-coolGray text-1.4">
              Total (per {billing === "yearly" ? "year" : "month"})
            </p>
            <p className="text-purplishBlue font-bold">{`+$${totalPrice}/${
              billing === "yearly" ? "yr" : "mo"
            }`}</p>
          </div>
        </>
      )}
    </>
  )
})
