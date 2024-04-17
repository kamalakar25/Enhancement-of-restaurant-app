import './index.css'
import CartContext from '../../context/CartContext'
import Quantity from '../Quantity'

const CategoryItems = props => {
  const {eachItem, categoryId, onClickMinus, onClickPlus, updateData} = props

  const renderItems = () => {
    const onClickPlusInCategoryItemsFunction = (dishId, quantity) => {
      onClickPlus(dishId, quantity, categoryId)
    }

    const onClickMinusInCategoryItemsFunction = (dishId, quantity) => {
      onClickMinus(dishId, quantity, categoryId)
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          if (eachItem !== undefined) {
            return (
              <ul>
                {eachItem.map(each => {
                  const {
                    dishId,
                    addonCat,
                    dishAvailability,
                    dishCalories,
                    dishCurrency,
                    dishDescription,
                    dishImage,
                    dishName,
                    dishPrice,
                    nextUrl,
                    dishQuantity,
                  } = each

                  const onClickAddToCart = () => {
                    addCartItem(each, dishId, categoryId)
                    updateData(dishId, dishQuantity)
                  }

                  return (
                    <li className="category-list-item" key={dishId}>
                      <img src={nextUrl} alt="isVeg" />
                      <div className="right-container">
                        <div className="text-container">
                          <h1>{dishName}</h1>
                          <p>
                            {dishCurrency}
                            {'  '}
                            {dishPrice}
                          </p>
                          <p>{dishDescription}</p>
                          {dishAvailability ? (
                            <Quantity
                              key={dishId}
                              item={each}
                              quantity={dishQuantity}
                              dishId={dishId}
                              onClickPlusInCategory={
                                onClickPlusInCategoryItemsFunction
                              }
                              onClickMinusInCategory={
                                onClickMinusInCategoryItemsFunction
                              }
                            />
                          ) : (
                            <p className="not-available">Not available</p>
                          )}

                          {addonCat.length !== 0 ? (
                            <p className="customization-button">
                              Customizations available
                            </p>
                          ) : (
                            ''
                          )}

                          {dishAvailability && dishQuantity > 0 ? (
                            <button
                              type="button"
                              className="add-to-cart"
                              onClick={onClickAddToCart}
                            >
                              ADD TO CART
                            </button>
                          ) : (
                            ''
                          )}
                        </div>
                        <p className="dish_calories">
                          {dishCalories} {'  '} calories
                        </p>
                        <img
                          src={dishImage}
                          className="dish_image"
                          alt="item"
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          }
          return ''
        }}
      </CartContext.Consumer>
    )
  }

  return <>{renderItems(eachItem)}</>
}

export default CategoryItems
