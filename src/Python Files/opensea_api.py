import requests
import json
from collections import Counter
from collections import defaultdict
from time import sleep
import time
from concurrent.futures import as_completed
from requests_futures.sessions import FuturesSession

start_time = time.time()
   
def responses():
    filtered_nft = []
    futures = []
    for num in range(1, 901):
        filtered_nft.append('&token_ids=' + str(num))

    for num in range(int(len(filtered_nft)/30)):
        api = 'https://api.opensea.io/api/v1/assets?asset_contract_address=0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1&order_direction=desc&limit=30'
        for i in range(30):
            api = api + filtered_nft[i]
        #print(api)
        futures.append(session.get("{}".format(api)))
        filtered_nft = filtered_nft[30:]
        
    return futures

def pricing(futures):
    for future  in as_completed(futures):
        response = future.result()
        data = json.loads(response.text.lower())
        for dat in data['assets']:
            token_id = dat['token_id']
            for_sale = dat['sell_orders']

            if for_sale == None:
                print(token_id + ' Not For Sale')
            else:
                sell_orders = dat['sell_orders'][0]
                
                if sell_orders["payment_token_contract"]["symbol"] == "weth":
                    print(token_id + ' On Auction')
                    
                elif sell_orders["payment_token_contract"]["symbol"] == "eth":
                    price = float(sell_orders['current_price'])
                    price = price/1000000000000000000
                    print(token_id + ' For sale For {} ETH'.format(price))
                
with FuturesSession() as session:
   futures = responses()
   
pricing(futures)  


print("--- %s seconds ---" % (time.time() - start_time))
