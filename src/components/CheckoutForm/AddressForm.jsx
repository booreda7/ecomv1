import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core'
import commerce from '../Commerce'
import useStyles from './style'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, text }) => {

    const { register, handleSubmit, watch } = useForm()
    const classes = useStyles();
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')


    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subDivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))


    const ShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        ShippingCountries(checkoutToken.id)
    }, [])


    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);


    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);


    const onSubmit = (data) => text({ ...data, shippingCountry, shippingSubdivision, shippingOption }) ;

    
    return (
        < >
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} className={classes.center}>
                    <TextField label="First name" className={classes.right} required {...register("example")}/>
                    <TextField label="Last name" className={classes.right} required {...register("example")}/>
                    <TextField label="Address" className={classes.right} required {...register("example")}/>
                    <TextField label="Email" className={classes.right} required {...register("example")}/>
                    <TextField label="City" className={classes.right} required {...register("example")}/>
                    <TextField label="Zip/Postal code" className={classes.right} required {...register("example")}/>
                    <Grid item xs={12} sm={6} >
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} >
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)} >
                            {subDivisions.map((subDivision) => (
                                <MenuItem key={subDivision.id} value={subDivision.id}>
                                    {subDivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                    <Button variant='contained' type='submit' color='primary'>Next</Button>
                </div>
            </form>

        </>
    )
 
}

export default AddressForm;
