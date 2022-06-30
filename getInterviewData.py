import datetime
from pymongo import MongoClient
from pprint import pprint
from datetime import timedelta

open_window = datetime.datetime.utcnow() + timedelta(weeks=-22)
print('open window: ', open_window.isoformat())
close_alert = open_window + timedelta(weeks=-4)
print('close window: ', close_alert.isoformat())

class getInterviews:
    def getData(collection1, collection2):
        print('collection1: ', collection1)
        print('collection2: ', collection2)
        dbclient = MongoClient('mongodb+srv://spars01:H0YXCAGHoUihHcSZ@cluster0.wuezj.mongodb.net/noms-interviews?retryWrites=true&w=majority')
        db = dbclient.get_database("noms-interviews")
        first_col = db.get_collection(collection1)
        second_col = db.get_collection(collection2)
        open_data = first_col.find({
            'interview_info.interviewDate': {'$gte': close_alert.isoformat()},
            'interview_info.interviewDate': {'$lt': open_window.isoformat()},
        }, {'client_information': 1, 'spars_entry': 1})
        print('open data:')
        for item in open_data:
            pprint(item.get('_id').__str__())
        close_data = first_col.find({
            'interview_info.interviewDate': {'$lt': close_alert.isoformat()}
        }, {'client_information': 1, 'spars_entry': 1})
        print('close data:')
        for item in close_data:
            pprint(item.get('_id').__str__())
        complete_data = second_col.find({'spars_entry': True}, {'_id': 1})
        return open_data, close_data, complete_data

class FilterInterviews:
    def filter(open_data, close_data, complete_data):
        open_data = open_data.clone()
        close_data = close_data.clone()
        complete_data = complete_data.clone()
        open_filtered = []
        close_filtered = []
        complete_filtered = []
        for item in complete_data:
            complete_filtered.append(item.get('_id').__str__())
        for item in open_data:
            if item.get('_id').__str__() not in complete_filtered:
                open_filtered.append(item)
        print('open filtered:')
        for item in open_filtered:
            pprint(item.get('_id').__str__())
        for item in close_data:
            if item.get('_id').__str__() not in complete_filtered:
                close_filtered.append(item)
        print('close filtered:')
        for item in close_filtered:
            pprint(item.get('_id').__str__())
        return open_filtered, close_filtered
