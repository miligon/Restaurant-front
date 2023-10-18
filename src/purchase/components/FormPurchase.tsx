import React, { useState, useEffect, JSX } from 'react'
import { buyInfo, unauthTicket } from '../interfaces'

interface FormPurchaseProps {
  ticket: unauthTicket,
  onSubmit: (arg0: buyInfo) => void,
}

export const FormPurchase: React.FC<FormPurchaseProps> = ({
  ticket,
  onSubmit,
}) => {
  const [Options, setOptions] = useState<JSX.Element[]>([])
  const [selectedOption, setSelectedOption] = useState(1)
  const [BuyerName, setBuyerName] = useState('')

  useEffect(() => {
    calcAvailable()
  }, [ticket])

  const calcAvailable = () => {
    console.log(ticket)
    if (!!ticket) {
      if (isNaN(ticket.available)) {
        // if data is invalid returns empty array
        console.log('NaN')
        setOptions([])
      } else {
        //Generate elements for available tickets
        const availOptions: JSX.Element[] = []
        if (ticket.available > 0) {
          //setAvailQty(numberAvail);
          console.log('Available:', ticket.available)
          for (let i = 1; i <= ticket.available; i++) {
            availOptions.push(
              <option key={i} value={i}>
                {i}
              </option>,
            )
          }
          setOptions(availOptions)
        } else {
          //setAvailQty(numberAvail);
          setOptions([])
          console.log('Available:', 0)
        }
      }
    }
  }

  const onBuy = (e: any) => {
    e.preventDefault()
    const buyInfo: buyInfo = {
      guest_name: BuyerName,
      quantity: selectedOption,
      ticket: ticket.code,
    }
    onSubmit(buyInfo)
  }

  return (
    <>
      <form onSubmit={onBuy}>
        <h5>Buy ticket: {ticket.code}</h5>
        <h5>Offer: {ticket.name}</h5>
        <hr />
        <label>
          Quantity to buy:
          <select
            value={selectedOption}
            defaultValue={1}
            onChange={(e) => {
              setSelectedOption(Number(e.target.value))
            }}
          >
            {Options}
          </select>
        </label>
        <br />
        <label>
          Buyer's Name:
          <input
            type='text'
            value={BuyerName}
            onChange={(e) => {
              setBuyerName(e.target.value)
            }}
          />
        </label>
        <hr />
        <button className='btn btn-primary' type='submit' onClick={onBuy}>
          Buy
        </button>
      </form>
    </>
  )
}
