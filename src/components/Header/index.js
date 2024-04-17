import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restaurantName} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const onClickLogout = () => {
          Cookies.remove('jwt_token')
          const {history} = props
          history.replace('/login')
        }

        return (
          <div className="header-container">
            <Link to="/" className="heading-link">
              <h1>{restaurantName}</h1>
            </Link>

            <div className="icons-container">
              <p className="my-orders">My Orders</p>

              <Link to="/cart">
                <button
                  type="button"
                  className="cartButtonSty"
                  data-testid="cart"
                >
                  <AiOutlineShoppingCart size={40} />
                </button>
              </Link>

              <p className="cart_count">{cartList.length}</p>

              <button className="logout" type="button" onClick={onClickLogout}>
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
