import React, { useState } from 'react';
import { Button, Typography, Box, Link } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Keyboard, Scrollbar, Pagination, Navigation } from 'swiper';
// import { shopByCategoryList } from "../../data/shopByCategoryList";
import { productLists } from '../../data/productLists';
import { genderLists } from '../../data/genderLists';
import { categoryLists } from '../../data/categoryLists';
import theme from '../../theme';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';
import Image from 'next/image';

export const ShopByCategory = () => {
  // const navigator = useNavigate();
  const router = useRouter();
  //   const handleClick = () => {
  //     router.push('/men/products/shoes');
  //   };
  //   const genderCategoryList = [
  //     { id: 1, name: 'Women' },
  //     { id: 2, name: 'Men' }
  //   ];
  //   const shopByCategory = [
  //     {
  //       id: 1,
  //       name: 'Shirt',
  //       value: 'Both'
  //     },
  //     {
  //       id: 2,
  //       name: 'TShirt',
  //       value: 'Both'
  //     },
  //     {
  //       id: 3,
  //       name: 'Shoes',
  //       value: 'Both'
  //     },
  //     {
  //       id: 4,
  //       name: 'Watch',
  //       value: 'Men'
  //     },
  //     {
  //       id: 5,
  //       name: 'Earning',
  //       value: 'Women'
  //     },
  //     {
  //       id: 6,
  //       name: 'Tie',
  //       value: 'Men'
  //     },
  //     {
  //       id: 7,
  //       name: 'Purse',
  //       value: 'Both'
  //     }
  //   ];
  const [selectedGender, setSelectedGender] = useState<number>(genderLists[0].id);
  const [selectedCategory, setSelectedCategory] = useState<number>(categoryLists[0].id);
  console.log('selctedGende : ', selectedGender, selectedCategory);

  return (
    <Box>
      <Typography
        sx={{
          marginBottom: '50px',
          fontFamily: theme.typography.h1.fontFamily,
          fontWeight: '700',
          fontSize: {
            xl: '42px',
            md: '39px',
            sm: '28px',
            xs: '22px'
          },
          color: theme.palette.primary.main,
          marginTop: { xs: '40px', sm: '20px' },
          textAlign: 'center'
        }}>
        Shop By Category
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '40px'
        }}>
        {genderLists.map((gender, index) => {
          console.log('category selected & gender loop id : ', selectedGender, gender);
          if (index < 2) {
            return (
              <Link
                key={index}
                sx={{
                  textDecoration: 'none',
                  fontFamily: theme.typography.h1.fontFamily,
                  fontWeight: '400',
                  fontSize: '25px',
                  color: selectedGender === gender.id ? theme.palette.primary.main : '#757575',
                  borderBottom: selectedGender === gender.id ? '1px solid #757575' : 'none' //foractive
                }}
                onClick={() => setSelectedGender(gender.id)}>
                For {gender.name}
              </Link>
            );
          }
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '40px',
          justifyContent: { xs: 'space-between', sm: 'center' },
          paddingBottom: { xs: '7px', sm: '0' },
          overflow: { xs: 'scroll', md: 'hidden' }
        }}>
        {categoryLists.map(categoryObj => {
          return (
            <Link
              key={categoryObj.id}
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '20px',
                textDecoration: 'none',
                color: '#000000',
                padding:
                  categoryObj.id === selectedCategory
                    ? {
                        xs: '7px 10px',
                        sm: '14px 24px'
                      }
                    : 0,
                background:
                  selectedCategory === categoryObj.id ? '#E0E0E0' : theme.palette.background.default
              }}
              onClick={() => setSelectedCategory(categoryObj.id)}>
              {categoryObj.name}
            </Link>
          );
        })}
      </Box>

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
          {productLists.length > 0 ? (
            productLists.map(product => {
              if (product.category === selectedCategory && product.gender === selectedGender) {
                return (
                  <Box key={product.id}>
                    <SwiperSlide
                      style={{
                        fontSize: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      //   onClick={handleClick}
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
                              lg: '170px',
                              xl: '300px'
                            },
                            height: {
                              xs: '150px',
                              lg: '170px',
                              xl: '300px'
                            },
                            gap: '30px',
                            display: 'flex',
                            flexDirection: 'column'
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
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: theme.typography.h2.fontFamily,
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
                                fontFamily: theme.typography.h2.fontFamily,
                                fontWeight: '400',
                                fontSize: '20px',
                                textDecorationLine: 'line-through',
                                color: theme.palette.secondary.light
                              }}>
                              ${product.productOriginalPrice}
                            </span>
                            &nbsp;&nbsp;
                            <span
                              className="currentprice"
                              style={{
                                fontFamily: theme.typography.h2.fontFamily,
                                fontWeight: '400',
                                fontSize: '20px',
                                color: theme.palette.secondary.dark
                              }}>
                              ${product.productCurrentPrice}
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  </Box>
                );
              }
            })
          ) : (
            <Box sx={{ backgroundColor: 'red', height: '20px', width: '20px' }}>
              No Product Match
            </Box>
          )}
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
            padding: { xs: '5px 20px', sm: '10px 40px' },
            background: '#212121',
            fontFamily: theme.typography.h1.fontFamily,
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
