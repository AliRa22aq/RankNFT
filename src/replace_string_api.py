api = 'https://storage.googleapis.com/angry-boars/metadata/256.json'
total_supply = 10

replaced_api = api.replace('256', 'REPLACE')

for i in range(total_supply):
    real_api = replaced_api.replace('REPLACE', str(i))
    print('GET API Request To: ' + real_api)
#6print(replaced_api)

