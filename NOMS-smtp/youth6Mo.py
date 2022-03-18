import os
import pprint
import datetime
from pymongo import MongoClient
from datetime import timedelta

client = MongoClient(os.environ.get('NOMSDB_URI'))
db = client['interviews']
youth_intake = db['youth_intake']
youth_six_month = db['youth_6month']

open_window = datetime.datetime.utcnow() + timedelta(weeks=-26)
close_alert = open_window + timedelta(weeks=-2)
close_window = open_window + timedelta(weeks=-4)

# six month interview open and close
youth_six_month_open = youth_intake.find({
    "interview_info.interviewDate": {"$gte": close_alert.isoformat()},
    "interview_info.interviewDate": {"$lt": open_window.isoformat()}
}, {"client_information": 1, "interview_info": 1})
# }, {"interview_info": 1 })
youth_six_month_close = youth_intake.find({
    'interview_info.interviewDate': {"$gte": close_window.isoformat()},
    'interview_info.interviewDate': {"$lt": close_alert.isoformat()}
}, {'client_information': 1, "interview_info": 1})

# Six Month Interview Functionality
print('Youth Six Month Interviews Complete')
youth_six_month_int = youth_six_month.find({},{'client_information': 1, 'interview_info': 1})
complete_six_int_names = []
for item in youth_six_month_int:
    comp_client = item['client_information']
    pprint.pprint(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])
    complete_six_int_names.append(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])

print('Youth Six Month Interview Window Open')
youth_six_month_open_html = '<ol>'
for item in youth_six_month_open:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_six_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'

        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        youth_six_month_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'


print('Youth Six Month Interview Window Closing')
youth_six_month_close_html = '<ol>'
for item in youth_six_month_close:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_six_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'
   
        for item in client['client_info']:
                client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
                contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'
    
        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        youth_six_month_close_html += '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'


# Two Year Interview Functionality
# print('Two Year Interviews Complete')
# two_year_int = two_year.find({},{'client_information': 1})
# complete_two_year_int_names = []
# for item in two_year_int:
    # comp_client = item['client_information']
    # del comp_client['interviewDate']
    # del comp_client['interview_type']
    # pprint.pprint(comp_client['client_info']['name'])
    # complete_two_year_int_names.append(comp_client['client_info']['name'])
# print('Two Year Interview Window Open')
# for item in two_year_window_open:
#     client = item['client_information']
    # del client['interviewDate']
    # del client['interview_type']
    # pprint.pprint(client)


# print('Two Year Interview Window Close')
# for item in two_year_window_close:
#     client = item['client_information']
    # del client['interviewDate']
    # del client['interview_type']
    # pprint.pprint(client)

youth_six_month_open_html = youth_six_month_open_html+'</ol>'
youth_six_month_close_html = youth_six_month_close_html+'</ol>'

