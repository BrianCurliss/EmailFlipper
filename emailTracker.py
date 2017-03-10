import json
from pprint import pprint
import requests



emailTpls = []
rcrtrKeywords = ['hiring', 'c', 'c++', 'java', 'python', 'ruby', 'devoloper', 'dev-ops', 'script', 'bash', 'sql', 'mongodb', 'e-mail', 'spotlight']

with open('payload.json') as json_data:
    emails = json.load(json_data, strict=False)

for email in emails:
    emailTpls.append((email['addresses']['from'][0]['email'].encode('ascii', 'ignore'), email['bodies'][0]['content'].encode('ascii', 'ignore')))

#print emailTpls[0][0]
emailTpls = emailTpls[1:]

emailDocs = []
for email in emailTpls:
    # Each doc. passed to the Azure analytics API needs a unq id which will be the sender email
    emailDocs.append({'language': 'en', 'id': str(email[0]), 'text': str(email[1])})

reqData = {'documents': emailDocs}
# TODO: Have to filter out emails that are toooooooo big (larger than 10240 bytes)

headers = {'Ocp-Apim-Subscription-Key': '003ee666de544d798f77cdb16be13fed','Content-type': 'application/json', 'Accept': 'application/json'}
r = requests.post('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', data = str(reqData), headers=headers)
# print r.text
emailKeyWords = json.loads(r.text)
emailKeyWords = emailKeyWords['documents'][0]['keyPhrases']
#print emailKeyWords
emailScores = []

for x in range(len(emailKeyWords)):
    emailScores.append(0)
    for wrd in rcrtrKeywords:
            emailScores[x] += emailKeyWords.count(wrd)

print emailScores
