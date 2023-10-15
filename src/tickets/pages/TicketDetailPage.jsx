import { useParams } from 'react-router-dom';

export const TicketDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="container mt-5">
      <h1>Ticket detail page</h1>
      <hr />
      <p>{id}</p>
    </div>
  )
}