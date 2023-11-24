import { useRef } from "react"
import Button from "./Button"
import { PersonalInfo } from "./PersonalInfo"
import { Plans } from "./Plans"
import { Addons } from "./Addons"
import { Summary } from "./Summary"

import { useMulti } from "./contexts/MultiStepContext"

const stepsArr = [
  {
    step: 1,
    title: "Your Info",
  },
  {
    step: 2,
    title: "Select plan",
  },
  {
    step: 3,
    title: "Add-ons",
  },
  {
    step: 4,
    title: "Summary",
  },
]

export default function App() {
  const { step, confirmed, dispatch } = useMulti()
  const personalInfoRef = useRef(null)
  const plansRef = useRef(null)
  const addonsRef = useRef(null)
  const summaryRef = useRef(null)

  function handleSubmit(e) {
    if (personalInfoRef.current) {
      personalInfoRef.current.handleSubmit(e)
    }

    if (plansRef.current) {
      plansRef.current.handleSubmit(e)
    }

    if (addonsRef.current) {
      addonsRef.current.handleSubmit(e)
    }

    if (summaryRef.current) {
      summaryRef.current.handleSubmit(e)
    }
  }

  return (
    <div className="bg-magnolia md:bg-white h-screen md:h-[75%] grid grid-cols-1 md:grid-cols-[350px_1fr] grid-rows-[200px_1fr_80px] md:grid-rows-[1fr_80px] md:rounded-lg md:gap-x-2.4 md:pr-4.8 max-w-4xl">
      <div className="bg-[url('../public/bg-sidebar-mobile.svg')] md:bg-[url('../public/bg-sidebar-desktop.svg')] bg-cover bg-center md:row-start-1 md:row-span-2 md:rounded-lg md:scale-[0.9] relative">
        <ul className="absolute top-[40px] left-[50%] md:left-[100px] translate-x-[-50%] flex md:flex-col gap-1.2">
          {stepsArr.map((item) => (
            <li className="flex items-center gap-1.2" key={item}>
              <p
                className={`flex justify-center items-center w-[30px] h-[30px] border ${
                  step === item.step
                    ? "border-lightBlue bg-lightBlue text-marineBlue"
                    : "border-alabaster text-alabaster"
                }   font-medium rounded-full`}
              >
                {item.step}
              </p>
              <div className="hidden md:block">
                <p className="text-coolGray">STEP {item.step}</p>
                <p className="text-white uppercase font-bold">{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:flex">
        <div className="px-1.6 md:px-[0px] md:flex md:items-center">
          <div className="mt-[-85px] md:mt-[0px] bg-white px-2.4 py-3.2 rounded-lg md:rounded-none flex flex-col gap-1.2 shadow-md md:shadow-none z-20 relative">
            {step === 1 && <PersonalInfo ref={personalInfoRef} />}
            {step === 2 && <Plans ref={plansRef} />}
            {step === 3 && <Addons ref={addonsRef} />}
            {step === 4 && <Summary ref={summaryRef} />}
          </div>
        </div>
      </div>
      {!confirmed && (
        <div className="flex justify-between items-center bg-white p-1.6 md:col-start-2">
          {step > 1 && (
            <button
              className="text-coolGray font-bold hover:text-marineBlue transition-colors duration-300"
              onClick={() => dispatch({ type: "stepBack" })}
            >
              Go back
            </button>
          )}
          <Button onClick={handleSubmit}>
            {step < 4 ? "Next Step" : "Confirm"}
          </Button>
        </div>
      )}
    </div>
  )
}
