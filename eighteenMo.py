import os
import datetime
from pymongo import MongoClient
from datetime import timedelta

client = MongoClient(os.environ.get('NOMSDB_URI'))
db = client['interviews']
year = db['12month']
eighteen_month = db['18month']

open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
close_alert = open_window + timedelta(weeks=4)


# eighteen month interview open and close
eighteen_month_open = year.find({
    'client_information.interviewDate': {"$gte": close_alert.isoformat()},
    'client_information.interviewDate': {"$lt": open_window.isoformat()}
}, {'client_information': 1, 'interview_info': 1})
eighteen_month_close = year.find({
     'client_information.interviewDate': {"$lt": close_alert.isoformat()}
 }, {'client_information': 1, 'interview_info': 1})

 # two year interview open and close
# two_year_window_open = eighteen_month.find({
#     'client_information.interviewDate': {"$gt": open_window},
#     'client_information.interviewDate': {"$lt": close_alert}
# }, {'client_information': 1})
# two_year_window_close = eighteen_month.find({
#     'client_information.interviewDate': {"$gt": close_alert},
#     'client_information.interviewDate': {"$lt": close_window}
# }, {'client_information': 1})

# 18 Month Interview Functionality
# print('18 Month Interviews Complete')
eighteen_month_int = eighteen_month.find({},{'client_information': 1, 'interview_info': 1})
complete_eighteen_month_int_names = []
for item in eighteen_month_int:
    comp_client = item['client_information']
    complete_eighteen_month_int_names.append(comp_client['client_info']['client_first_name'], comp_client['client_info']['client_last_name'])

# print('18 Month Interview Window Open')
eighteen_month_open_html = '<ol>'
for item in eighteen_month_open:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_eighteen_month_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'
        
        contact_info = contact_info+'</ul>'
        client_info = client_info+'</ul>'
        eighteen_month_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

# print('18 Month Interview Window Close')
eighteen_month_close_html = '<ol>'
for item in eighteen_month_close:
    client = item['client_information']
    if client['client_info']['client_first_name'] and client['client_info']['client_last_name'] not in complete_eighteen_month_int_names:
        client_info = '<ul>'
        contact_info = '<ul>'

        for item in client['client_info']:
            client_info+='<li>'+str(client['client_info'][item])+'</li>'
        for item in client['emergency_contact']:
            contact_info+='<li>'+str(client['emergency_contact'][item])+'</li>'

        contact_info = contact_info='</ul>'
        client_info = client_info+'</ul>'
        eighteen_month_close_html =+ '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

eighteen_month_open_html = eighteen_month_open_html+'</ol>'
eighteen_month_close_html = eighteen_month_close_html+'<ol>'