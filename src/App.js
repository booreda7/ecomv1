import { useState, useEffect } from 'react'
import commerce from './components/Commerce'
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/CheckoutForm/Checkout/Checkout'


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [order, setOrder] = useState({});




  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())

  }
  const addToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }
  const updateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const removeFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div >
        <NavBar totalItems={cart.total_items} />
        <Switch>
          <Route exact path='/ecomv1'>
            <Products products={products} onAddToCart={addToCart} />
          </Route>

          <Route exact path='/ecomv1/cart'>
            <Cart cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} emptyCart={emptyCart}/>
          </Route>

          <Route exact path='/ecomv1/checkout'>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} emptyCart={emptyCart} />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}



export default App;
