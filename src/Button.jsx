import { useMulti } from "./contexts/MultiStepContext"

export default function Button({ children, onClick }) {
  const { step } = useMulti()
  return (
    <button
      onClick={onClick}
      className={`${
        step === 4 ? "bg-purplishBlue" : "bg-marineBlue"
      } py-1.2 px-0.8 rounded-md text-white ml-auto`}
    >
      {children}
    </button>
  )
}
