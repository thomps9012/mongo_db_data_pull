import { CardOverview } from "../../util/CardOverview";


export default function CardTable(records: any) {
    const cardRecords = records.records;
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
                {cardRecords?
                cardRecords.map((record: CardOverview) => {
                    const {gift_card_received, NORA_acknowledged, client_acknowledged, interview_type, interviewDate, client_info} = record;
                    const {client_first_name, client_last_name} = client_info;
                    const client_name = `${client_first_name} ${client_last_name}`;
                    return (
                        <tr key={client_name}>
                            <td>{client_name}</td>
                            <td>{interview_type}</td>
                            <td>{interviewDate}</td>
                            <td>{gift_card_received ? 'Yes' : 'No'}</td>
                            <td>{NORA_acknowledged ? 'Yes' : 'No'}</td>
                            <td>{client_acknowledged ? 'Yes' : 'No'}</td>
                        </tr>
                    )
                }) :<tr>No Records Found</tr>}
            </tbody>
        </table>
    )
}