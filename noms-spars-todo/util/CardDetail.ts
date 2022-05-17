export type clientCardDetail = {
    _id: String;
    interviewDate: String;
    interview_type: String;
    client_info: {
        client_first_name: String;
        client_last_name: String;
        client_email_address: String;
        client_phone_number: String;
        client_street: String;
        client_city: String;
        client_state: String;
        client_zip: String;
    },
    NORA_acknowledged: Boolean;
    client_acknowledged: Boolean;
    gift_card_received: Boolean;
}