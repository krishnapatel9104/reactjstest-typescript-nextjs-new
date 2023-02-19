import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { StepperComp } from '../../src/components/common/StepperComp';
import { YourOrder } from '../../src/components/common/YourOrder';
import { useDispatch, useSelector } from '../../src/store';
import { setPaymentDetails } from '../../src/store/reducers/userPaymentDetails/userPaymentDetails.slice';
import { restoreUserSelectedProductList } from '../../src/store/reducers/userSelectedProductList/userSelectedProductList.slice';

// import { ProtectedRoute } from '../../utils/ProtectedRoute';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { userPaymentDetailsType } from '../../src/types/redux/userPaymentDetails.type';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextPage } from 'next';

interface CheckoutPageProps {}
const CheckoutPage: NextPage<CheckoutPageProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvvCode: ''
  });

  const [paymentData, setPaymentData] = useState<userPaymentDetailsType>({
    paymentMethod: 'creditcard',
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvvCode: 0
  });
  const reduxProductDetail = useSelector(state => state.userSelectedProductListSlice);
  const reduxPaymentDetail = useSelector(state => state.userPaymentDetailsSlice);

  console.log('reduxProductDetail paymentdetail : ', reduxPaymentDetail);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('expiration changes : ', name, value);
    if (name === 'paymentMethod') setPaymentData({ ...paymentData, paymentMethod: value });
    if (name === 'cardName') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[A-Za-z ]*$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Card name should contain only alphabet'
        });
      } else {
        setErrors({ ...errors, [name]: '' });
        // setErrors(current => {
        //   const { cardName, ...rest } = current;
        //   return rest;
        // });
        setPaymentData({ ...paymentData, cardName: value });
      }
    }
    if (name === 'cardNumber') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[0-9]{12}$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Card number should be 12 digit only'
        });
      } else {
        setErrors({ ...errors, [name]: '' });
        setPaymentData({ ...paymentData, cardNumber: value });
      }
    }
    if (name === 'cvvCode') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[0-9]{3}$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'CVV Code should be 3 digit only'
        });
      } else {
        setErrors({ ...errors, [name]: '' });
        setPaymentData({ ...paymentData, cvvCode: parseInt(value) });
      }
    }
    if (name === 'expiration') setPaymentData({ ...paymentData, expiration: value });
  };

  useEffect(() => {
    if (reduxProductDetail?.cartProductDetails?.length === 0) {
      let list = JSON.parse(localStorage.getItem('userSelectedProductList'));
      console.log('localstroage shipping : ', list);

      if (list?.length > 0) {
        dispatch(restoreUserSelectedProductList(list));
      } else {
        router.push('/');
      }
    }
  });
  // useEffect(() => {
  //   if (reduxProductDetails?.cartProductDetails) {
  //     localStorage.setItem(
  //       'userSelectedProductList',
  //       JSON.stringify(reduxProductDetails.cartProductDetails)
  //     );
  //   }
  // }, [reduxProductDetails]);

  const isValidate = () => {
    if (
      paymentData.paymentMethod &&
      paymentData.cardName &&
      paymentData.cardNumber &&
      paymentData.expiration &&
      paymentData.cvvCode
    )
      return true;
    else return false;
  };
  const handleClick = () => {
    if (isValidate()) {
      dispatch(setPaymentDetails(paymentData));
      router.push('/confirmation');
    }
  };
  return (
    // <ProtectedRoute>
    <Box
      sx={{
        marginTop: '50px',
        display: 'flex',
        padding: {
          xs: '0 40px',
          sm: '0 50px',
          md: '0 90px',
          lg: '0 60px',
          xl: '0 150px'
        },
        gap: { xs: '10px', lg: '40px' },
        flexDirection: { xs: 'column', lg: 'row' }
      }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
        <StepperComp activeStep={1} />
        <Box
          sx={{
            padding: { xs: '0', md: '0' }
          }}>
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: '700',
              marginTop: '80px'
            }}>
            Payment Method
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="paymentMethod"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: { sm: '50px' },
              justifyContent: {
                xs: 'space-between',
                sm: 'inherit'
              }
            }}
            onChange={handleChange}
            value={paymentData.paymentMethod}>
            <Box>
              <FormControlLabel value="creditcard" control={<Radio />} label="" />
              <Image src="/images/paymenticon1.png" alt="paymenticon1" height={34} width={46} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <FormControlLabel value="paypal" control={<Radio />} label="" />
              <Image src="/images/paymenticon2.png" alt="paymenticon2" height={80} width={100} />
            </Box>
            <Box>
              <FormControlLabel value="other" control={<Radio />} label="" />
              <Image src="/images/paymenticon3.png" alt="paymenticon3" height={34} width={46} />
            </Box>
          </RadioGroup>
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: '700',
              marginTop: '50px'
            }}>
            Payment Details
          </Typography>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start' },
              width: { sm: '100%' },
              gap: { sm: '100px' },
              marginBottom: { md: '50px' }
            }}>
            <TextField
              id="standard-number"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              name="cardName"
              error={errors?.cardName ? true : false}
              helperText={errors?.cardName ? errors?.cardName : null}
              onChange={handleChange}
              variant="standard"
              placeholder="Enter Name Card"
              sx={{
                fontSize: '22px',
                width: '100%',
                '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '22px'
                },
                '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                  marginTop: '30px !important'
                },
                '& .MuiFormHelperText-root': {
                  color: 'red'
                }
              }}
            />
          </Box>
          <Box sx={{ marginTop: '50px', position: 'relative' }}>
            <TextField
              id="standard-number"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              name="cardNumber"
              error={errors?.cardNumber ? true : false}
              helperText={errors?.cardNumber ? errors?.cardNumber : null}
              onChange={handleChange}
              variant="standard"
              placeholder="Card Number"
              sx={{
                fontSize: '22px',
                width: '100%',
                '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '22px'
                },
                '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                  marginTop: '30px !important'
                },
                '& .MuiFormHelperText-root': {
                  color: 'red'
                }
              }}
            />
            <Image
              src="/images/visa.png"
              alt="visa"
              height={13}
              width={35}
              style={{
                position: 'absolute',
                top: '20%',
                right: '2%'
              }}
            />
            <Image
              src="/images/visaangle.png"
              alt="visaangle"
              height={10}
              width={10}
              style={{
                position: 'absolute',
                top: '20%',
                right: '0%'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '50px',
              width: '100%'
            }}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="DD-MM-YYYY"
                  label="Expiration"
                  value={paymentData.expiration}
                  onChange={(value) => setPaymentData({ ...paymentData, expiration: value })}
                  renderInput={(props) => <TextField {...props} />}
                />
              </LocalizationProvider> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Expiration"
                  value={paymentData.expiration}
                  onChange={(value) => setPaymentData({ ...paymentData, expiration: value })}
                  renderInput={(params) => <TextField {...params} value={paymentData.expiration} />}
                />

                <DatePicker
                  autoOk
                  mask="__/__"
                  placeholder="YY/MM"
                  format="YY/MM"
                  value={paymentData.expiration}
                  onChange={(value) => setPaymentData({ ...paymentData, expiration: value })}
                  renderInput={(params) => <TextField {...params} value={paymentData.expiration} />}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container justifyContent="space-around">
                    <DatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label={label}
                      inputFormat={format ?? "MM/dd/yyyy"}
                      mask={mask ?? "__/__/____"}
                      onChange={handleDateChange}
                      value={selectedDate}
                      InputAdornmentProps={{ position: "start" }}
                      minDate={minDate}
                      maxDate={new Date(maxdate)}
                      shouldDisableDate={disableCustomDate}
                      disablePast={disablePastDate === "true" ? true : false}
                      views={views ?? ["year", "month", "day"]}
                      InputProps={{ "data-testid": "datePicker" }}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          {...otherProps}
                          fullWidth={true}
                          placeholder={placeholder}
                          error={error ? error : errorTF}
                          helperText={error ? helperText : helperTextTF}
                          type="password"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </LocalizationProvider>
              </LocalizationProvider> */}

            <TextField
              id="standard-number"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              name="expiration"
              onChange={handleChange}
              variant="standard"
              // format="yy/MM"
              placeholder="yy/MM"
              sx={{
                fontSize: '22px',
                width: '45%',
                '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '22px'
                },
                '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                  marginTop: '30px !important'
                },
                '& .MuiFormHelperText-root': {
                  color: 'red'
                }
              }}
            />
            <TextField
              id="standard-number"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              name="cvvCode"
              error={errors?.cvvCode ? true : false}
              helperText={errors?.cvvCode ? errors?.cvvCode : null}
              onChange={handleChange}
              variant="standard"
              placeholder="CVV Code"
              sx={{
                fontSize: '22px',
                width: '45%',
                '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                  fontSize: '22px'
                },
                '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                  marginTop: '30px !important'
                },
                '& .MuiFormHelperText-root': {
                  color: 'red'
                }
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: '50px',
              fontFamily: 'Nunito',
              fontWeight: '400',
              fontSize: '18px',
              color: '#C4C4C4',
              letterSpacing: '1.5px'
            }}>
            By Clicking *Confirm Payment* I agree to
            <br /> company terms of services
          </Box>
          <Box
            sx={{
              marginTop: '90px',
              marginBottom: { xs: '90px', xl: '150px' },
              display: 'flex',
              gap: '20px',
              flexFlow: {
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'column-reverse',
                xl: 'inherit'
              },
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', xl: 'row' }
            }}>
            <Button
              variant="contained"
              sx={{
                fontFamily: 'Nunito',
                fontSyle: 'normal',
                fontWeight: '400',
                fontSize: '20px',
                lineHeight: '27px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: '#111827',
                width: { xs: '100%', xl: '45px' },
                height: '60px',
                padding: '15px 100px',
                textTransform: 'inherit',
                backgroundColor: 'white',
                border: '1px solid black'
              }}
              onClick={() => router.push('/shipping')}>
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                fontFamily: 'Nunito',
                fontSyle: 'normal',
                fontWeight: '400',
                fontSize: '20px',
                lineHeight: '27px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: '#FFFFFF',
                width: { xs: '100%' },
                padding: '20px 80px',
                textTransform: 'inherit',
                backgroundColor: '#111827'
              }}
              onClick={handleClick}
              disabled={!isValidate()}>
              Confirm Payment
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '100%' },
          paddingTop: '40px'
        }}>
        <YourOrder />
      </Box>
    </Box>
    // </ProtectedRoute>
  );
};
export default CheckoutPage;
