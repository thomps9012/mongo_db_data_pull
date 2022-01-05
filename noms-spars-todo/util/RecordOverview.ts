export type RecordOverview = {
  _id: String;
  client_information: {
    interviewDate: String;
    interview_type: String;
    client_info: {
      name: String;
      email_address: String;
      phoneNumber: String;
      address: String;
    };
    emergency_contact: {
      name: String;
      email_address: String;
      phoneNumber: String;
      address: String;
    };
  };
};
