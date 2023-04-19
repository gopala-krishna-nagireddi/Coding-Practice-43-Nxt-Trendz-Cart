import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onClickRemoveAllItems = () => {
        removeAllCartItems()
      }

      const cartTotal = cartList.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllItems}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="cart-summary-container">
                  <h1 className="cart-total">
                    Order Total:{' '}
                    <span className="bill-amount">Rs {cartTotal}/-</span>
                  </h1>
                  <p className="cart-length">{cartList.length} items in cart</p>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
