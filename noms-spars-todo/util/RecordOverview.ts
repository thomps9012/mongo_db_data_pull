export type RecordOverview = {
  _id: String;
  interview_info: {
    interviewDate: String;
    interview_type: String;
  },
  client_information: {
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
