import json
from pprint import pprint
#import urllib2
import requests



emailTpls = []
with open('payload.json') as json_data:
    emails = json.load(json_data, strict=False)

for email in emails:

    emailTpls.append((email['addresses']['from'][0]['email'].encode('ascii', 'ignore'), email['bodies'][0]['content'].encode('ascii', 'ignore')))

print emailTpls
#print str(docs)

#emailDocs = []
#for email in docs:
#    emailDocs.append({"language": "en","id": "1","text": email})
#reqData = {"documents": emailDocs}


#print str(reqData)


#headers = {'Ocp-Apim-Subscription-Key': '003ee666de544d798f77cdb16be13fed','Content-type': 'application/json', 'Accept': 'application/json'}
#r = requests.post('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', data = str(reqData), headers=headers)

#print r.json()
