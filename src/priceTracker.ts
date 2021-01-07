export class PriceTracker extends Entity {
  public logo: GLTFShape
  public symbol: string
  public price: number
  public change: number
  public symbolTextShape: TextShape
  public priceTextShape: TextShape
  public changeTextShape: TextShape

  constructor(logo: GLTFShape, symbol: string, transform: Transform) {
    super()
    this.logo = logo
    this.symbol = symbol
    this.price = -1
    this.addComponent(transform)
    engine.addEntity(this)

    let logoEntity = new Entity()
    logoEntity.addComponent(this.logo)
    logoEntity.addComponent(new Transform())
    logoEntity.setParent(this)

    let symbolEntity = new Entity()
    this.symbolTextShape = new TextShape("...")
    symbolEntity.addComponent(this.symbolTextShape)
    symbolEntity.getComponent(TextShape).font = new Font(Fonts.SanFrancisco_Heavy)
    symbolEntity.getComponent(TextShape).hTextAlign = "left"
    symbolEntity.getComponent(TextShape).fontSize = 4
    symbolEntity.addComponent(new Transform())
    symbolEntity.getComponent(Transform).position.x += 0.8
    symbolEntity.setParent(this)

    let priceEntity = new Entity()
    this.priceTextShape = new TextShape("...")
    priceEntity.addComponent(this.priceTextShape)
    priceEntity.getComponent(TextShape).hTextAlign = "left"
    priceEntity.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
    priceEntity.getComponent(TextShape).fontSize = 4
    priceEntity.addComponent(new Transform())
    priceEntity.getComponent(Transform).position.x += 3.6
    priceEntity.setParent(this)

    let changeEntity = new Entity()
    this.changeTextShape = new TextShape("...")
    changeEntity.addComponent(this.changeTextShape)
    changeEntity.getComponent(TextShape).hTextAlign = "right"
    changeEntity.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
    changeEntity.getComponent(TextShape).fontSize = 4
    changeEntity.addComponent(new Transform())
    changeEntity.getComponent(Transform).position.x += 7.8
    changeEntity.setParent(this)
  }

  updatePrice(price: number, change: number) {
    this.price = price
    this.change = change
    this.symbolTextShape.value = this.symbol 
    this.priceTextShape.value = "$" + parseFloat(this.price.toString()).toFixed(2)
    this.changeTextShape.value = parseFloat(this.change.toString()).toFixed(2) + "%"

    change < 0? this.changeTextShape.color = Color3.Red(): this.changeTextShape.color = Color3.Green()
  }
}
