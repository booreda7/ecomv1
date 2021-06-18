import React from 'react'
import {Container, Typography, Grid, Button} from '@material-ui/core'
import useStyles from './style'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'


const Cart = ({cart,updateCartQuantity,emptyCart,removeFromCart}) => {
    
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant='subtitle1'> 
            You have no items in your shopping cart, start adding some! <br />
            <Typography component={Link} to='/' className={classes.link} >Add some.</Typography>
        </Typography>
    )


    const FilledCart = () => (
        
        <>
            <Grid container spacing={3}> 
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} updateCartQuantity={updateCartQuantity}  removeFromCart={removeFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4' > subtotal : {cart.subtotal.formatted_with_symbol}  </Typography>
                <Button className={classes.emptyButton} size="large" type='button' variant='contained' color='secondary' onClick={emptyCart}>Empty Cart</Button>
                <Button component={Link} to='/checkout'  className={classes.checkoutButton} size="large" type='button' variant='contained' color='primary' >Checkout</Button>
            </div>
        </>
        
    );
    if(!cart.line_items) return 'loading ...'

    return (
        <Container className={classes.bkg}>
            <div className={classes.down} />
            <Typography variant='h3' className={classes.title} gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart/> : <FilledCart/> }
        </Container>
    )
}

export default Cart;
