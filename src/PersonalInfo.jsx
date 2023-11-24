import React, { useEffect, useState, forwardRef } from "react"

import { useMulti } from "./contexts/MultiStepContext"

export const PersonalInfo = forwardRef((props, ref) => {
  const [nameInput, setName] = useState("")
  const [emailInput, setEmail] = useState("")
  const [phoneInput, setPhone] = useState("")
  const [errorName, setErrorName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)

  const { dispatch, name, email, phone } = useMulti()

  const regex = new RegExp(/\S+@\S+\.\S+/)
  const isValid = regex.test(emailInput)

  function handleSubmit(e) {
    e.preventDefault()
    setErrorName(false)
    setErrorEmail(false)
    setErrorPhone(false)

    if (!nameInput) {
      setErrorName(true)
    }

    if (!isValid) {
      setErrorEmail(true)
    }

    if (!phoneInput) {
      setErrorPhone(true)
    }

    if (nameInput && emailInput && phoneInput && isValid) {
      dispatch({
        type: "addPersonalInfo",
        payload: {
          name: nameInput,
          email: emailInput,
          phone: phoneInput,
        },
      })
    }
  }

  // Pass the ref to the parent component
  React.useImperativeHandle(ref, () => ({
    handleSubmit,
  }))

  useEffect(() => {
    if (name && email && phone) {
      setName(name)
      setEmail(email)
      setPhone(phone)
    }
  }, [name, email, phone])

  return (
    <>
      <h2 className="font-bold text-marineBlue text-2.4 md:text-3">
        Personal Info
      </h2>
      <p className="text-coolGray">
        Please provide your name, email address, and phone number.
      </p>
      <form
        className="flex flex-col gap-1.2"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <label className="text-marineBlue text-1.4" htmlFor="name">
              Name
            </label>
            {errorName && (
              <p className="text-strawberryRed font-bold text-1.4">
                This field is required
              </p>
            )}
          </div>

          <input
            className={`text-marineBlue font-medium outline-none border ${
              errorName ? "border-strawberryRed" : "border-lightGray"
            } rounded-md py-0.8 px-1.2 focus:border-marineBlue`}
            type="text"
            id="name"
            placeholder="e.g. Stephen King"
            value={nameInput}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <label className="text-marineBlue text-1.4" htmlFor="email">
              Email Address
            </label>
            {errorEmail && (
              <p className="text-strawberryRed font-bold text-1.4">
                Not a valid email
              </p>
            )}
          </div>

          <input
            className={`text-marineBlue font-medium outline-none border ${
              errorEmail ? "border-strawberryRed" : "border-lightGray"
            } rounded-md py-0.8 px-1.2 focus:border-marineBlue`}
            type="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={emailInput}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <label className="text-marineBlue text-1.4" htmlFor="phone">
              Phone Number
            </label>
            {errorPhone && (
              <p className="text-strawberryRed font-bold text-1.4">
                This field is required
              </p>
            )}
          </div>

          <input
            className={`text-marineBlue font-medium outline-none border ${
              errorPhone ? "border-strawberryRed" : "border-lightGray"
            } rounded-md py-0.8 px-1.2 focus:border-marineBlue`}
            type="tel"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            value={phoneInput}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="hidden">
          <button>Next Step</button>
        </div>
      </form>
    </>
  )
})
