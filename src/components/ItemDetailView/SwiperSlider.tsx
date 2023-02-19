import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, Pagination, Mousewheel, Keyboard } from 'swiper';
import { productsType } from '../../types/constants/products.type';

interface SwiperSlideProps {
  productDetail: productsType;
}
const SwiperSlider: React.FC<SwiperSlideProps> = ({ productDetail }) => {
  const [selectedImage, setSelectedImage] = useState<number>();
  const swiperRef = useRef(null);
  const changeProductImage = (item: number) => {
    setSelectedImage(item);
  };
  useEffect(() => {
    if (swiperRef !== null && selectedImage !== undefined)
      swiperRef?.current.swiper.slideTo(selectedImage - 1);
  }, [selectedImage]);
  return (
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
  );
};
export default SwiperSlider;
