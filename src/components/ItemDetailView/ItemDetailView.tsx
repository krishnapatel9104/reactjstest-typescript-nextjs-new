import { Box, Button, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, Pagination, Mousewheel, Keyboard } from 'swiper';
import { setUserSelectedProductList } from '../../store/reducers/userSelectedProductList/userSelectedProductList.slice';
// import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
// import { categoryProductListType } from '../../types/constants/categoryProductList.type';
import { withRouter } from 'next/router';
import { productsType } from '../../types/constants/products.type';
import { sizeLists } from '../../data/sizeLists';
import { colorLists } from '../../data/colorLists';
// import { setUserSelectedProductList } from '../../store/reducers/userSelectedProductListSlice';
// import { useDispatch } from '../../store';
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector, useDispatch } from '../../store/index';

interface itemDetailViewProps {
  product: productsType;
}
const ItemDetailView: FC<itemDetailViewProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // if (router.query.productDetail) {
  //     const params = JSON.parse(
  //         decodeURIComponent(props.router.query.productDetail)
  //     );
  // }
  //   const object = JSON.parse(query.productData);

  console.log(
    'props itemview : ',
    product
    // params
    // props.router.query.productDetail
  );
  const userCartProductDetails = useSelector(state => state.userSelectedProductListSlice);
  console.log('FFFFFFFFFFFFFFFFFFFFFFF : ', userCartProductDetails);

  useEffect(() => {
    console.log(
      'change cart product list useffect in itemview page : ',
      userCartProductDetails.cartProductDetails
    );

    // if (userCartProductDetails?.cartProductDetails?.length === 0) {
    //   console.log(
    //     'data are there in redux ::::: ',
    //     userCartProductDetails?.cartProductDetails?.length
    //   );

    localStorage.setItem(
      'userSelectedProductList',
      JSON.stringify(userCartProductDetails.cartProductDetails)
    );

    // }
  }, [userCartProductDetails.cartProductDetails]);

  const [productDetail, setProductDetail] = useState<productsType>(product);
  const [selectedImage, setSelectedImage] = useState<number>();
  const [selectedSize, setSelectedSize] = useState<number>(productDetail?.size[0]);
  const [selectedColor, setSelectedColor] = useState<number>(productDetail?.color[0]);
  const [value, setValue] = useState<string>('1');

  // useEffect(() => {
  //   setProductDetail(product);
  // }, [product]);

  // useEffect(() => {
  //   setSelectedSize(productDetail?.size[0]);
  //   setSelectedColor(productDetail?.color[0]);
  // }, [productDetail]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const swiperRef = useRef(null);

  const changeHandler = (type: string, value: number) => {
    if (type === 'color') setSelectedColor(value);
    else if (type === 'size') setSelectedSize(value);
    // setProductDetail({ ...productDetail, size: size });
  };
  console.log('Selected size : ', selectedSize);
  const handleShopNow = () => {
    let addProductToCartObject = {
      productId: productDetail?.id,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    };
    // setDataInLocalStorage(addProductToCartObject);
    // dispatch(setUserSelectedProductList(productDetail));
    dispatch(setUserSelectedProductList(addProductToCartObject));
    router.push('/shipping');
  };
  // const setDataInLocalStorage = cartProduct => {
  //   let newListItems = [];
  //   let list = JSON.parse(localStorage.getItem('userSelectedProductList'));
  //   if (list) {
  //     let alreadyExist = list.findIndex(product => {
  //       return product.productId === productDetail.productId;
  //     });
  //     if (alreadyExist === -1) {
  //       newListItems = [...list, productDetail];
  //       localStorage.setItem('userSelectedProductList', JSON.stringify(newListItems));
  //     } else {
  //       let newArrayObj = [...list];
  //       newArrayObj[alreadyExist] = {
  //         ...newArrayObj[alreadyExist],
  //         quantity: newArrayObj[alreadyExist].quantity + 1
  //       };
  //       newListItems = [...newArrayObj];
  //       localStorage.setItem('userSelectedProductList', JSON.stringify(newListItems));
  //     }
  //   } else {
  //     newListItems.push(productDetail);
  //     localStorage.setItem('userSelectedProductList', JSON.stringify(newListItems));
  //   }
  //   console.log('final new product list : ', newListItems);
  // };
  const handleAddToCart = () => {
    let addProductToCartObject = {
      productId: productDetail?.id,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    };
    // setDataInLocalStorage(addProductToCartObject);
    dispatch(setUserSelectedProductList(addProductToCartObject));
  };
  const changeProductImage = (item: number) => {
    console.log('product image clicked : ', item);
    setSelectedImage(item);
  };
  useEffect(() => {
    console.log('in useeffect when clicked img : ', swiperRef);
    if (swiperRef !== null && selectedImage !== undefined)
      swiperRef.current?.swiper?.slideTo(selectedImage - 1);
  }, [selectedImage]);

  return (
    <>
      <Box
        sx={{
          marginTop: { xs: '0', md: '150px' }
        }}>
        <Navbar />
        <Box
          sx={{
            padding: {
              lg: '0 145px',
              md: '0 5px',
              xs: '0 25px'
            },
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',

            display: 'flex',
            gap: '60px'
          }}>
          {/* left box */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              textAlign: 'center',
              '& .swiper-button-next, .swiper-button-prev': {
                color: '#D1D1D6'
              }
            }}>
            <Box
              className="mainSlider"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: {
                  xs: '30px',
                  sm: '180px',
                  md: '60px',
                  lg: '60px',
                  xl: '100px'
                }
              }}>
              <Box className="swiper-button image-swiper-button-prev">
                <Image src={'/images/vectorLeft.png'} alt="left" height={20} width={15} />
                {/* <KeyboardArrowLeftIcon style={{ color: "#333333", fontSize: "20px" }} /> */}
              </Box>
              <Swiper
                // onSwiper={swiper => console.log('1st :', swiper)}
                // onSlideChange={() => console.log('slide change 1st')}
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                cssMode={true}
                navigation={{
                  nextEl: '.image-swiper-button-next',
                  prevEl: '.image-swiper-button-prev',
                  disabledClass: 'swiper-button-disabled'
                }}
                pagination={false}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                ref={swiperRef}>
                {productDetail.productImages.map((item, index) => {
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        height: {
                          xs: '450px',
                          md: '550px'
                        },
                        width: {
                          xs: '250px',
                          md: '500px'
                        }
                      }}>
                      <SwiperSlide>
                        <Image
                          src={item.productImage}
                          alt="imageGirl"
                          height={0}
                          width={0}
                          sizes="(max-width:0) 100vw,
                                (max-height:0) 100vh"
                          style={{
                            objectFit: 'contain',
                            height: '80%',
                            width: '80%'
                          }}
                        />
                      </SwiperSlide>
                    </Box>
                  );
                })}
              </Swiper>
              <Box className="swiper-button image-swiper-button-next">
                <Image src={'/images/vectorRight.png'} alt="left" height={20} width={15} />
                {/* <ChevronRightIcon style={{ color: "#333333" }} /> */}
              </Box>
            </Box>
            <Box
              className="secondSlider"
              sx={{
                marginTop: '50px',
                '& .swiper-button-next, .swiper-button-prev': {
                  color: '#D1D1D6'
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '50px'
              }}>
              <Box className="swiper-button image-swiper-button-prev">
                <Image src={'/images/vectorLeft.png'} alt="left" height={20} width={15} />
                {/* <KeyboardArrowLeftIcon style={{ color: "#333333" }} /> */}
              </Box>
              <Swiper
                onSwiper={swiper => console.log('2nd : ', swiper)}
                onSlideChange={() => console.log('slide change 2nd')}
                slidesPerView={5}
                spaceBetween={30}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{
                  enabled: true
                }}
                breakpoints={{
                  1500: {
                    slidesPerView: 5,
                    slidesPerGroup: 1
                  },
                  1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 1
                  },
                  900: {
                    slidesPerView: 4,
                    slidesPerGroup: 1
                  },
                  600: {
                    slidesPerView: 5,
                    slidesPerGroup: 1
                  },
                  500: {
                    slidesPerView: 4,
                    slidesPerGroup: 1
                  },
                  400: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                  },
                  380: {
                    slidesPerView: 2,
                    slidesPerGroup: 1
                  },
                  300: {
                    slidesPerView: 2,
                    slidesPerGroup: 1
                  },
                  0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                  }
                }}
                scrollbar={false}
                navigation={{
                  nextEl: '.image-swiper-button-next',
                  prevEl: '.image-swiper-button-prev',
                  disabledClass: 'swiper-button-disabled'
                }}
                pagination={false}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}>
                {productDetail.productImages.map((item, index) => {
                  return (
                    <Box key={item.id}>
                      <SwiperSlide
                        style={{
                          marginTop: '50px',
                          textAlign: 'center',
                          fontSize: '18px',
                          background: '#fff',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <Image
                          src={item.productImage}
                          alt="likeicon"
                          style={{
                            display: 'block'
                          }}
                          height={130}
                          width={100}
                          onClick={e => changeProductImage(item.id)}
                        />
                      </SwiperSlide>
                    </Box>
                  );
                })}
              </Swiper>
              <Box className="swiper-button image-swiper-button-next">
                <Image src={'/images/vectorRight.png'} alt="left" height={20} width={15} />
                {/* <ChevronRightIcon style={{ color: "#333333" }} /> */}
              </Box>
            </Box>
          </Box>
          {/* right side */}
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#1B2437',
                    backgroundColor: '#E5E5EA'
                  }}>
                  Popular
                </Button>
              </Box>
              <Box>
                <Image
                  src={'/images/Like.png'}
                  alt="likeicon"
                  height={40}
                  width={35}
                  style={{
                    padding: '6px',
                    paddingTop: '10px',
                    border: '1px solid #E5E5EA',
                    borderRadius: '26px',
                    backgroundColor: '#E5E5EA'
                  }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: {
                  lg: '44px',
                  sm: '35px',
                  xs: '26px'
                },
                fontFamily: 'Inter',
                fontWeight: '400',
                color: '#1B2437'
              }}>
              {productDetail.productName}
            </Typography>
            <Box
              sx={{
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                display: 'flex',
                gap: '20px'
              }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px'
                }}>
                {Array.from(Array(productDetail.reviewRate), (e, index) => {
                  return (
                    <Image
                      src={'/images/star.png'}
                      alt="likeicon"
                      key={index}
                      width={30}
                      height={30}
                    />
                  );
                })}
                {Array.from(Array(5 - productDetail.reviewRate), (e, index) => {
                  return (
                    <Image
                      src={'/images/graystar.png'}
                      alt="likeicon"
                      key={index}
                      width={30}
                      height={30}
                    />
                  );
                })}
              </Box>
              <Box>{productDetail.reviewRate} reviews</Box>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider'
                  }}>
                  <TabList onChange={() => handleChange(value)} aria-label="lab API tabs example">
                    <Tab label="Info" value="1" />
                    <Tab label="Brand" value="2" />
                    <Tab label="Delivery" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      fontSize: '16px',
                      color: '#8E8E93'
                    }}>
                    Dress with tulle and collar Peter Pan from REDValentino (Red Valentino). Peter
                    Pan collar, tulle panels, sleeveless model, concealed back zipper and pleated
                    skirt. Black colour.
                  </Typography>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
            <Box
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'column',
                  sm: 'row',
                  lg: 'row'
                },
                display: 'flex',
                justifyContent: 'space-between',
                gap: '50px'
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Box
                  sx={{
                    gap: { xs: '110px' },
                    display: 'flex'
                  }}>
                  <Typography>Size</Typography>
                  <Typography
                    sx={{
                      color: '#111827',
                      fontWeight: 700
                    }}>
                    Size Guide
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gap: { xs: '20px' },
                    marginTop: { xs: '25px', lg: '50px' },
                    display: 'flex'
                  }}>
                  {product.size.map((size, index) => {
                    let sizeDetail = sizeLists.find(s => s.id === size);
                    return (
                      <Button
                        key={index}
                        sx={{
                          color: selectedSize === size ? 'white' : 'black',
                          width: 'fit-content',
                          border: '1px solid #000000',
                          padding: '10px 20px',
                          backgroundColor: selectedSize === size ? '#1B2437 !important' : 'white'
                        }}
                        onClick={e => changeHandler('size', sizeDetail.id)}>
                        {sizeDetail.value}
                      </Button>
                    );
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  gap: { lg: '45px', xs: '20px' },
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Typography>Color</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    alignItems: 'center'
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '20px',
                      marginTop: '10px'
                    }}>
                    {product.color.map((color, index) => {
                      let colorDetail = colorLists.find(c => c.id === color);
                      return (
                        <Button
                          key={index}
                          sx={{
                            border: selectedColor === color ? '1px solid red' : '1px solid white',
                            borderWidth: selectedColor === color ? '3px' : '0',
                            width: 'fit-content',
                            outlineColor:
                              selectedColor === color ? '1px solid red' : '1px solid black',
                            padding: '20px',
                            backgroundColor: colorDetail.haxValue,
                            '&:hover': { backgroundColor: colorDetail.haxValue }
                          }}
                          onClick={e => changeHandler('color', colorDetail.id)}>
                          {colorDetail.value}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '34px',
                color: '#1B2437',
                marginTop: '20px'
              }}>
              $ {productDetail.productCurrentPrice}
            </Typography>
            <Box
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '25px', sm: '50px' },
                display: 'flex',
                marginTop: '25px'
              }}>
              <Button
                variant="contained"
                onClick={handleShopNow}
                sx={{
                  background: '#1B2437',
                  fontWeight: '700',
                  fontSize: '20px',
                  padding: '15px 20px',
                  textTransform: 'inherit'
                }}>
                Shop Now
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: '#F5F5F5',
                  color: 'black',
                  fontWeight: '700',
                  fontSize: '20px',
                  padding: '15px 20px',
                  textTransform: 'inherit'
                }}
                onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ItemDetailView;
