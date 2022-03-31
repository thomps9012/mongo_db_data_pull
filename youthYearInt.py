import os
import datetime
from pymongo import MongoClient
from datetime import timedelta

client = MongoClient(os.environ.get('NOMSDB_URI'))
db = client['interviews']
youth_six_month = db['youth_6month']
year = db['youth_12month']

open_window = datetime.datetime.utcnow() + timedelta(weeks=-26)
close_alert = open_window + timedelta(weeks=-2)
close_window = open_window + timedelta(weeks=-4)

youth_year_open = youth_six_month.find({
    'client_information.interviewDate': {"$gte": close_alert.isoformat()},
    'client_information.interviewDate': {"$lt": open_window.isoformat()}
}, {'client_information': 1, "interview_info": 1})
youth_year_close = youth_six_month.find({
    'client_information.interviewDate': {"$gte": close_window.isoformat()},
    'client_information.interviewDate': {"$lt": close_alert.isoformat()}
}, {'client_information': 1, "interview_info": 1})

# Annual Interview Functionality
# print('Youth Annual Interviews Complete')
annual_int = year.find({},{'client_information': 1, "interview_info": 1})
complete_annual_int_names = []
for item in annual_int:
    comp_client = item['client_information']
    complete_annual_int_names.append(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])

# print('Youth Annual Interview Window Open')
youth_annual_open_html = '<ol>'
for item in youth_year_open:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_annual_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'
        
        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        youth_annual_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'


# print('Youth Annual Interview Window Close')
youth_annual_close_html = '<ol>'
for item in youth_year_close:
    client = item['client_information']
    del client['interviewDate']
    del client['interview_type']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_annual_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'

        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        youth_annual_close_html += '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

youth_annual_open_html = youth_annual_open_html+'</ol>'
youth_annual_close_html = youth_annual_close_html+'</ol>'