import { useState, useEffect } from "react"

export const FormPurchase = ({ticket, onSubmit}) =>{

    const [Options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(1)
    const [BuyerName, setBuyerName] = useState('')

    useEffect(() => {
        calcAvailable();
    }, [ticket])

    const calcAvailable = () =>{
        console.log(ticket)
        if (!!ticket){
            if (isNaN(ticket.maxPurchaseCount) || isNaN(ticket.purchaseCount)){
                // if data is invalid returns empty array
                console.log("NaN")
                setOptions([])
            }
            else{
                //Generate elements for available tickets
                const availOptions=[];
                const numberAvail = ticket.maxPurchaseCount - ticket.purchaseCount;
                if (ticket.soldout === false || numberAvail > 0) {
                    //setAvailQty(numberAvail);
                    console.log("Disponibles:", numberAvail);
                    for (let i = 1; i <= numberAvail; i++) {
                        availOptions.push(<option key={i} value={i}>{i}</option>);
                    }
                    setOptions(availOptions)
                }
                else{
                    //setAvailQty(numberAvail);
                    setOptions([])
                    console.log("Disponibles:", 0);
                }
            }
        }
    }
    
    const onBuy = (e) =>{
        e.preventDefault();
        onSubmit({
            "guestName": BuyerName,
            "quantity": selectedOption,
            "ticket": ticket.code
        })
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
                        onChange={(e) => { setSelectedOption(e.target.value) }}
                    >
                        {Options}
                    </select>
                </label>
                <br />
                <label>
                    Buyer's Name:
                    <input type="text"
                        value={BuyerName}
                        onChange={(e) => { setBuyerName(e.target.value) }}
                    />
                </label>
                <hr />
                <button className="btn btn-primary"
                    type="submit"
                    onClick={onBuy}>
                    Buy
                </button>
            </form >
        </>
    )
}