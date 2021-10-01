#api = r'https://storage.googleapis.com/angry-boars/metadata/256.json'
api = r'ipfs://QmXhnriGAoXo6P98bTxqToESKSmQzbbQbBeFE3BPY7SFvg/256'
total_supply = 10
number_we_input_into_baseURI = '256'

if r'ipfs://' in api:
    api = api.replace(r'ipfs://', 'https://ipfs.io/ipfs/')

replaced_api = api.replace(number_we_input_into_baseURI, 'REPLACE')

#for i in range(1, total_supply+1):
#    real_api = replaced_api.replace('REPLACE', str(i))
#    print('GET API Request To: ' + real_api)

for i in range(1, total_supply+1):
    real_api = api.replace(number_we_input_into_baseURI, str(i))
    print('GET API Request To: ' + real_api)
