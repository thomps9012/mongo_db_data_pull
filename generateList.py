import os
import datetime
from pymongo import MongoClient

dbclient = MongoClient('mongodb+srv://spars01:H0YXCAGHoUihHcSZ@cluster0.wuezj.mongodb.net/noms-interviews?retryWrites=true&w=majority')
db = dbclient.get_database('noms-interviews')

intake = db.get_collection('intake')
six_month = db.get_collection('6month')
year = db.get_collection('12month')
eighteen_month = db.get_collection('18month')

youth_intake = db.get_collection('youth_intake')
youth_six_month = db.get_collection('youth_6month')
youth_year = db.get_collection('youth_12month')
youth_eighteen_month = db.get_collection('youth_18month')

today = datetime.datetime.today()

intakes_todate = intake.count_documents({})
six_month_todate = six_month.count_documents({})
year_todate = year.count_documents({})
eighteen_month_todate = eighteen_month.count_documents({})

youth_intakes_todate = youth_intake.count_documents({})
youth_six_month_todate = youth_six_month.count_documents({})
youth_year_todate = youth_year.count_documents({})
youth_eighteen_month_todate = youth_eighteen_month.count_documents({})

total_interviews = intakes_todate+six_month_todate+year_todate+eighteen_month_todate+youth_intakes_todate+youth_six_month_todate+youth_year_todate+youth_eighteen_month_todate
print('Total Intakes to date:')
print(intakes_todate)
print('-------------------------')
print('Total 6 Month Interviews to date:')
print(six_month_todate)
print('-------------------------')
print('Total Year Interviews to date:')
print(year_todate)
print('-------------------------')
print('Total 18 Month Interviews to date:')
print(eighteen_month_todate)
print('-------------------------')

print('Total Youth Intakes to date:')
print(youth_intakes_todate)
print('-------------------------')
print('Total Youth 6 Month Interviews to date:')
print(youth_six_month_todate)
print('-------------------------')
print('Total Youth Year Interviews to date:')
print(youth_year_todate)
print('-------------------------')
print('Total Youth 18 Month Interviews to date:')
print(youth_eighteen_month_todate)
print('-------------------------')

print('Total Interviews to date:')
print(total_interviews)
print('-------------------------')