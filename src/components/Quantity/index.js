import './index.css'

const Quantity = props => {
  const {
    quantity,
    dishId,

    onClickPlusInCategory,
    onClickMinusInCategory,
  } = props

  const onClickMinus = () => {
    onClickMinusInCategory(dishId, quantity)
  }

  const onClickPlus = () => {
    onClickPlusInCategory(dishId, quantity)
  }

  return (
    <div className="buttons-container">
      <button
        type="button"
        className="quantity_button"
        value={dishId}
        onClick={onClickMinus}
      >
        -
      </button>
      <p>{quantity}</p>

      <button
        type="button"
        value={dishId}
        className="quantity_button"
        onClick={onClickPlus}
      >
        +
      </button>
    </div>
  )
}

export default Quantity
