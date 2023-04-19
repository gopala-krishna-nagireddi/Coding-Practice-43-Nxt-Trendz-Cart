import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachCartItem => eachCartItem.id !== id)

    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    let isQunatityNill = false
    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        const {quantity} = eachCartItem
        if (quantity > 1) {
          return {...eachCartItem, quantity: quantity - 1}
        }
        isQunatityNill = true
      }
      return eachCartItem
    })

    if (isQunatityNill === false) {
      this.setState({cartList: updatedCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        return {...eachCartItem, quantity: eachCartItem.quantity + 1}
      }
      return eachCartItem
    })
    this.setState({cartList: updatedList})
  }

  //   TODO: Update the code here to implement addCartItem

  addCartItem = product => {
    const {cartList} = this.state
    const existedItem = cartList.filter(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (existedItem.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedQuantity = existedItem[0].quantity + product.quantity
      const updatedCartItem = {...existedItem[0], quantity: updatedQuantity}

      const updatedCartList = cartList.map(eachCartItem => {
        if (eachCartItem.id === product.id) {
          return updatedCartItem
        }
        return eachCartItem
      })
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
