import { useParams } from 'react-router-dom';

export const PurchasePage = () => {
    const { ticketCode } = useParams();  

  return (
    <div className="container mt-5">
      <h1>Purchase page</h1>
      <hr />
      <p>{ticketCode}</p>
    </div>
  )
}