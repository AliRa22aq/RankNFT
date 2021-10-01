#api = r'https://storage.googleapis.com/angry-boars/metadata/256.json'
api = r'ipfs://QmXhnriGAoXo6P98bTxqToESKSmQzbbQbBeFE3BPY7SFvg/256'
total_supply = 10

if r'ipfs://' in api:
    api = api.replace(r'ipfs://', 'https://ipfs.io/ipfs/')
print(api)

replaced_api = api.replace('256', 'REPLACE')

for i in range(total_supply):
    real_api = replaced_api.replace('REPLACE', str(i))
    print('GET API Request To: ' + real_api)


