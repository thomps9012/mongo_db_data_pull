import sys
sys.path.append("")
from createJSX import createAccordion, createJSX
from getInterviewData import getInterviews, FilterInterviews

open_data, close_data, complete_data = getInterviews.getData('12month', '18month')
six_month_open_filtered, six_month_close_filtered = FilterInterviews.filter(open_data, close_data, complete_data)

open_list = createAccordion.createOpenList(six_month_open_filtered)
close_list = createAccordion.createCloseList(six_month_close_filtered)
html = createJSX.createJSX(open_list, close_list, 'eighteenMonth', '18 Month Followups')
f = open('eighteenMonth.js', 'w')
f.write(html)