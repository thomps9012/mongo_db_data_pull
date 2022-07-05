import json

class createHtmlList:
    def createOpenList(open_filtered):
        open_list = '<ul style={{listStyle: "none", margin:10, padding:10}}>'
        for item in open_filtered:
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(',', ':')).replace('"', ' ')
            open_list += '<li style={{display: "inline-block", padding: 10, margin: 10, borderRadius: 10}}><pre>{`'+ client_info + '`}</pre></li>'
        open_list += '</ul>'
        # pprint(open_list)
        return open_list
    def createCloseList(close_filtered):
        close_list = '<ul style={{listStyle: "none", margin:10, padding:10}}>'
        for item in close_filtered:
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(',', ':')).replace('"', ' ')
            close_list +=  '<li style={{display: "inline-block", padding: 10, margin: 10, borderRadius: 10}}><pre>{`'+ client_info + '`}</pre></li>'
        close_list += '</ul>'
        # pprint(close_list)
        return close_list

class createHtml:
    def createHtml(open_list, close_list, title, stringTitle):
        html = 'export default function '+ title+'() {'
        html += 'return ('
        html += '<>'
        html += '<h1 style={{textAlign: "center"}}>'+stringTitle+'</h1>'
        html += '<h2 style={{textAlign: "center"}}>Open</h2>'
        html += open_list
        html += '<h2 style={{textAlign: "center"}}>Closing</h2>'
        html += close_list
        html += '</>'
        html += ')'
        html += '}'
        return html