import './index.css'
import {Link} from 'react-router-dom'

const Empty = () => (
  <div className="empty-container">
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty"
      />
      <h1>Your Cart is Empty</h1>
      <p>Click here to add</p>
      <Link to="/">
        <button type="button" className="add-btn">
          Add
        </button>
      </Link>
    </div>
  </div>
)

export default Empty
