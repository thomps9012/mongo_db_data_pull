import { CardOverview } from "../../util/CardOverview";


export default function CardTable(records: CardOverview[]) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Interview Type</th>
                    <th>Interview Date</th>
                    <th>Gift Card Received</th>
                    <th>NORA Acknowledged</th>
                    <th>Client Acknowledged</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record: CardOverview) => {
                    const {gift_card_received, NORA_acknowledged, client_acknowledged, interview_type, interviewDate, client_info} = record;
                    const {client_first_name, client_last_name} = client_info;
                    const client_name = `${client_first_name} ${client_last_name}`;
                    return (
                        <tr>
                            <td>{client_name}</td>
                            <td>{interview_type}</td>
                            <td>{interviewDate}</td>
                            <td>{gift_card_received}</td>
                            <td>{NORA_acknowledged}</td>
                            <td>{client_acknowledged}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}