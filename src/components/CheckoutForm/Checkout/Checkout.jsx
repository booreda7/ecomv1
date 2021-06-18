import React, { useState, useEffect } from 'react'
import { Paper, Typography, Stepper, Step, StepLabel, CssBaseline, Divider, Button } from '@material-ui/core'
import useStyles from './style'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import commerce from '../../../components/Commerce'
import { Link } from 'react-router-dom'

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, onCaptureCheckout, emptyCart }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const classes = useStyles()
    const [shippingData, setShippingData] = useState({})

    const Confirmation = () =>  {
         return (
            <>
                <div>
                    <Typography variant='h5'>Thank you for your purchase!</Typography>
                    <Divider className={classes.divider} />
                </div>
                <br />
                <Button variant='outlined' type='button' component={Link} to='/ecomv1/' onClick={emptyCart}>Back to Home</Button>
            </>
         )
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })

                setCheckoutToken(token)
            } catch (error) {
                
            }
        }
        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const text = (data) => {
        setShippingData(data)
        nextStep()
    }


    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} text={text} /> :
        <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />
    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout} >
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>checkout</Typography>
                    <Stepper className={classes.stepper} activeStep={activeStep}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel> {step} </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
