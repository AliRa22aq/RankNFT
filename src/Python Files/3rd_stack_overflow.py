import requests
import json
from collections import Counter
from collections import defaultdict
from time import sleep
import time
from concurrent.futures import as_completed
from requests_futures.sessions import FuturesSession

start_time = time.time()

preset_name = ""
contract_addr = ""
replace_string = ""
min_id = 1
max_id = 10000
offset = 1
modulo = False
delay = 1

count = 0
test_dict = defaultdict(list)

attributes = []

# Multiple API's to try of different projects

#api = 'https://nft-info.dapperdinos.com/dino'
#api = 'https://saveredpanda.com/json'
api = 'https://ipfs.io/ipfs/QmYLW4YTTQVcgqAB6sZwJSv8X4G9UkDcpRowX9ZAJnbZWq'
#api = 'https://api.opensea.io/api/v1/assets?asset_contract_address=0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1&token_ids='

def responses():
    '''
    This function will do a get request to all the API's.
    When queried it will store them in a parametered called "futures".
    '''
    # Defining a list for futures, min ID and max ID.
    nft_id = 1
    max_id = 15
    futures = []
    
    # Running on all the ID's
    for _ in range(max_id):

        # Appending to futures the response from the API.
        futures.append(session.get('{}/{}'.format(api, nft_id)))   
        nft_id += 1

        # Delay the next API request to not crash website.
        sleep(0.02)

        # Printing time the request took and returning the futures parameter.
        print("--- %s seconds ---" % (time.time() - start_time))
    results = futures
    return results


def constract_data(futures):
    '''
    This function will constract the data into dictionaries and parse it.
    '''
    
    output = []
    total_count = 0

    # Running on all futures and making sure the response code is 200.
    for future  in as_completed(futures):
        response = future.result()
        if response.status_code == 200:
            # Loading the responses as text.
            attributes = json.loads(response.text.lower())['attributes']

            # Running on all attributes and parsing it
            for attribute in attributes:
                total_count += 1
                dict_key = attribute["trait_type"].lower()
                dict_value = attribute["value"].lower()
                dict_index = [index for index, data in enumerate(output) if data.get(dict_key, "") == dict_value]

                if dict_index:
                    output[dict_index[0]]['count'] += 1
                else:
                    atb_dict = {dict_key: dict_value, 'count': 1}
                    output.append(atb_dict)
    return output, total_count

def calculate_occurrence_ratio(data_dict, total_count):
    '''
    This function will calculate the rarity score of each trait
    '''
    for index, data in enumerate(data_dict):
        count = data.get('count', 0)
        #ratio = round(((count / total_count)), 2)
        ratio = round((1/(count / total_count)), 2)
        data['Rarity'] = f'{ratio}'

    return data_dict

with FuturesSession() as session:
   futures = responses()
#print(futures)
output_data, total_count = constract_data(futures)

output_dict = calculate_occurrence_ratio(output_data, total_count)

#for output in output_data:
    #if  'lightsaber' in output:
        #print(output)
    #print(output['background'])
print(output_data)





