import datetime
import json
from pprint import pprint
from pymongo import MongoClient
from datetime import timedelta

dbclient = MongoClient('mongodb+srv://spars01:H0YXCAGHoUihHcSZ@cluster0.wuezj.mongodb.net/noms-interviews?retryWrites=true&w=majority')
db = dbclient.get_database('noms-interviews')
intake = db.get_collection('intake')
six_month = db.get_collection('6month')

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
        open_list = '<ul style="list-style: none; margin:10; padding:10">'
        for item in six_month_open_filtered:
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(',', ':')).replace('\n', '<br>').replace('"', ' ')
            open_list += '<li style="display:inline-block; padding: 10px; margin: 10px; border-radius: 10;"><pre>'+ client_info + '</pre></li>'
        open_list += '</ul>'
        pprint(open_list)
        return open_list
    def createCloseList(six_month_close_filtered):
        close_list = '<ul style="list-style: none; margin:10; padding:10">'
        for item in six_month_close_filtered:
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(', ', ':')).replace('\n', '<br>').replace('"', ' ')
            close_list += '<li style="display:inline-block; padding: 5px; margin: 5px; border-radius: 10;"><pre>'+ client_info + '</pre></li>'
        close_list += '</ul>'
        pprint(close_list)
        return close_list

six_month_close_filtered, six_month_open_filtered = FilterInterviews.filterSixMonth()

class createHtml:
    def createHtml(open_list, close_list):
        html = '<!DOCTYPE html><html lang=en>'
        html += '<head>'
        html += '<title>Six Month Followups</title>'
        html += '<meta charset="utf-8">'
        html += '<meta name="viewport" content="width=device-width, initial-scale=1">'
        html += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">'
        html += '</head>'
        html += '<body>'
        html += '<h1 style="text-align:center">Six Month Followups</h1>'
        html += '<h2 style="text-align:center">Open</h2>'
        html += open_list
        html += '<h2 style="text-align:center">Closing</h2>'
        html += close_list
        html += '</body>'
        return html

open_list = createHtmlList.createOpenList(six_month_open_filtered)
close_list = createHtmlList.createCloseList(six_month_close_filtered)
html = createHtml.createHtml(open_list, close_list)
f = open('six_month_followups.html', 'w')
f.write(html)