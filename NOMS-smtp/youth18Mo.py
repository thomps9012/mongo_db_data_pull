import os
import pprint
import datetime
from pymongo import MongoClient
from datetime import timedelta

client = MongoClient(os.environ.get('NOMSDB_URI'))
db = client['interviews']
youth_year = db['youth_12month']
youth_eighteen_month = db['youth_18month']

open_window = datetime.datetime.utcnow() + timedelta(weeks=-26)
close_alert = open_window + timedelta(weeks=-2)
close_window = open_window + timedelta(weeks=-4)

# eighteen month interview open and close
youth_eighteen_month_open = youth_year.find({
    'client_information.interviewDate': {"$gte": close_alert.isoformat()},
    'client_information.interviewDate': {"$lt": open_window.isoformat()}
}, {'client_information': 1, 'interview_info': 1})
youth_eighteen_month_close = youth_year.find({
     'client_information.interviewDate': {"$gte": close_window.isoformat()},
     'client_information.interviewDate': {"$lt": close_alert.isoformat()}
 }, {'client_information': 1, 'interview_info': 1})

 # two youth_year interview open and close
# two_youth_year_window_open = youth_eighteen_month.find({
#     'client_information.interviewDate': {"$gt": open_window},
#     'client_information.interviewDate': {"$lt": close_alert}
# }, {'client_information': 1})
# two_youth_year_window_close = youth_eighteen_month.find({
#     'client_information.interviewDate': {"$gt": close_alert},
#     'client_information.interviewDate': {"$lt": close_window}
# }, {'client_information': 1})

# 18 Month Interview Functionality
print('Youth 18 Month Interviews Complete')
youth_eighteen_month_int = youth_eighteen_month.find({},{'client_information': 1, 'interview_info': 1})
complete_youth_eighteen_month_int_names = []
for item in youth_eighteen_month_int:
    comp_client = item['client_information']
    pprint.pprint(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])
    complete_youth_eighteen_month_int_names.append(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])

print('Youth 18 Month Interview Window Open')
youth_eighteen_month_open_html = '<ol>'
for item in youth_eighteen_month_open:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_youth_eighteen_month_int_names:
        pprint.pprint(client['client_info']['client_first_name'])
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'
        
        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        youth_eighteen_month_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

print('Youth 18 Month Interview Window Close')
youth_eighteen_month_close_html = '<ol>'
for item in youth_eighteen_month_close:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_youth_eighteen_month_int_names:
        pprint.pprint(client['client_info']['client_first_name'], client['client_info']['client_last_name'])
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+str(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+str(client['emergency_contact'][item])+'</li>'

        contact_info = contact_info='</ul>'
        client_info = client_info+'</ul>'
        youth_eighteen_month_close_html =+ '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

youth_eighteen_month_open_html = youth_eighteen_month_open_html+'</ol>'
youth_eighteen_month_close_html = youth_eighteen_month_close_html+'<ol>'