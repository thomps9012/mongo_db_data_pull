import json

class createAccordion:
    def createOpenList(open_filtered):
        open_list = '<Accordion defaultActiveKey="0"> \n'
        i = 0
        for item in open_filtered:
            i += 1
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(',', ':')).replace('"', ' ')
            open_list += '''
            <Accordion.Item eventKey="'''+i.__str__()+'''">
                <Accordion.Header>
                    '''+item.get('client_information').get('client_info').get('client_first_name').__str__()+''' '''+item.get('client_information').get('client_info').get('client_last_name').__str__()+'''
                </Accordion.Header>
                <Accordion.Body>
                        <pre>{`'''+client_info+'''`}</pre>
                </Accordion.Body>
            </Accordion.Item> \n'''
        open_list += '</Accordion>'
        # pprint(open_list)
        return open_list
    def createCloseList(close_filtered):
        close_list = '<Accordion defaultActiveKey="0"> \n'
        i = 0
        for item in close_filtered:
            i += 1
            client_info = json.dumps(item.get('client_information'), indent=4, sort_keys=True, skipkeys=True, default=str, separators=(',', ':')).replace('"', ' ')
            close_list +=  '''
            <Accordion.Item eventKey="'''+i.__str__()+'''">
                <Accordion.Header>
                    '''+item.get('client_information').get('client_info').get('client_first_name').__str__()+''' '''+item.get('client_information').get('client_info').get('client_last_name').__str__()+'''
                </Accordion.Header>
                <Accordion.Body>
                        <pre>{`'''+client_info+'''`}</pre>
                </Accordion.Body>
            </Accordion.Item> \n'''
        close_list += '</Accordion>'
        # pprint(close_list)
        return close_list

class createJSX:
    def createJSX(open_list, close_list, title, stringTitle):
        html = 'import { Accordion } from "react-bootstrap" \n'
        html += 'export default function '+ title+'() { \n'
        html += 'return ( \n'
        html += '<> \n'
        html += '<h1 style={{textAlign: "center"}}>'+stringTitle+'</h1> \n'
        html += '<h2 style={{textAlign: "center"}}>Open</h2> \n'
        html += open_list
        html += '<h2 style={{textAlign: "center"}}>Closing</h2> \n'
        html += close_list
        html += '</> \n'
        html += ') \n'
        html += '} \n'
        return html