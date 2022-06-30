import datetime
from pymongo import MongoClient
from datetime import timedelta
from pprint import pprint

dbclient = MongoClient('mongodb+srv://spars01:H0YXCAGHoUihHcSZ@cluster0.wuezj.mongodb.net/noms-interviews?retryWrites=true&w=majority')
db = dbclient.get_database('noms-interviews')
youth_intake = db.get_collection('youth_intake')
youth_six_month = db.get_collection('youth_6month')

open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
print('open window: ', open_window.isoformat())
close_alert = open_window + timedelta(weeks=-4)
print('close window: ', close_alert.isoformat())

class GetYouthInterviews:
    def getOpenWindows():
        # six month interview open and close
        six_month_open = youth_intake.find({
            'interview_info.interviewDate': {'$gte': close_alert.isoformat()},
            'interview_info.interviewDate': {'$lt': open_window.isoformat()},
        }, {'client_information': 1, 'spars_entry': 1})
        print('youth six month open:')
        for doc in six_month_open:
            pprint(doc.get('_id').__str__())
        six_month_close = youth_intake.find({
            'interview_info.interviewDate': {'$lt': close_alert.isoformat()}
            }, {'client_information': 1, 'spars_entry': 1})
        print('youth six month close:')
        for item in six_month_close:
            pprint(item.get('_id').__str__())
        return six_month_open, six_month_close
    def getSixMonthComplete():
        six_month_complete = youth_six_month.find({'spars_entry': True}, {'client_information': 1, 'spars_entry': 1})
        print('youth six month complete:')
        for item in six_month_complete:
            pprint(item.get('_id').__str__())
        return six_month_complete

class FilterYouthInterviews:
    def filterSixMonth():
        six_month_open, six_month_close = GetYouthInterviews.getOpenWindows()
        six_month_complete = GetYouthInterviews.getSixMonthComplete()
        six_month_open_filtered = []
        six_month_close_filtered = []
        six_month_complete_arr = []
        six_month_open = six_month_open.clone()
        six_month_close = six_month_close.clone()
        six_month_complete = six_month_complete.clone()
        for item in six_month_complete:
            six_month_complete_arr.append(item.get('_id').__str__())
        for item in six_month_open:
            if item.get('_id').__str__() not in six_month_complete_arr:
                six_month_open_filtered.append(item)
        print('six month open filtered:')
        for item in six_month_open_filtered:
            pprint(item.get('_id').__str__())
        for item in six_month_close:
            if item.get('_id').__str__() not in six_month_complete_arr:
                six_month_close_filtered.append(item)
        print('six month close filtered:')
        for item in six_month_close_filtered:
            pprint(item.get('_id').__str__())
        return six_month_close_filtered, six_month_open_filtered

FilterYouthInterviews.filterSixMonth()
# # print('Youth Six Month Interview Window Open')
# youth_six_month_open_html = '<ol>'
# for item in youth_six_month_open:
#     client = item['client_information']
#     if ({client['client_info']['client_first_name'].lower().strip(), client['client_info']['client_last_name'].lower().strip()}) not in complete_six_int_names:
#         client_info = '<ul>'
#         contact_info = '<ul>'

#         for item in client['client_info']:
#             client_info+='<li>'+(client['client_info'][item])+'</li>'
#         for item in client['emergency_contact']:
#             contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'

#         contact_info = contact_info+'</ul>'
#         client_info = client_info+'</ul>'
#         youth_six_month_open_html += '<li> Client:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'
# youth_six_month_open_html += '</ol>'

# # print('Youth Six Month Interview Window Closing')
# youth_six_month_close_html = '<ol>'
# for item in youth_six_month_close:
#     client = item['client_information']
#     if ({client['client_info']['client_first_name'].lower().strip(), client['client_info']['client_last_name'].lower().strip()}) not in complete_six_int_names:
#         client_info = '<ul>'
#         contact_info = '<ul>'
   
#         for item in client['client_info']:
#                 client_info+='<li>'+(client['client_info'][item])+'</li>'
#         for item in client['emergency_contact']:
#                 contact_info+='<li>'+(client['emergency_contact'][item])+'</li>'
    
#         contact_info = contact_info+'</ul>'
#         client_info = client_info+'</ul>'
#         youth_six_month_close_html += '<li> Client Information:'+client_info+'<br /> Emergency Contact:'+contact_info+'</li>'

# youth_six_month_close_html += '</ol>'
