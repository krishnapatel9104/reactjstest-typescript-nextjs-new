import { Button, Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { Keyboard, Scrollbar, Pagination, Navigation } from 'swiper';
import { bestSellerProductLists } from '../../data/bestSellerProductLists';
import { productLists } from '../../data/productLists';
import { productsType } from '../../types/constants/products.type';

import theme from '../../theme';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const BestSeller = () => {
  // const navigator = useNavigate();
  const router = useRouter();
//   const handleClick = () => {
//     console.log('btn clicked');
//     router.push('/women/products/accessories');
//   };

  const [bestSellerProducts, setBestSellerProducts] = useState<productsType[]>();

  useEffect(() => {
    let result = productLists.filter(productItem =>
      bestSellerProductLists.productId.some(productId => productItem.id === productId)
    );
    console.log('best seller data object : ', result);
    setBestSellerProducts(result);
  }, [productLists]);
  return (
    <Box
      sx={{
        marginTop: { xs: '30px', md: '100px' }
      }}>
      <Typography
        sx={{
          fontFamily: theme.typography.titleHeading.fontFamily,
          fontWeight: '700',
          fontSize: {
            xl: '42px',
            md: '39px',
            sm: '28px',
            xs: '22px'
          },
          color: theme.palette.primary.main,
          textAlign: 'center',
          marginBottom: { xs: '30px', md: '100px' }
        }}>
        Best Seller
      </Typography>
      <Box
        sx={{
          margin: {
            xl: '0 130px',
            lg: '0 100px',
            md: '0 100px',
            sm: '100px',
            xs: '0 40px'
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { sm: '50px', md: '60px', lg: '100px' },
          '& .swiper-button-next, .swiper-button-prev': {
            color: '#D1D1D6'
          }
        }}>
        <Box
          className="swiper-button image-swiper-button-prev"
          sx={{
            height: {
              xs: '15px',
              sm: '20px',
              md: '20px',
              lg: '30px'
            },
            width: {
              xs: '50px',
              sm: '30px',
              md: '25px',
              lg: '25px'
            }
          }}>
          <Image
            src={'/images/vectorLeft.png'}
            alt="imageGirl"
            height={0}
            width={0}
            sizes="(max-width:0) 100vw,
                                (max-height:0) 100vh"
            style={{
              objectFit: 'contain',
              height: '100%',
              width: '100%'
            }}
          />
        </Box>
        <Swiper
          slidesPerView={4}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          keyboard={{
            enabled: true
          }}
          navigation={{
            nextEl: '.image-swiper-button-next',
            prevEl: '.image-swiper-button-prev',
            disabledClass: 'swiper-button-disabled'
          }}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 1
            },
            960: {
              slidesPerView: 3,
              slidesPerGroup: 1
            },
            600: {
              slidesPerView: 2,
              slidesPerGroup: 1
            },
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1
            }
          }}
          modules={[Keyboard, Scrollbar, Navigation, Pagination]}
          className="mySwiper">
          {bestSellerProducts?.length > 0 &&
            bestSellerProducts.map(product => {
              return (
                <Box key={product.id}>
                  <SwiperSlide
                    style={{
                      fontSize: '18px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    // onClick={handleClick}
                    >
                    <Box
                      sx={{
                        marginLeft: '10px',
                        gap: '50px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                      <Box
                        sx={{
                          width: {
                            xs: '150px',
                            lg: '200px',
                            xl: '300px'
                          },
                          height: {
                            xs: '150px',
                            lg: '200px',
                            xl: '300px'
                          },
                          gap: '30px',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                        <Box
                          sx={{
                            position: 'relative',
                            height: '100%',
                            width: '100%'
                          }}>
                          <Image
                            src={product.productImages[0].productImage}
                            alt="imageGirl"
                            height={0}
                            width={0}
                            sizes="(max-width:0) 100vw,
                                                            (max-height:0) 100vh"
                            style={{
                              objectFit: 'contain',
                              height: '100%',
                              width: '100%'
                            }}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: theme.typography.titleHeading.fontFamily,
                            fontWeight: '700',
                            fontSize: {
                              lg: '22px',
                              md: '20px',
                              xs: '18px'
                            },
                            color: theme.palette.primary.main
                          }}>
                          {product.productName}
                        </Typography>
                        <Typography>
                          <span
                            style={{
                              fontFamily: theme.typography.titleHeading.fontFamily,
                              fontWeight: '400',
                              fontSize: '20px',
                              textDecorationLine: 'line-through',
                              color: theme.palette.originalPrice.color
                            }}>
                            ${product.productOriginalPrice}
                          </span>
                          &nbsp;&nbsp;
                          <span
                            className="currentprice"
                            style={{
                              fontFamily: theme.typography.titleHeading.fontFamily,
                              fontWeight: '400',
                              fontSize: '20px',
                              color: theme.palette.currentPrice.color
                            }}>
                            ${product.productCurrentPrice}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                </Box>
              );
            })}
        </Swiper>
        <Box
          className="swiper-button image-swiper-button-next"
          sx={{
            height: {
              xs: '15px',
              sm: '20px',
              md: '20px',
              lg: '30px'
            },
            width: {
              xs: '50px',
              sm: '30px',
              md: '25px',
              lg: '25px'
            }
          }}>
          <Image
            src={'/images/vectorRight.png'}
            alt="imageGirl"
            height={0}
            width={0}
            sizes="(max-width:0) 100vw,
                                (max-height:0) 100vh"
            style={{
              objectFit: 'contain',
              height: '100%',
              width: '100%'
            }}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={{
            marginTop: { xs: '50px', sm: '0', md: '100px' },
            marginBottom: { xs: '0', md: '70px' },
            padding: { xs: '5px 20px', sm: '10px 40px' },
            background: '#212121',
            fontFamily: theme.typography.titleHeading.fontFamily,
            fontWeight: '700',
            fontSize: { xs: '10px', sm: '20px' },
            color: '#FFFFFF'
          }}
        //   onClick={handleClick}
          >
          View All
        </Button>
      </Box>
    </Box>
  );
};
