import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FormPurchase } from '../components/FormPurchase';

export const axiosR = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    validateStatus: function (status) {
        //Resolve only whe status code is less than 500
        return status < 500;
    }
});

export const PurchasePage = () => {
    const navigate = useNavigate();

    const [Ticket, setTicket] = useState({})
    const { ticketCode } = useParams(); 
    
    const isInvalid = ticketCode === 'invalid';
    const [Status, setStatus] = useState('')

    useEffect(() => {
        axiosR.get(`/api/reservations/tickets/${ticketCode}`)
            .then((res) => {
                if (res.status == 404){
                    navigate('/purchase/invalid', {
                        replace: true
                      });
                    console.log('No existe el ticket');
                }
                else{
                    setTicket(res.data);
                    console.log("Ticket encontrado")
                }
            })
            .catch(err => console.log(err))
    }, [Status, ticketCode]);

    //Handler for buy action
    const onBuy = (data) =>{
        console.log("Buy clicked", data)
        axiosR.post(`/api/reservations/purchase/`, data)
            .then((res) => {
                if (res.status == 404) {
                    navigate('/purchase/invalid', {
                        replace: true
                    });
                    console.log('No existe el ticket')
                }
                else {
                    if(res.status === 201) {setStatus('PURCHASE OK')}
                    if(res.status === 403) {setStatus(res.data.error)}
                }
            })
            .catch(err => console.log(err))
    }

    // Message for soldout tickets
    const msgSoldOut = () => {
        return (
            <>
                <h5>Buy ticket: {ticketCode}</h5>
                <h5>Offer: {Ticket.name}</h5>
                <hr />
                <h3>sold out!</h3>
            </>
        )
    }

    

  return (
      <div className="container mt-5">
          <h1>Purchase page</h1>
          <hr />
          {isInvalid ? (
              // If the ticket's code is invalid
              <h3>Codigo invalido</h3>
          ) :
              (Ticket.soldout) ?
                  (msgSoldOut()) :
                  (
                      <FormPurchase
                          ticket={Ticket}
                          onSubmit={onBuy}
                      />
                  )
          }
          {/*Shows messages to the buyer about its purchase*/}
          {(Status === 'PURCHASE OK') && (<h2>Purchased succesfully !</h2>)}
          {(Status !== '' && Status !== 'PURCHASE OK') && (<h2>Purchase failed: {Status}</h2>)}
      </div>
  )
}