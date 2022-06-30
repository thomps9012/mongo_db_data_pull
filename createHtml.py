import json

class createHtmlList:
    def createOpenList(open_filtered):
        open_list = '<ul style="list-style: none; margin:10; padding:10">'
        for item in open_filtered:
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(',', ':')).replace('\n', '<br>').replace('"', ' ')
            open_list += '<li style="display:inline-block; padding: 10px; margin: 10px; border-radius: 10;"><pre>'+ client_info + '</pre></li>'
        open_list += '</ul>'
        # pprint(open_list)
        return open_list
    def createCloseList(close_filtered):
        close_list = '<ul style="list-style: none; margin:10; padding:10">'
        for item in close_filtered:
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(', ', ':')).replace('\n', '<br>').replace('"', ' ')
            close_list += '<li style="display:inline-block; padding: 5px; margin: 5px; border-radius: 10;"><pre>'+ client_info + '</pre></li>'
        close_list += '</ul>'
        # pprint(close_list)
        return close_list

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