export type RecordOverview = {
  _id: String;
  interview_info: {
    interviewDate: String;
    interview_type: String;
  },

  client_information: {
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
    emergency_contact: {
      contact_first_name: String;
      contact_last_name: String;
      contact_email_address: String;
      contact_phone_number: String;
      contact_street: String;
      contact_city: String;
      contact_state: String;
      contact_zip: String;
    }
  };
};
