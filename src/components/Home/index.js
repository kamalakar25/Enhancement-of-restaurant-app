import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
//  import Loader from 'react-loader-spinner'
import Header from '../Header'
import Tabs from '../Tabs'
import CategoryItems from '../CategoryItems'
//  import CartContext from '../../Context/CartContext'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    restrauntData: '',
    activeTabId: '11',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log('response =', data)
    const tableMenuList = data[0].table_menu_list

    const categoryDishesFunction = each => ({
      dishAvailability: each.dish_Availability,
      dishType: each.dish_type,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishId: each.dish_id,
      dishName: each.dish_name,
      dishPrice: each.dish_price,
      nextUrl: each.nexturl,
      dishImage: each.dish_image,
      addonCat: each.addonCat,
      dishQuantity: 0,
    })

    const tableMenuListFunction = each => ({
      categoryDishes: each.category_dishes.map(eachCategory =>
        categoryDishesFunction(eachCategory),
      ),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nexturl,
    })

    const newTableMenuList = tableMenuList.map(each =>
      tableMenuListFunction(each),
    )

    if (response.ok === true) {
      const newData = {
        branchName: data[0].branch_name,
        nextUrl: data[0].nextUrl,
        restaurantId: data[0].restaurant_id,
        restaurantImage: data[0].restaurant_image,
        restaurantName: data[0].restaurant_name,
        tableId: data[0].table_id,
        tableMenuList: newTableMenuList,
        tableName: data[0].table_name,
      }
      console.log('new data', newData)

      this.setState({
        restrauntData: newData,
        apiStatus: apiStatusConstant.success,
      })
    }
  }

  updateData = (dishId, qty) => {
    const {restrauntData} = this.state
    const {tableMenuList} = restrauntData
    this.setState({
      restrauntData: {
        ...restrauntData,
        tableMenuList: tableMenuList.map(each => ({
          ...each,
          categoryDishes: each.categoryDishes.map(ech => {
            if (ech.dishId === dishId) {
              return {...ech, dishQuantity: qty}
            }
            return ech
          }),
        })),
      },
    })
  }

  renderTabs = () => {
    const {restrauntData, activeTabId} = this.state
    const {tableMenuList} = restrauntData

    if (tableMenuList !== undefined) {
      return (
        <div className="tabs-container">
          {tableMenuList.map(each => (
            <Tabs
              eachMenu={each}
              key={each.menuCategoryId}
              isActive={activeTabId === each.menuCategoryId}
              updateTabId={this.updateTabId}
            />
          ))}
        </div>
      )
    }
    return ''
  }

  updateTabId = tabId => {
    this.setState(
      {
        activeTabId: tabId,
      },
      this.getData,
    )
  }

  onClickMinus = (id, qty, mId) => {
    const {restrauntData} = this.state
    const {tableMenuList} = restrauntData

    if (qty > 0) {
      this.setState({
        restrauntData: {
          ...restrauntData,
          tableMenuList: tableMenuList.map(each => {
            if (each.menuCategoryId === mId) {
              const {categoryDishes} = each
              const newCategoryDishes = categoryDishes.map(ech => {
                if (ech.dishId === id) {
                  const {dishQuantity} = ech
                  return {...ech, dishQuantity: dishQuantity - 1}
                }
                return ech
              })
              return {...each, categoryDishes: newCategoryDishes}
            }
            return each
          }),
        },
      })
    }
  }

  onClickPlus = (id, qty, mId) => {
    const {restrauntData} = this.state
    const {tableMenuList} = restrauntData

    this.setState({
      restrauntData: {
        ...restrauntData,
        tableMenuList: tableMenuList.map(each => {
          if (each.menuCategoryId === mId) {
            const {categoryDishes} = each
            const newCategoryDishes = categoryDishes.map(ech => {
              if (ech.dishId === id) {
                const {dishQuantity} = ech
                return {...ech, dishQuantity: dishQuantity + 1}
              }
              return ech
            })
            return {...each, categoryDishes: newCategoryDishes}
          }
          return each
        }),
      },
    })
  }

  renderCategoryItems = tableMenuList => {
    const {activeTabId, restrauntData} = this.state
    const {restaurantName} = restrauntData

    if (tableMenuList !== undefined) {
      const newList = tableMenuList.filter(
        each => each.menuCategoryId === activeTabId,
      )

      return (
        <>
          <Header restaurantName={restaurantName} />
          {this.renderTabs()}
          <ul>
            {newList.map(each => (
              <CategoryItems
                eachItem={each.categoryDishes}
                categoryId={each.menuCategoryId}
                key={each.menuCategoryId}
                onClickMinus={this.onClickMinus}
                onClickPlus={this.onClickPlus}
                updateData={this.updateData}
              />
            ))}
          </ul>
        </>
      )
    }
    return ''
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {restrauntData} = this.state
    const {tableMenuList} = restrauntData
    return <>{this.renderCategoryItems(tableMenuList)}</>
  }
}

export default Home
