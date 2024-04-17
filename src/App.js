import {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'

import Login from './components/Login'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {cartList: [], title: ''}

  addCartItem = (item, id, mId) => {
    const {cartList} = this.state
    const isExist = cartList.filter(each => each.dishId === id)
    console.log('is exist list=', isExist)
    console.log('dish id=', id)

    if (isExist.length !== 0) {
      const dish = isExist.pop()
      const index = cartList.findIndex(each => each.dishId === id)
      console.log('index=', index)

      const {dishQuantity} = dish
      const updatedQuantity = dishQuantity + 1
      const newDish = {...dish, dishQuantity: updatedQuantity}
      cartList.splice(index, 1, newDish)

      this.setState({
        cartList: [...cartList],
      })
    } else {
      this.setState({
        cartList: [...cartList, {...item, menuCategoryId: mId}],
      })
    }
  }

  updateTitle = title => {
    this.setState({
      title,
    })
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const dish = cartList.filter(each => each.dishId === id)
    const dt = dish[0].dishQuantity
    console.log('dish and its quantity=', dish, dt)
    if (dt === 1) {
      const index = cartList.findIndex(each => each.dishId === id)
      cartList.splice(index, 1)
      this.setState({
        cartList,
      })
    } else {
      this.setState({
        cartList: cartList.map(each => {
          if (each.dishId === id) {
            const {dishQuantity} = each
            return {...each, dishQuantity: dishQuantity - 1}
          }
          return each
        }),
      })
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(each => {
        if (each.dishId === id) {
          const {dishQuantity} = each
          return {...each, dishQuantity: dishQuantity + 1}
        }
        return each
      }),
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.filter(each => each.dishId !== id),
    })
  }

  render() {
    const {cartList, title} = this.state
    console.log('cart list=', cartList)
    return (
      <>
        <CartContext.Provider
          value={{
            cartList,
            title,
            updateTitle: () => {},
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            addCartItem: this.addCartItem,
            removeAllCartItems: this.removeAllCartItems,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/cart" component={Cart} />

              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </CartContext.Provider>
      </>
    )
  }
}

export default App
