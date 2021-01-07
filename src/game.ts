import { PriceTracker } from "./priceTracker"
import { PriceUpdateSystem } from "./priceUpdateSystem"

// Set up price trackers.
let trackers = [
  new PriceTracker(new GLTFShape("models/btcTickerLogo.glb"), "BTCUSD", new Transform({ position: new Vector3(-4, 1, -0.01) })),
  new PriceTracker(new GLTFShape("models/ethTickerLogo.glb"), "ETHUSD", new Transform({ position: new Vector3(-4, 0, -0.01) })),
  new PriceTracker(new GLTFShape("models/dclTickerLogo.glb"), "MANAUSD", new Transform({ position: new Vector3(-4, -1, -0.01) })),
]

// Create update system to update the trackers and the time.
engine.addSystem(new PriceUpdateSystem(trackers))

const backboard = new Entity()
backboard.addComponent(new GLTFShape("models/backboard.glb"))
backboard.addComponent(new Transform({ position: new Vector3(8, 3.9, 8.1), rotation: Quaternion.Euler(0, 90, 0) }))
engine.addEntity(backboard)

for (let i = 0; i < trackers.length; i++) {
  trackers[i].setParent(backboard)
}
