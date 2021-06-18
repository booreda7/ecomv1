import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons' 
import logo from './download.png'
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom'


const NavBar = ({totalItems}) => {
    const classes = useStyles(); 
    const location = useLocation();
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography color='inherit' variant='h6' className={classes.title} component={Link} to='/ecomv1/' >
                        <img src={logo} alt='commerce site' height='25px' className={classes.image} />
                        E-Commerce 
                    </Typography>
                    
                    <IconButton component={Link} to='/ecomv1/cart' aria-label='show cart items' color='inherit' className={classes.btn}>
                        <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart className={classes.icon}/>
                        </Badge>
                    </IconButton> 
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;
