import datetime
import os
import logging

import azure.functions as func

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from eighteenMo import eighteen_month_close_html, eighteen_month_open_html
from sixMo import six_month_close_html, six_month_open_html
from yearInt import annual_close_html, annual_open_html
from youth6Mo import youth_six_month_close_html, youth_six_month_open_html
from youth18Mo import (youth_eighteen_month_close_html,
                       youth_eighteen_month_open_html)
from youthYearInt import youth_annual_close_html, youth_annual_open_html

today = datetime.date.today()
weekStart = str(today.month)+'/'+str(today.day)+'/'+str(today.year)
def emailSMTP():
    message = Mail(
        from_email='sthompson@norainc.org',
        # to_emails='tosin@norainc.org, aprescott@norainc.org',
        to_emails='thomps9012@gmail.com',
        subject='Client Interview Report for Week of: '+weekStart,
        html_content= (
        '<h1>Client Interview Report for Week of: '+str(datetime.date.today())
        + '</h1><hr /><br /><h2>Six Month Interviews</h2><hr /> <h3>Interview Windows Opening:</h3> '
        + six_month_open_html 
        +'<h3>Interview Windows Closing:</h3> ' + six_month_close_html 
        +'<br /><h3>Youth Interview Windows Opening:</h3>' + youth_six_month_open_html
        +'<h3>Youth Interview Windows Closing:</h3>'+youth_six_month_close_html
        + '<br /><h2>Annual Interviews</h2><hr /> <h3>Interview Windows Opening:</h3> '
        +'<h3>Interview Windows Closing:</h3> ' + annual_close_html
        + annual_open_html  + '<br /><h3>Youth Interview Windows Opening:</h3>'+ youth_annual_open_html
        + '<h3>Youth Interview Windows Closing:</h3>'+youth_annual_close_html
        +'<br /><h2>18 Month Interviews</h2><hr /> <h3>Interview Windows Opening:</h3> '
        + eighteen_month_open_html +'<h3>Interview Windows Closing:</h3>' + eighteen_month_close_html 
        +'<br /><h3>Youth Interview Windows Opening:</h3>'+youth_eighteen_month_open_html
        +'<h3>Youth Interview Windows Closing:</h3>'+youth_eighteen_month_close_html
        )
    )

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        return response
        # print(response.status_code)
        # print(response.body)
        # print(response.headers)
    except Exception as e:
        return (str(e))

def main(nomssmtpTimer: func.TimerRequest) -> emailSMTP():
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    if nomssmtpTimer.past_due:
        logging.info('The timer is past due!')

    logging.info('NOMS SMTP ran at %s', utc_timestamp)