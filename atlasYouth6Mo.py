import sys
sys.path.append("")
from createHtml import createHtml, createHtmlList
from getInterviewData import getInterviews, FilterInterviews

open_data, close_data, complete_data = getInterviews.getData('youth_intake', 'youth_6month')

six_month_open_filtered, six_month_close_filtered = FilterInterviews.filter(open_data, close_data, complete_data)

open_list = createHtmlList.createOpenList(six_month_open_filtered)
close_list = createHtmlList.createCloseList(six_month_close_filtered)
html = createHtml.createHtml(open_list, close_list)
f = open('6month_youth_followups.html', 'w')
f.write(html)