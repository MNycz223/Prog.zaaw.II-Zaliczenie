import requests

NBP_URL = "https://api.nbp.pl/api/exchangerates/tables/A?format=json"


def fetch_nbp_data():
    response = requests.get(NBP_URL)

    if response.status_code != 200:
        raise Exception("NBP API error")

    data = response.json()[0]

    effective_date = data["effectiveDate"]

    rates = data["rates"]

    for rate in rates:
        rate["effectiveDate"] = effective_date

    return rates
