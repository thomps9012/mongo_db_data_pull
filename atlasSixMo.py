# import datetime
import sys
sys.path.append("")
# from pprint import pprint
# from pymongo import MongoClient
# from datetime import timedelta

from createHtml import createHtml, createHtmlList
from getInterviewData import getInterviews, FilterInterviews
        # db = dbclient.get_database('noms-interviews')
        # intake = db.get_collection('intake')
        # six_month = db.get_collection('6month')

# ready to be imported
# open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
# print('open window: ', open_window.isoformat())
# close_alert = open_window + timedelta(weeks=-4)
# print('close window: ', close_alert.isoformat())



# class GetInterviews:
#     def getOpenWindows():
#         six_month_open = intake.find({
#             'interview_info.interviewDate': {'$gte': close_alert.isoformat()},
#             'interview_info.interviewDate': {'$lt': open_window.isoformat()},
#         }, {'client_information': 1, 'spars_entry': 1})
#         print('six month open:')
#         for doc in six_month_open:
#             pprint(doc.get('_id').__str__())
#         six_month_close = intake.find({
#             'interview_info.interviewDate': {'$lt': close_alert.isoformat()}
#         }, {'client_information': 1, 'spars_entry': 1})
#         print('six month close:')
#         for item in six_month_close:
#             pprint(item.get('_id').__str__())
#         return six_month_open, six_month_close
#     def getSixMonthComplete():
#         six_month_complete = six_month.find({'spars_entry': True}, {'_id': 1})
#         print('six month complete:')
#         for item in six_month_complete:
#             pprint(item)
#         return six_month_complete

# class FilterInterviews:
#     def filterSixMonth():
#         six_month_open, six_month_close = GetInterviews.getOpenWindows()
#         six_month_complete = GetInterviews.getSixMonthComplete()
#         six_month_open_filtered = []
#         six_month_close_filtered = []
#         six_month_complete_arr = []
#         six_month_open = six_month_open.clone()
#         six_month_close = six_month_close.clone()
#         six_month_complete = six_month_complete.clone()
#         for item in six_month_complete:
#             six_month_complete_arr.append(item.get('_id').__str__())
#         for item in six_month_open:
#             if item.get('_id').__str__() not in six_month_complete_arr:
#                 six_month_open_filtered.append(item)
#         print('six month open filtered:')
#         for item in six_month_open_filtered:
#             pprint(item.get('_id').__str__())
#         for item in six_month_close:
#             if item.get('_id').__str__() not in six_month_complete_arr:
#                 six_month_close_filtered.append(item)
#         print('six month close filtered:')
#         for item in six_month_close_filtered:
#             pprint(item.get('_id').__str__())
#         return six_month_close_filtered, six_month_open_filtered
# six_month_close_filtered, six_month_open_filtered = FilterInterviews.filterSixMonth()

open_data, close_data, complete_data = getInterviews.getData('intake', '6month')
six_month_close_filtered, six_month_open_filtered = FilterInterviews.filter(open_data, close_data, complete_data)

open_list = createHtmlList.createOpenList(six_month_open_filtered)
close_list = createHtmlList.createCloseList(six_month_close_filtered)
html = createHtml.createHtml(open_list, close_list)
f = open('six_month_followups.html', 'w')
f.write(html)