import { Box, Button, InputLabel, NativeSelect, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../src/store';
// import { useNavigate } from 'react-router-dom';
import { StepperComp } from '../../src/components/common/StepperComp';
import { YourOrder } from '../../src/components/common/YourOrder';
// import { setUserDetails } from "../../store/reducers/userDetailsSlice";
import { ProtectedRoute } from '../../src/utils/ProtectedRoute';
import { format } from 'date-fns';
import { isFuture } from 'date-fns';
// import { categoryProductListType } from '../src/types/constants/categoryProductList.type';
import Image from 'next/image';
// import { useFormik } from "formik";
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';

interface ShippingPageProps {}
const ShippingPage: NextPage<ShippingPageProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    deliveryDate: '',
    convenientTime: '',
    city: '',
    address: '',
    zipCode: ''
  });

  const productDetails = useSelector(state => state.userSelectedProductListSlice);

  const [errors, setErrors] = useState({});
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    const { name, value } = e.target;
    if (name === 'city') {
      if (parseInt(value) === 0) {
        setErrors({
          ...errors,
          [name]: 'Please select city'
        });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, [name]: value });
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target;
    if (name === 'firstName') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[A-Za-z ]*$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'First Name should contain only alphabet'
        });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, firstName: value });
      }
    }

    if (name === 'lastName') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[A-Za-z ]*$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Last Name should contain only alphabet'
        });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, lastName: value });
      }
    }
    if (name === 'emailAddress') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Invalid Email'
        });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, emailAddress: value });
      }
    }
    if (name === 'phoneNumber') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[987]{1}[0-9]{9}$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Invalid Phone Number'
        });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, phoneNumber: value });
      }
    }
    if (name === 'deliveryDate') {
      if (isFuture(new Date(value))) {
        setErrors({ ...errors, [name]: '' });
        setUserData({ ...userData, deliveryDate: value });
      } else {
        setErrors({ ...errors, [name]: 'Required' });
      }
    }
    if (name === 'convenientTime') setUserData({ ...userData, convenientTime: value });
    // if (name === "city") {
    //     if (parseInt(value) === 0) {
    //         setErrors({
    //             ...errors,
    //             [name]: "Please select city",
    //         });
    //     } else {
    //         setErrors({
    //             ...errors,
    //             [name]: "",
    //         });
    //         setUserData({ ...userData, [name]: value });
    //     }
    // }
    if (name === 'address') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, address: value });
      }
    }
    if (name === 'zipCode') {
      if (value === '') {
        setErrors({ ...errors, [name]: 'Required' });
      } else if (!/^[0-9]{6}$/i.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Invalid Zip Code'
        });
      } else {
        setErrors({
          ...errors,
          [name]: ''
        });
        setUserData({ ...userData, zipCode: value });
      }
    }
  };
  const isValidate = () => {
    if (
      userData.firstName &&
      userData.lastName &&
      userData.emailAddress &&
      userData.phoneNumber &&
      userData.city &&
      userData.address &&
      userData.zipCode &&
      userData.deliveryDate &&
      userData.convenientTime
    )
      return true;
    else return false;
  };
  useEffect(() => {
    if (productDetails.cartProductDetails.length === 0) {
      router.push('/');
    }
  });
  console.log(' : ', userData);
  const handleClick = () => {
    if (!userData.deliveryDate) {
      setErrors({ ...errors, deliveryDate: 'Required' });
    } else if (!userData.convenientTime) {
      setErrors({ ...errors, convenientTime: 'Required' });
    } else {
      if (isValidate()) {
        // dispatch(setUserDetails(userData));
        router.push('/checkout');
      }
    }
  };
  // const validate = (values) => {
  //     const errors = {};
  //     if (!values.firstName) {
  //         errors.firstName = "Required";
  //     }

  //     if (!values.lastName) {
  //         errors.lastName = "Required";
  //     }

  //     if (!values.emailAddress) {
  //         errors.emailAddress = "Required";
  //     } else if (
  //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
  //             values.emailAddress
  //         )
  //     ) {
  //         errors.emailAddress = "Invalid email address";
  //     }

  //     if (!values.phoneNumber) {
  //         errors.phoneNumber = "Required";
  //     } else if (!/^[987]{1}[0-9]{9}$/i.test(values.phoneNumber)) {
  //         errors.phoneNumber = "Invalid phone number";
  //     }

  //     if (!values.city) {
  //         errors.city = "Required";
  //     } else if (values.city === 0) {
  //         errors.city = "Please select city";
  //     }

  //     if (!values.address) {
  //         errors.address = "Required";
  //     }

  //     if (!values.zipCode) {
  //         errors.zipCode = "Required";
  //     } else if (!/^[0-9]{7}$/i.test(values.zipCode)) {
  //         errors.zipCode = "Invalid zip code";
  //     }
  //     console.log("error: ", errors);
  //     return errors;
  // };
  // const formik = useFormik({
  //     initialValues: {
  //         firstName: "",
  //         lastName: "",
  //         emailAddress: "",
  //         phoneNumber: "",
  //         deliveryDate: "",
  //         convenientTime: "",
  //         city: "",
  //         address: "",
  //         zipCode: "",
  //     },
  //     // handleChange,
  //     validate,
  //     onSubmit: (values) => {
  //         console.log("btn clicked : ", values);
  //     },
  // });
  return (
    // <ProtectedRoute>
    <>
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          padding: {
            xs: '0 20px',
            sm: '0 50px',
            md: '0 20px',
            lg: '0 60px',
            xl: '0 150px'
          },
          gap: { xs: '10px', lg: '40px' },
          flexDirection: { xs: 'column', sm: 'column', md: 'row' }
        }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
          <StepperComp activeStep={0} />
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
              Contact Information
            </Typography>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                marginBottom: { md: '50px' },
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start' },
                width: { sm: '100%' },
                gap: { md: '40px' }
              }}>
              <TextField
                id="standard-number"
                label="First Name"
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                name="firstName"
                // error={errors?.firstName ? true : false}
                // helperText={
                //     errors?.firstName ? errors?.firstName : null
                // }
                // value={formik.values.firstName}
                // onChange={formik.handleChange}
                onChange={handleChange}
                variant="standard"
                placeholder="First Name e.g John,Mary"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', md: '95%', lg: '45%' },
                  marginBottom: { xs: '50px', md: '0' },
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
                label="Last Name"
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                // error={errors?.lastName ? true : false}
                // helperText={
                //     errors?.lastName ? errors?.lastName : null
                // }
                // helperText={
                //     formik.errors.lastName ? (
                //         <div>{formik.errors.lastName}</div>
                //     ) : null
                // }
                name="lastName"
                // value={formik.values.lastName}
                // onChange={formik.handleChange}
                onChange={handleChange}
                variant="standard"
                placeholder="Last Name e.g John,Mary"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', md: '95%', lg: '45%' },
                  marginBottom: { xs: '50px', md: '0' },
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
                display: 'flex',
                justifyContent: 'space-between',
                // marginTop: "50px",
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start' },
                width: { sm: '100%' },
                gap: { md: '40px' },
                marginBottom: { md: '50px' }
              }}>
              <TextField
                id="standard-number"
                label="Email Address"
                type="email"
                InputLabelProps={{
                  shrink: true
                }}
                // error={errors?.emailAddress ? true : false}
                // helperText={
                //     errors?.emailAddress
                //         ? errors?.emailAddress
                //         : null
                // }
                // helperText={
                //     formik.errors.emailAddress ? (
                //         <div>{formik.errors.emailAddress}</div>
                //     ) : null
                // }
                name="emailAddress"
                onChange={handleChange}
                // value={formik.values.emailAddress}
                // onChange={formik.handleChange}
                variant="standard"
                placeholder="Your email@gmail.com"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', md: '95%', lg: '45%' },
                  marginBottom: { xs: '50px', md: '0' },
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
                label="Phone Number"
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                name="phoneNumber"
                // error={errors?.phoneNumber ? true : false}
                // helperText={
                //     errors?.phoneNumber
                //         ? errors?.phoneNumber
                //         : null
                // }
                // helperText={
                //     formik.errors.phoneNumber ? (
                //         <div>{formik.errors.phoneNumber}</div>
                //     ) : null
                // }
                onChange={handleChange}
                // value={formik.values.phoneNumber}
                // onChange={formik.handleChange}
                variant="standard"
                placeholder="+1-(0000 000 0000)"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', md: '95%', lg: '45%' },
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

            <Typography
              sx={{
                fontSize: '22px',
                fontWeight: '700',
                marginTop: '50px'
              }}>
              Delivery Information
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start' },
                width: { sm: '100%', md: '95%', lg: '100%' },
                gap: { sm: '50px' },
                marginBottom: { md: '40px' }
              }}>
              <TextField
                id="standard-number"
                label="Delivery Date"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  inputProps: {
                    min: format(new Date(), 'yyyy-MM-dd')
                  }
                }}
                name="deliveryDate"
                onChange={handleChange}
                // onChange={formik.handleChange}
                // error={errors?.deliveryDate ? true : false}
                // helperText={
                //     errors?.deliveryDate
                //         ? errors.deliveryDate
                //         : null
                // }
                variant="standard"
                placeholder="DD/MM/YYYY"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', md: '45%' },
                  marginBottom: { xs: '50px', md: '0' },
                  '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                    fontSize: '22px'
                  },
                  '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                    marginTop: '30px !important'
                  }
                }}
              />
              <TextField
                id="standard-number"
                label="Convenient Time"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
                name="convenientTime"
                // onChange={formik.handleChange}
                onChange={handleChange}
                // error={errors?.convenientTime ? true : false}
                // helperText={
                //     errors?.convenientTime
                //         ? errors.convenientTime
                //         : null
                // }
                variant="standard"
                placeholder="1pm-9pm"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', md: '45%' },
                  marginBottom: { xs: '50px', md: '0' },
                  '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                    fontSize: '22px'
                  },
                  '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                    marginTop: '30px !important'
                  }
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: {
                  xs: 'column',
                  lg: 'row',
                  md: 'column'
                },
                gap: { sm: '40px' },
                width: { xs: '100%', md: '95%', lg: '100%' }
              }}>
              <Box
                sx={{
                  width: { xs: '100%', lg: 'inherit' },
                  marginBottom: { xs: '50px', sm: '0' }
                }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  City
                </InputLabel>
                <NativeSelect
                  required
                  defaultValue={0}
                  inputProps={{
                    id: 'uncontrolled-native'
                  }}
                  name="city"
                  value={userData.city}
                  // error={errors?.city ? true : false}
                  // helperText={
                  //     errors?.city ? errors?.city : null
                  // }
                  // // helperText={
                  //     formik.errors.city ? (
                  //         <div>{formik.errors.city}</div>
                  //     ) : null
                  // }
                  onChange={handleChangeSelect}
                  // value={formik.values.city}
                  // onChange={formik.handleChange}
                  sx={{
                    width: { xs: '100%', lg: 'inherit' },
                    marginTop: '10px',
                    color: 'gray'
                  }}>
                  <option value={0}>---Select City---</option>
                  <option value={'Surat'}>Surat</option>
                  <option value={'Pune'}>Pune</option>
                  <option value={'Mumbai'}>Mumbai</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', lg: 'inherit' }
                }}>
                <TextField
                  id="standard-number"
                  label="Address"
                  type="text"
                  InputLabelProps={{
                    shrink: true
                  }}
                  name="address"
                  // helperText={
                  //     formik.errors.address ? (
                  //         <div>{formik.errors.address}</div>
                  //     ) : null
                  // }
                  // error={errors?.address ? true : false}
                  // helperText={
                  //     errors?.address ? errors?.address : null
                  // }
                  onChange={handleChange}
                  // value={formik.values.address}
                  // onChange={formik.handleChange}
                  variant="standard"
                  placeholder="Click to find Address"
                  sx={{
                    fontSize: '22px',
                    width: { xs: '100%', lg: 'inherit' }, // md: "150px"
                    marginBottom: { xs: '50px', sm: '0' },
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
                <Box
                  sx={{
                    position: 'absolute',
                    top: {
                      xs: '32%',
                      sm: '55%'
                    },
                    right: { xs: '0' }
                  }}>
                  <Image
                    src={'/images/searchgrayicon.png'}
                    alt="imageGirl"
                    height={0}
                    width={0}
                    sizes="(max-width:0) 100vw,
                        (max-height:0) 100vh"
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%'
                    }}
                  />
                </Box>
              </Box>
              <TextField
                id="standard-number"
                label="Zip Code"
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                // error={errors?.zipCode ? true : false}
                // helperText={
                //     errors?.zipCode ? errors?.zipCode : null
                // }
                // helperText={
                //     formik.errors.zipCode ? (
                //         <div>{formik.errors.firstName}</div>
                //     ) : null
                // }
                name="zipCode"
                onChange={handleChange}
                // value={formik.values.zipCode}
                // onChange={formik.handleChange}
                variant="standard"
                placeholder="00000"
                sx={{
                  fontSize: '22px',
                  width: { xs: '100%', lg: 'inherit' }, // sm: "340px", md: "150px"
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
                marginTop: { xs: '50px', md: '90px' },
                marginBottom: { xs: '100px', md: '150px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Button
                variant="contained"
                sx={{
                  fontFamily: 'Nunito',
                  fontSyle: 'normal',
                  fontWeight: '900',
                  fontSize: '22px',
                  lineHeight: '27px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  backgroundColor: '#111827',
                  width: { xs: '100%', md: 'objectFit' },
                  padding: { xs: '20px', md: '15px 100px' },
                  textTransform: 'inherit'
                }}
                onClick={handleClick}
                disabled={!isValidate()}
                // type="submit"
              >
                Proceed to Payment
              </Button>
            </Box>
            {/* </form> */}
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
    </>
    // </ProtectedRoute>
  );
};
export default ShippingPage;
