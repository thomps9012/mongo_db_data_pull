import datetime
from pprint import pprint
from pymongo import MongoClient
from datetime import timedelta

dbclient = MongoClient('mongodb+srv://spars01:H0YXCAGHoUihHcSZ@cluster0.wuezj.mongodb.net/noms-interviews?retryWrites=true&w=majority')
db = dbclient.get_database('noms-interviews')
intake = db.get_collection('intake')
youth_intake = db.get_collection('youth_intake')
six_month = db.get_collection('6month')
youth_six_month = db.get_collection('youth_6month')

open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
print('open window: ', open_window.isoformat())
close_alert = open_window + timedelta(weeks=-4)
print('close window: ', close_alert.isoformat())

class GetInterviews:
    def getOpenWindows():
        six_month_open = intake.find({
            'interview_info.interviewDate': {'$gte': close_alert.isoformat()},
            'interview_info.interviewDate': {'$lt': open_window.isoformat()},
        }, {'client_information': 1, 'spars_entry': 1})
        print('six month open:')
        for doc in six_month_open:
            pprint(doc.get('_id').__str__())
        six_month_close = intake.find({
            'interview_info.interviewDate': {'$lt': close_alert.isoformat()}
        }, {'client_information': 1, 'spars_entry': 1})
        print('six month close:')
        for item in six_month_close:
            pprint(item.get('_id').__str__())
        return six_month_open, six_month_close
    def getSixMonthComplete():
        six_month_complete = six_month.find({'spars_entry': True}, {'_id': 1})
        print('six month complete:')
        for item in six_month_complete:
            pprint(item)
        return six_month_complete

class FilterInterviews:
    def filterSixMonth():
        six_month_open, six_month_close = GetInterviews.getOpenWindows()
        six_month_complete = GetInterviews.getSixMonthComplete()
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
        
class createHtmlList:
    def createOpenList(six_month_open_filtered):
        open_list = '<ul>'
        for item in six_month_open_filtered:
            open_list += '<li>' + item.get('client_information').__str__() + '</li>'
        open_list += '</ul>'
        print('open list:')
        pprint(open_list)
        return open_list
    def createCloseList(six_month_close_filtered):
        close_list = '<ul>'
        for item in six_month_close_filtered:
            close_list += '<li>' + item.get('client_information').__str__() + '</li>'
        close_list += '</ul>'
        print('close list:')
        pprint(close_list)
        return close_list
    


six_month_close_filtered, six_month_open_filtered = FilterInterviews.filterSixMonth()
createHtmlList.createOpenList(six_month_open_filtered)
createHtmlList.createCloseList(six_month_close_filtered)
#     def createClientList(client_list):
#         client_list_html = '<ul>'
#         for item in client_list:
#             client_list_html += '<li>' + item.get('_id').__str__() + '</li>'
#         client_list_html += '</ul>'
#         return client_list_html
    
#     def createContactList(contact_list):
#         contact_list_html = '<ul>'
#         for item in contact_list:
#             contact_list_html += '<li>' + item.get('_id').__str__() + '</li>'
#         contact_list_html += '</ul>'
#         return contact_list_html


# def createSixMonth(six_month_open, six_month_close):
#     for item in six_month_open:



# six month open
# six_month_int = six_month.find({},{'client_information': 1, 'spars_entry': 1, 'interview_info': 1})
# complete_six_int_names = []
# for item in six_month_int:
#     complete_client = item['client_information']
#     complete_client_info = complete_client['client_info']
#     complete_six_int_names.append({complete_client_info['client_first_name'].lower().strip(), complete_client_info['client_last_name'].lower().strip()})
# for item in complete_six_int_names:
#     print(item)
# six_month_open_html = '<ol>'
# # six month open
# for doc in six_month_open:
#     # print('hit')
#     client = doc['client_information']
#     # pprint(client)
#     client_info = client.get('client_info')
#     contact_info = client.get('emergency_contact')
#     if({client_info.get('client_last_name').lower().strip(), client_info.get('client_first_name').lower().strip()}) not in complete_six_int_names:
#         # pprint(item.get('_id'))
#         open_client_li = '<ul>'
#         open_contact_li = '<ul>'

#         for item in client_info:
#             if client_info[item] != '' or client_info[item] != NULL:
#                 open_client_li+='<li>'+(client_info[item])+'</li>'
#         for item in contact_info:
#             print('item hit')
#             print(contact_info[item])
#             if contact_info[item] != '':
#                 open_contact_li+='<li>'+(contact_info[item])+'</li>'

#         open_client_li = open_client_li+'</ul>'
#         open_contact_li = open_contact_li+'</ul>'
#         six_month_open_html += '<li> Client:'+open_client_li+'<br /> Emergency Contact:'+open_contact_li+'</li>'
# six_month_open_html += '</ol>'
# # six month close
# six_month_close_html = '<ol>'
# for item in six_month_close:
#     close_client = item['client_information']
#     close_client_info = close_client['client_info']
#     close_contact_info = close_client['emergency_contact']
#     if({close_client_info['client_last_name'].lower().strip(), close_client_info['client_first_name'].lower().strip()}) not in complete_six_int_names:
#         close_client_li = '<ul>'
#         close_contact_li = '<ul>'
   
#         for item in close_client_info:
#             print('item hit')
#             print(close_client_info[item])
#             if close_client_info[item] != '' or close_client_info[item] != NULL:
#                 close_client_li+='<li>'+(close_client_info[item])+'</li>'
#         for item in close_contact_info:
#             if close_contact_info[item] != '' or close_contact_info[item] != NULL:
#                 close_contact_li+='<li>'+(close_contact_info[item])+'</li>'
    
#         close_client_li = close_client_li+'</ul>'
#         close_contact_li = close_contact_li+'</ul>'
#         six_month_close_html += '<li> Client Information:'+close_client_li+'<br /> Emergency Contact:'+close_contact_li+'</li>'

# six_month_close_html += '</ol>'

# pprint(six_month_open_html)