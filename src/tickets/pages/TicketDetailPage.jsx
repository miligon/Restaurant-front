import { useParams } from 'react-router-dom';



export const TicketDetailPage = () => {
  
  const { id } = useParams();
  return (
    <div className="container mt-5">
      <h1>Ticket detail page</h1>
      <hr />
      <table>
        <head></head>
        <th></th>
        <td>

        </td>
      </table>
      <hr />
    </div>
  )
}