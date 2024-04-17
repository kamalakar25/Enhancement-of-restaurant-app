import './index.css'
//  import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {dish} = props
  const {dishId, dishName, dishPrice, dishImage, dishQuantity} = dish

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickMinusBtn = () => {
          decrementCartItemQuantity(dishId)
        }

        const onClickPlusBtn = () => {
          incrementCartItemQuantity(dishId)
        }

        const onClickRemove = () => {
          removeCartItem(dishId)
        }

        return (
          <li className="cart-item">
            <div className="name-image-container">
              <img src={dishImage} alt="dishImage" className="cart-image" />
              <h3>{dishName}</h3>
            </div>
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-button"
                onClick={onClickMinusBtn}
              >
                -
              </button>
              <p>{dishQuantity}</p>
              <button
                type="button"
                className="quantity-button"
                onClick={onClickPlusBtn}
              >
                +
              </button>
            </div>
            <h3>Rs {dishPrice * dishQuantity}/</h3>
            <button
              type="button"
              className="remove-btn"
              onClick={onClickRemove}
            >
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
