import os
import datetime
from pymongo import MongoClient
from datetime import timedelta

atlas_client = MongoClient(os.environ.get('ATLAS_URI'))
atlas_db = atlas_client['noms-interviews']
atlas_intake = atlas_db['intake']
atlas_six_month = atlas_db['6month']

open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
close_alert = open_window + timedelta(weeks=4)

# six month interview open and close
atlas_six_month_open = atlas_intake.find({
    "interview_info.interviewDate": {"$gte": close_alert.isoformat()},
    "interview_info.interviewDate": {"$lt": open_window.isoformat()}
}, {"client_information": 1, "interview_info": 1})
atlas_six_month_close = atlas_intake.find({
    'interview_info.interviewDate': {"$lt": close_alert.isoformat()}
}, {'client_information': 1, "interview_info": 1})


# six month open
six_month_int_atlas = atlas_six_month.find({},{'client_information': 1, 'interview_info': 1})
complete_six_int_names_atlas = []
for item in six_month_int_atlas:
    comp_client = item['client_information']
    complete_six_int_names_atlas.append(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])

# six month open
six_month_open_html = '<ol>'
for item in atlas_six_month_open:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_six_int_names_atlas:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'

        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        six_month_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'


# six month close
six_month_close_html = '<ol>'
for item in atlas_six_month_close:
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
        six_month_close_html += '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'


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

six_month_open_html = six_month_open_html+'</ol>'
six_month_close_html = six_month_close_html+'</ol>'
