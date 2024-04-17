import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  restrauntData: [],
  title: '',
  updateData: () => {},

  updateTitle: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
