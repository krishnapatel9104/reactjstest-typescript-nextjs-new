import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Slider,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { categoryProductList } from '../../data/categoryProductList';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import {
  filterListType,
  allFilterListType,
  sizeFilterListType
} from '../../types/constants/filterList.type';
// import { categoryProductListType } from '../../types/constants/categoryProductList.type';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { productsType } from '../../types/constants/products.type';
import { categoryLists } from '../../data/categoryLists';
import { previousDay } from 'date-fns';
import { productLists } from '../../data/productLists';
import { brandLists } from '../../data/brandLists';
import { sizeLists } from '../../data/sizeLists';
import { genderLists } from '../../data/genderLists';

interface categoryDetailsProps {
  products: productsType[];
}
const CategroyDetails: FC<categoryDetailsProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const themes = useTheme();
  const matches = useMediaQuery(themes.breakpoints.up('md'));
  if (matches && isOpen) setIsOpen(false);

  const [brandFilter, setBrandFilter] = useState<number[]>([]);
  const [sizeFilter, setSizeFilter] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<number[]>([]);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([400, 500]);

  const [selectedGender, setSelectedGender] = useState<number>();
  const [selectedType, setSelectedType] = useState<string>();

  const router = useRouter();
  const [filterCategoryData, setFilterCategoryData] = useState<productsType[]>([]);
  const [filterDataByRoute, setFilterDataByRoute] = useState<productsType[]>([]);
  const [page, setPage] = useState<number>(1);
  const PER_PAGE = 9;
  const count = Math.ceil(filterCategoryData.length / PER_PAGE);
  const indexOfLastRecord = page * PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - PER_PAGE;

  console.log('start log : ', products);

  useEffect(() => {
    console.log('useeffect :::::::::::!!!!!!!!!!!!!!!!!!!!!!! : ', router.asPath, products.length);

    if (products.length > 0) {
      let minPrice = Math.min(...products.map(product => product.productCurrentPrice));
      let maxPrice = Math.max(...products.map(product => product.productCurrentPrice));
      setPriceFilter([minPrice, maxPrice]);
      let curRoute = router.asPath;
      let genderValue = curRoute.split('/')[1];
      let object = genderLists.find(gender => gender.slug === genderValue);
      if (object) setSelectedGender(object.id);
      let brandOrCategoryType = curRoute.split('/')[3];
      if (brandOrCategoryType) setSelectedType(brandOrCategoryType);
      let brandOrCategoryValue = curRoute.split('/')[4];
      if (brandOrCategoryType === 'category' && brandOrCategoryValue && categoryLists) {
        let object = categoryLists.find(category => category.slug === brandOrCategoryValue);
        if (object) setCategoryFilter([...categoryFilter, object.id]);
      }
      console.log('brandOrCategoryType : ', brandOrCategoryType);

      if (brandOrCategoryType === 'brand' && brandOrCategoryValue && brandLists) {
        console.log('if brand then : ', brandOrCategoryValue);

        let object = brandLists.find(brand => brand.slug === brandOrCategoryValue);
        console.log('found brand object : ', object);

        if (object) setBrandFilter([...brandFilter, object.id]);
      }
    }
  }, [products, router.asPath]);

  //   useEffect(() => {
  //     let mainCatName = router.asPath.split('/')[1];
  //     let identifier = router.asPath.split('/')[2];
  //     let categoryName = router.asPath.split('/')[3];
  //     const newProductList = categoryProductList.filter(product => {
  //       if (
  //         product.filter === mainCatName &&
  //         product.category === categoryName &&
  //         identifier === 'products'
  //       ) {
  //         return product;
  //       } else if (
  //         product.filter === mainCatName &&
  //         product?.designers === categoryName &&
  //         identifier === 'designers' &&
  //         product.productPrice >= allFiltersArray.priceFilters[0] &&
  //         product.productPrice <= allFiltersArray.priceFilters[1]
  //       ) {
  //         return product;
  //       } else return 0;
  //     });
  //     if (newProductList.length > 0) setFilterDataByRoute(newProductList);
  //     else setFilterCategoryData([]);
  //   }, [router.asPath]);
  // const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   console.log('checkbox change : ', name, value);

  //   if (name === 'brand') {
  //     setBrandFilter([...brandFilter, parseInt(value)]);
  //   }
  //   if (name === 'category') {
  //     setCategoryFilter([...categoryFilter, parseInt(value)]);
  //   }
  //   if (name === 'size') {
  //     setSizeFilter([...sizeFilter, parseInt(value)]);
  //   }
  //   if (name === 'price') {
  //     setPriceFilter(value);
  //   }
  // };

  useEffect(() => {
    console.log('filters : ', selectedGender, priceFilter, brandFilter, categoryFilter, sizeFilter);
    if (brandFilter || sizeFilter || categoryFilter || priceFilter) {
      const newProductList = productLists.filter(product => {
        if (
          (brandFilter.includes(product.brand) ||
          categoryFilter.includes(product.category)) &&
          product.gender === selectedGender &&
          product.productCurrentPrice >= priceFilter[0] &&
          product.productCurrentPrice <= priceFilter[1]
        ) {
          return product;
        }
      });
      console.log('newProductList AAAAAAAAAAAAAAAAAAAAAAAAAA : ', newProductList);

      // if (sizeFilter) {
      //   const list = productLists.filter(product =>
      //     product.size.some(size => sizeFilter.includes(size))
      //   );
      //   console.log('list AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa : ', list);
      // }
      // let allFilterProducts = newProductList.filter(newProduct => list.filter(l => l.id === newProduct.id));
      // let allFilterProducts = newProductList.filter(productItem =>
      //   list.some(product => productItem.id === product.id)
      // );

      // let allFilterProducts = [...newProductList, ...list];
      setFilterCategoryData(newProductList);
    }
  }, [brandFilter, sizeFilter, categoryFilter, priceFilter, selectedGender]);
  console.log('final productList : ', filterCategoryData);

  // useEffect(() => {
  //   let arrayObj = filterDataByRoute.filter(product => {
  //     if (
  //       product.productCurrentPrice >= priceFilter[0] &&
  //       product.productCurrentPrice <= priceFilter[1]
  //     )
  //       return product;
  //   });
  //   setFilterCategoryData(arrayObj);
  // }, [filterDataByRoute]);

  const handleProductClick = (productDetail: categoryProductListType) => {
    setIsOpen(!isOpen);
    router.replace(
      {
        pathname: `/product/${productDetail.slug}`,
        query: { productId: productDetail.id }
      }
      // `/product/${productDetail.slug}`
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = parseInt(e.target.value);
    if (name === 'brand') {
      if (brandFilter[0] !== value && !brandFilter.includes(value)) {
        setBrandFilter([...brandFilter, value]);
      } else {
        console.log('brand filter logic else part :::::::::::::::::::::::::::::::::::: ');
        if (selectedType === 'brand' && brandFilter[0] !== value) {
          let newBrandFilter = brandFilter.filter(brand => brand !== value);
          setBrandFilter(newBrandFilter);
        } else if (selectedType !== 'brand' && brandFilter[0] === value) {
          let newBrandFilter = brandFilter.filter(brand => brand !== value);
          setBrandFilter(newBrandFilter);
        }
      }
    }
    if (name === 'category') {
      if (categoryFilter[0] !== value && !categoryFilter.includes(value)) {
        setCategoryFilter([...categoryFilter, value]);
      } else {
        console.log('category filter logic else part :::::::::::::::::::::::::::::::::::: ');
        if (selectedType === 'category' && categoryFilter[0] !== value) {
          let newCategoryFilter = categoryFilter.filter(category => category !== value);
          setCategoryFilter(newCategoryFilter);
        } else if (selectedType !== 'category' && categoryFilter[0] === value) {
          let newCategoryFilter = categoryFilter.filter(category => category !== value);
          setCategoryFilter(newCategoryFilter);
        }
      }
    }
    if (name === 'size') {
      if (!sizeFilter.includes(value)) {
        setSizeFilter([...sizeFilter, value]);
      } else {
        let newSizeFilter = sizeFilter.filter(size => size !== value);
        setSizeFilter(newSizeFilter);
      }
    }
  };
  const [isBrandExtend, setIsBrandExtend] = useState<boolean>(false);
  const [isCategorydExtend, setIsCategoryExtend] = useState<boolean>(false);

  const handlerExtendFilters = (type: string) => {
    if (type === 'brand') setIsBrandExtend(!isBrandExtend);
    else if (type === 'category') setIsCategoryExtend(!isCategorydExtend);
  };

  useEffect(() => {
    console.log('when change filter catgeory data set : ', filterCategoryData);
    setPage(1);
  }, [filterCategoryData]);
  const handleChangePagination = () => {
    if (page !== count) setPage(page + 1);
    if (page !== 1) setPage(page - 1);
  };
  return (
    // <ProtectedRoute>
    <>
      <Box
        sx={{
          marginTop: { xs: '0', md: '150px' }
        }}>
        <Navbar />
        <Box
          sx={{
            padding: {
              xl: '0 290px',
              md: '0 140px',
              sm: '0 40px',
              xs: '0 30px'
            },
            display: 'flex',
            gap: '60px'
          }}>
          {isOpen ? (
            <Box
              sx={{
                width: { xs: '40%', sm: '30%' },
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                position: 'absolute',
                top: '9%',
                left: 0,
                zIndex: 1,
                backgroundColor: 'white',
                padding: '0 30px'
              }}>
              <Box
                sx={{
                  marginTop: '50px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                <Typography
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '600',
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    marginBottom: '10px'
                  }}>
                  Filter
                </Typography>
                <Image
                  src={'/images/closeicon.png'}
                  alt="closeicon"
                  height={20}
                  width={20}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '600',
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    marginBottom: '10px'
                  }}>
                  PRICES
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                  <Typography
                    id="range-slider"
                    gutterBottom
                    sx={{
                      fontFamily: 'Jost',
                      fontWeight: '400',
                      fontSize: '20px',
                      letterSpacing: '0.02em',
                      color: '#4B5563'
                    }}>
                    Range
                  </Typography>
                  <Typography
                    id="range-slider"
                    gutterBottom
                    sx={{
                      fontFamily: 'Jost',
                      fontWeight: '500',
                      fontSize: '20px',
                      letterSpacing: '0.02em',
                      color: '#1F2937'
                    }}>
                    ${priceFilter[0]}-$
                    {priceFilter[1]}
                  </Typography>
                </Box>
                <Slider
                  sx={{
                    color: '#EB5757'
                  }}
                  value={priceFilter}
                  onChange={e => setPriceFilter(e.target.value)}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  max={2000}
                  min={1}
                  name="price"
                  disableSwap
                  getAriaLabel={() => 'Minimum distance'}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '600',
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    marginBottom: '10px'
                  }}>
                  BRANDS
                </Typography>
                {brandLists.map((filter, index) => {
                  if (
                    (isBrandExtend && index < brandLists.length) ||
                    (!isBrandExtend && index < 10)
                  ) {
                    return (
                      <FormGroup
                        key={filter.id}
                        sx={{
                          fontFamily: 'Jost',
                          fontWeight: '400',
                          fontSize: '20px',
                          letterSpacing: '0.02em',
                          color: '#1F2937'
                        }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={brandFilter.includes(filter.id)}
                              value={filter.id}
                              name="brand"
                              onChange={handleChange}
                              disabled={filter.id === brandFilter[0]}
                            />
                          }
                          label={filter.name}
                        />
                      </FormGroup>
                    );
                  }
                })}
                {brandLists.length > 10 ? (
                  !isBrandExtend ? (
                    <Button onClick={() => handlerExtendFilters('brand')}>
                      +{brandLists.length - 10} more
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlerExtendFilters('brand')}
                      sx={{ textTransform: 'capitalize' }}>
                      See Less
                    </Button>
                  )
                ) : (
                  <></>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '600',
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    marginBottom: '10px'
                  }}>
                  CATEGORIES
                </Typography>
                {categoryLists.map((filter, index) => {
                  if (
                    (isCategorydExtend && index < categoryLists.length) ||
                    (!isCategorydExtend && index < 4)
                  ) {
                    return (
                      <FormGroup
                        key={filter.id}
                        sx={{
                          fontFamily: 'Jost',
                          fontWeight: '400',
                          fontSize: '20px',
                          letterSpacing: '0.02em',
                          color: '#1F2937'
                        }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={categoryFilter.includes(filter.id)}
                              value={filter.id}
                              name="category"
                              onChange={handleChange}
                            />
                          }
                          label={filter.name}
                        />
                      </FormGroup>
                    );
                  }
                })}
                {categoryLists.length > 4 ? (
                  !isBrandExtend ? (
                    <Button onClick={() => handlerExtendFilters('category')}>
                      +{categoryLists.length - 4} more
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlerExtendFilters('category')}
                      sx={{ textTransform: 'capitalize' }}>
                      See Less
                    </Button>
                  )
                ) : (
                  <></>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '600',
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    marginBottom: '10px'
                  }}>
                  SIZE
                </Typography>
                {sizeLists.map((filter, index) => {
                  return (
                    <FormGroup
                      key={index}
                      sx={{
                        fontFamily: 'Jost',
                        fontWeight: '400',
                        fontSize: '20px',
                        letterSpacing: '0.02em',
                        color: '#1F2937'
                      }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={sizeFilter.includes(filter.id)}
                            value={filter.id}
                            name="size"
                            onChange={handleChange}
                          />
                        }
                        label={filter.name}
                      />
                    </FormGroup>
                  );
                })}
              </Box>
            </Box>
          ) : (
            <></>
          )}
          <Box
            sx={{
              width: '30%',
              display: { md: 'flex', xs: 'none' },
              flexDirection: 'column',
              gap: '40px'
            }}>
            <Box sx={{ marginTop: '70px' }}>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '10px'
                }}>
                Filter
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '10px'
                }}>
                PRICES
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                <Typography
                  id="range-slider"
                  gutterBottom
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '400',
                    fontSize: '20px',
                    letterSpacing: '0.02em',
                    color: '#4B5563'
                  }}>
                  Range
                </Typography>
                <Typography
                  id="range-slider"
                  gutterBottom
                  sx={{
                    fontFamily: 'Jost',
                    fontWeight: '500',
                    fontSize: '20px',
                    letterSpacing: '0.02em',
                    color: '#1F2937'
                  }}>
                  ${priceFilter[0]}-$
                  {priceFilter[1]}
                </Typography>
              </Box>
              <Slider
                sx={{
                  color: '#EB5757'
                }}
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={2000}
                min={1}
                name="price"
                disableSwap
                getAriaLabel={() => 'Minimum distance'}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '10px'
                }}>
                BRANDS
              </Typography>
              {brandLists.map((filter, index) => {
                if (
                  (isBrandExtend && index < brandLists.length) ||
                  (!isBrandExtend && index < 10)
                ) {
                  return (
                    <FormGroup
                      key={filter.id}
                      sx={{
                        fontFamily: 'Jost',
                        fontWeight: '400',
                        fontSize: '20px',
                        letterSpacing: '0.02em',
                        color: '#1F2937'
                      }}>
                      <FormControlLabel
                        label={filter.name}
                        control={
                          <Checkbox
                            checked={brandFilter.includes(filter.id)}
                            value={filter.id}
                            name="brand"
                            onChange={handleChange}
                            // setBrandFilter(filter => {
                            //   if (!brandFilter.includes(parseInt(e.target.value)))
                            //     [...filter, parseInt(e.target.value)];
                            // });
                            // }}
                            // onChange={e =>
                            //   setBrandFilter(brandFilter => [
                            //     ...brandFilter,
                            //     parseInt(e.target.value)
                            //   ])
                            // }
                          />
                        }
                      />
                    </FormGroup>
                  );
                }
              })}
              {brandLists.length > 10 ? (
                !isBrandExtend ? (
                  <Button onClick={() => handlerExtendFilters('brand')}>
                    +{brandLists.length - 10} more
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlerExtendFilters('brand')}
                    sx={{ textTransform: 'capitalize' }}>
                    See Less
                  </Button>
                )
              ) : (
                <></>
              )}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '10px'
                }}>
                CATEGORIES
              </Typography>
              {categoryLists.map((filter, index) => {
                if (
                  (isCategorydExtend && index < categoryLists.length) ||
                  (!isCategorydExtend && index < 4)
                ) {
                  return (
                    <FormGroup
                      key={filter.id}
                      sx={{
                        fontFamily: 'Jost',
                        fontWeight: '400',
                        fontSize: '20px',
                        letterSpacing: '0.02em',
                        color: '#1F2937'
                      }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={categoryFilter.includes(filter.id)}
                            value={filter.id}
                            name="category"
                            onChange={handleChange}
                          />
                        }
                        label={filter.name}
                      />
                    </FormGroup>
                  );
                }
              })}
              {categoryLists.length > 4 ? (
                !isCategorydExtend ? (
                  <Button onClick={() => handlerExtendFilters('category')}>
                    +{categoryLists.length - 4} more
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlerExtendFilters('category')}
                    sx={{ textTransform: 'capitalize' }}>
                    See Less
                  </Button>
                )
              ) : (
                <></>
              )}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '10px'
                }}>
                SIZE
              </Typography>
              {sizeLists.map((filter, index) => {
                return (
                  <FormGroup
                    key={index}
                    sx={{
                      fontFamily: 'Jost',
                      fontWeight: '400',
                      fontSize: '20px',
                      letterSpacing: '0.02em',
                      color: '#1F2937'
                    }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          key={index}
                          checked={sizeFilter.includes(filter.id)}
                          value={filter.id}
                          name="size"
                          onChange={handleChange}
                        />
                      }
                      label={filter.name}
                    />
                  </FormGroup>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              width: '10%',
              display: {
                xs: 'flex',
                md: 'none'
              },
              flexDirection: 'column',
              gap: '40px',
              marginTop: '20px',
              position: 'relative'
            }}>
            <Image
              src={'/images/arrowicon.png'}
              alt="menuicon"
              height={25}
              width={25}
              onClick={() => setIsOpen(!isOpen)}
            />
          </Box>
          <Box
            sx={{
              width: '70%'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '700',
                  fontSize: {
                    lg: '50px',
                    md: '32px',
                    xs: '25px'
                  },
                  textAlign: 'center',
                  color: '#212121'
                }}>
                Women Party Dresses
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Jost',
                  fontWeight: '400',
                  fontSize: '20px',
                  letterSpacing: '0.02em',
                  color: '#4B5563'
                }}>
                {filterCategoryData.length}&nbsp;results
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                objectFit: 'contain'
              }}>
              <Grid container columnSpacing={2}>
                {filterCategoryData?.length > 0 ? (
                  filterCategoryData.slice(indexOfFirstRecord, indexOfLastRecord).map(product => {
                    return (
                      <Grid
                        item
                        key={product.id}
                        sm={6}
                        lg={4}
                        sx={{
                          position: 'relative'
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                          <Image
                            src={product.productImages[0].productImage}
                            alt="imageGirl"
                            height={0}
                            width={0}
                            sizes="(max-width:0) 100vw"
                            style={{
                              height: '100%',
                              width: '100%'
                            }}
                            onClick={e => handleProductClick(product)}
                          />
                        </Box>
                        {/* {product.isNewArrival && (
                          <Box
                            sx={{
                              backgroundColor: '#111827',
                              width: 'fit-content',
                              padding: '2px 10px',
                              position: 'absolute',
                              top: '0%'
                            }}>
                            <Typography
                              sx={{
                                fontFamily: 'Jost',
                                fontWeight: '400',
                                fontSize: '12px',
                                color: '#FFFFFF'
                              }}>
                              New Arrivals
                            </Typography>
                          </Box>
                        )} */}
                        <Box
                          sx={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            width: 'fit-content',
                            padding: '5px 8px',
                            position: 'absolute',
                            paddingTop: '10px',
                            top: '3%',
                            right: 0
                          }}>
                          <Image
                            src={'/images/whitelike.png'}
                            alt="productimg"
                            width={25}
                            height={22}
                          />
                        </Box>

                        <Box
                          sx={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-end'
                            }}>
                            <Typography
                              sx={{
                                width: '80%',
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                fontSize: '18px',
                                color: '#000000'
                              }}>
                              {product.productName}
                            </Typography>
                          </Box>
                          <Image
                            src={'/images/womenproductcart.png'}
                            alt="productimg"
                            height={22}
                            width={32}
                          />
                        </Box>
                        <Typography
                          sx={{
                            width: '80%',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '20px',
                            color: '#1B2437',
                            alignItems: 'flex-start'
                          }}>
                          $ {product.productCurrentPrice}
                        </Typography>
                        {/* </Box> */}
                      </Grid>
                    );
                  })
                ) : (
                  <Image
                    src="/images/data-not-found.jpg"
                    alt="data not found"
                    height={300}
                    width={300}
                  />
                )}
              </Grid>
              {filterCategoryData.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '70px',
                    marginBottom: '70px',
                    '& .MuiButtonBase-root': {
                      backgroundColor: '#D1D5DB'
                    },
                    '& .MuiPagination-ul> li:first-child > button': {
                      backgroundColor: '#D1D5DB'
                    },
                    '& .MuiPagination-ul>li:last-child > button': {
                      backgroundColor: '#1F2937',
                      color: 'white'
                    }
                  }}>
                  <Pagination
                    count={count}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChangePagination}
                  />
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
    // </ProtectedRoute>
  );
};
export default CategroyDetails;
