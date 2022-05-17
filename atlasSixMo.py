import os
import datetime
from pprint import pprint
from pymongo import MongoClient
from datetime import timedelta

dbclient = MongoClient(os.environ.get('ATLAS_URI'))
db = dbclient.get_database('noms-interviews')
intake = db.get_collection('intake')
six_month = db.get_collection('6month')

open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
close_alert = open_window + timedelta(weeks=-4)

# six month interview open and close
six_month_open = intake.find({
    "interview_info.interviewDate": {"$gte": close_alert.isoformat()},
    "interview_info.interviewDate": {"$lt": open_window.isoformat()}
}, {"client_information": 1, "interview_info": 1})
six_month_close = intake.find({
    'interview_info.interviewDate': {"$lt": close_alert.isoformat()}
}, {'client_information': 1, "interview_info": 1})


# six month open
six_month_int = six_month.find({},{'client_information': 1, 'interview_info': 1})
complete_six_int_names = []
for item in six_month_int:
    complete_client = item['client_information']
    complete_six_int_names.append({complete_client['client_info']['client_first_name'].lower().strip(), complete_client['client_info']['client_last_name'].lower().strip()})

# six month open
six_month_open_html = '<ol>'
for item in six_month_open:
    client = item['client_information']
    if({client['client_info']['client_last_name'].lower().strip(), client['client_info']['client_first_name'].lower().strip()}) not in complete_six_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'

        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        six_month_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'
six_month_open_html += '</ol>'
# six month close
six_month_close_html = '<ol>'
for item in six_month_close:
    client = item['client_information']
    if({client['client_info']['client_last_name'].lower().strip(), client['client_info']['client_first_name'].lower().strip()}) not in complete_six_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'
   
        for item in client['client_info']:
                client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
                contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'
    
        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        six_month_close_html += '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

six_month_close_html += '</ol>'