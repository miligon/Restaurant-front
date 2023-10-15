import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const PurchasePage = () => {
    const [Ticket, setTicket] = useState({
        "code": "80f1cabb-2016-409d-b1d1-d452eebe4816",
        "name": "10% OFF",
        "maxPurchaseCount": 5,
        "purchaseCount": 0,
        "soldout": true
    })
    const { ticketCode } = useParams(); 
    
    const available = () =>{
        console.log(Ticket)
        if (!!Ticket){
            if (isNaN(Ticket.maxPurchaseCount) || isNaN(Ticket.purchaseCount)){
                // if data is invalid returns empty array
                console.log("NaN")
                return ([]);
            }
            else{
                const availOptions=[];
                const numberAvail = Ticket.maxPurchaseCount - Ticket.purchaseCount;
                console.log(numberAvail)
                for (let i = 1; i <= numberAvail ; i++){
                    availOptions.push(<option key={i} value={i}>{i}</option>);
                }
                return availOptions;
            }
        }
    }

    const onBuy = (e) =>{
        e.preventDefault()
        console.log("Buy clicked")
    }

  return (
      <div className="container mt-5">
          <h1>Purchase page</h1>
          <hr />
          <form onSubmit={onBuy}>
              <h5>Buy ticket: {ticketCode}</h5>
              <h5>Offer: {Ticket.name}</h5>
              <hr />
              <label>
                  Quantity to buy:
                  <select name="select">
                      {available()}
                  </select>
              </label>
              <hr />
              <button className="btn btn-primary"
                  type="submit"
                  onClick={onBuy}>
                  Buy
              </button>
          </form>
      </div>
  )
}