import { PriceTracker } from "./priceTracker"

export class PriceUpdateSystem {
  public trackers: PriceTracker[]

  public lastUpdated: number
  public startSeconds: number

  constructor(trackers: PriceTracker[]) {
    this.trackers = trackers

    this.startSeconds = Math.floor(Date.now() / 1000) // Starting time in seconds.
    let clockSeconds = new Date().getSeconds()
    let onesPlace = clockSeconds - Math.floor(clockSeconds / 10) * 10
    this.lastUpdated = this.startSeconds - onesPlace

    this.getNewPrices()
  }

  public update(dt: number) {
    let currentSeconds = Math.floor(Date.now() / 1000)
    if (currentSeconds - this.lastUpdated >= 10) {
      // Every 10 seconds.
      this.lastUpdated = currentSeconds
      this.getNewPrices()
    }
  }

  public async getNewPrices() {
    try {
      let targetUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,decentraland&vs_currencies=usd&include_24hr_change=true"
      let response = await fetch(targetUrl)
      let json = await response.json()

      let prices = {
        BTCUSD: json.bitcoin.usd,
        ETHUSD: json.ethereum.usd,
        MANAUSD: json.decentraland.usd,
      }

      let changes = {
        BTCUSD: json.bitcoin.usd_24h_change,
        ETHUSD: json.ethereum.usd_24h_change,
        MANAUSD: json.decentraland.usd_24h_change,
      }

      // Is it a green day or red day for bitcoin?
      json.bitcoin.usd_24h_change > 0 ? log("Green eyes") : log("Red eyes")

      for (let tracker of this.trackers) {
        tracker.updatePrice(prices[tracker.symbol], changes[tracker.symbol])
      }
    } catch {
      log("Failed to connect to CoinGecko API.")
    }
  }
}
