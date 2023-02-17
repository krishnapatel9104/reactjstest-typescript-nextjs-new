import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useSelector, useDispatch } from '../../store';
import {
  updateUserSelectedProductList,
  deleteSelectedProductList
} from '../../store/reducers/userSelectedProductList/userSelectedProductList.slice';

import Image from 'next/image';
// import { categoryProductListType } from '../../types/constants/categoryProductList.type';
import { productsType } from '../../types/constants/products.type';
import { productLists } from '../../data/productLists';
import { userCartProductType } from '../../types/redux/userSelectedProductList.type';
import { sizeLists } from '../../data/sizeLists';
import { colorLists } from '../../data/colorLists';

export const YourOrder = () => {
  const dispatch = useDispatch();
  //   const colourList = ['Red', 'Pink', 'Yellow', 'Black'];
  //   const sizeList = ['M', 'L', 'S', 'XS'];
  let total = 0;

  const otherDetails = {
    Shipping: 64,
    vatAndTax: 64
  };
  const reduxData = useSelector(state => state.userSelectedProductListSlice);
  const productDetails = reduxData.cartProductDetails;
  const [userCartProductLists, setUserCartProductLists] = useState<productsType[]>([]);
  // const [selectedSize, setSelectedSize] = useState<number>();
  // const [selectedColor, setSelectedColor] = useState<number>();

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA updated', productDetails);
  useEffect(() => {
    if (productDetails) {
      //   productDetails.forEach(product => {
      //     let cartProducts = productLists.find(p => p.id === product.productId);
      //     return
      //   });

      // let pids = productDetails.reduce<userCartProductType>((acc, e) => {
      //       acc.push(e.productId);
      //       return acc;
      //     }, [])
      //   );
      let allCartProductIds = productDetails.map(p => p.productId);
      console.log('result ::::::: ', allCartProductIds);

      let cartProductLists = productLists.filter(productItem =>
        allCartProductIds.some(cartProductId => productItem.id === cartProductId)
      );
      console.log('cart product object : ', cartProductLists, productDetails);
      setUserCartProductLists(cartProductLists);
      //   const results = productLists.filter(({ id: id }) =>
      //     productDetails.some(({ productId: productId }) => id === productId)
      //   );
      //   console.log('results : ', results);
    }
  }, [productDetails]);

  // useEffect(() => {
  //     localStorage.setItem(
  //         "userSelectedProductList",
  //         JSON.stringify(productDetails)
  //     );
  // }, [productDetails]);

  const handleClick = (productId: number, size: number, color: number) => {
    dispatch(deleteSelectedProductList({ productId: productId, size: size, color: color }));
  };
  const handleQuantityChange = (
    identifier: string,
    productId: number,
    size: number,
    color: number
  ) => {
    if (identifier === 'add') {
      dispatch(
        updateUserSelectedProductList({
          productId: productId,
          color: color,
          size: size,
          quantity: 'add'
        })
      );
    }
    if (identifier === 'less') {
      dispatch(
        updateUserSelectedProductList({
          productId: productId,
          quantity: 'less',
          color: color,
          size: size
        })
      );
    }
  };
  const handleChange = (e: SelectChangeEvent<string>, productId: number) => {
    const { name, value } = e.target;
    console.log('handle change function : ', productId, value, name);
    if (name === 'size') {
      console.log('size condi for update now : ');
      dispatch(updateUserSelectedProductList({ productId: productId, size: parseInt(value) }));
    }
    if (name === 'color') {
      console.log('size condi for update now : ');

      dispatch(
        updateUserSelectedProductList({
          productId: productId,
          color: parseInt(value)
        })
      );
    }
  };
  return (
    <Box
      sx={{
        color: '#616161',
        padding: { xs: '20px', md: '30px', lg: '50px' },
        backgroundColor: '#EFEFF4',
        borderRadius: '34px',
        height: '770px',
        overflow: 'scroll'
      }}>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '700'
        }}>
        Your Order
      </Typography>
      {productDetails?.map((order, index) => {
        let cartProductDetails = productLists.find(p => p.id === order.productId);
        let sizeObjects = sizeLists.filter(s => cartProductDetails?.size.includes(s.id));
        let colorObjects = colorLists.filter(s => cartProductDetails?.color.includes(s.id));
        console.log(
          'cartProductDetails & sizeObjects ::::: ',
          cartProductDetails.size,
          sizeObjects,
          colorObjects
        );
        console.log('SSSSSSSSSSSSS : ', (sizeObjects?.find(s => s.id === order.size)).name);

        total += order.quantity * cartProductDetails?.productCurrentPrice;
        return (
          <Box key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: { xs: '30px', md: '50px' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'row' },
                gap: { xs: '20px', md: '0' }
              }}>
              <Box
                sx={{
                  fontSize: '19px',
                  fontWeight: '500'
                }}>
                {cartProductDetails?.productName}
              </Box>
              <Box>
                <Button
                  sx={{ color: 'red' }}
                  onClick={() => handleClick(order.productId, order.size, order.color)}>
                  <DeleteOutlineSharpIcon />
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '20px 0',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '20px', md: '0' },
                marginRight: '40px'
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '50px'
                }}>
                <Box>
                  <Image
                    src={cartProductDetails?.productImages[0].productImage}
                    alt="imageicon"
                    height={65}
                    width={55}
                  />
                </Box>
                <Box
                  sx={{
                    opacity: '0.8'
                  }}>
                  {cartProductDetails?.productDescription.map((desc, index) => {
                    return <Typography key={index}>-{desc}</Typography>;
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Box
                  sx={{
                    fontWeight: '500'
                  }}>
                  Quantity
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    marginTop: '25px',
                    alignItems: 'center'
                  }}>
                  <Button
                    sx={{
                      border: order.quantity === 1 ? '2px solid #bbacac' : '2px solid red',
                      color: 'red',
                      minWidth: 0,
                      padding: 0
                    }}
                    name="less"
                    disabled={order.quantity === 1}
                    onClick={e =>
                      handleQuantityChange('less', order.productId, order.size, order.color)
                    }>
                    <RemoveSharpIcon
                      style={{
                        color: order.quantity === 1 ? '#bbacac' : 'red'
                      }}
                    />
                  </Button>
                  {order.quantity}
                  <Button
                    sx={{
                      border: '2px solid red',
                      color: 'red',
                      minWidth: 0,
                      padding: 0
                    }}
                    name="add"
                    onClick={e => handleQuantityChange('add', order.productId)}>
                    <AddSharpIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                alignItems: {
                  xs: 'flex-start',
                  md: 'flex-end'
                },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '20px', md: '0' }
              }}>
              <Box>
                <Box
                  sx={{
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                  Size
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                  {/* {console.log(
                    'order isze : ',
                    cartProductDetails?.size.filter(s => {
                      if (s.id === order.size) return s.name;
                    })
                  )} */}

                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="size"
                    value={(sizeObjects?.find(size => size.id === order.size)).id}
                    onChange={e => handleChange(e, order.productId)}
                    sx={{
                      width: {
                        xs: '170px',
                        md: '140px',
                        lg: '170px'
                      }
                    }}>
                    {sizeObjects.map((size, index) => (
                      <MenuItem key={index} value={size.id} sx={{ padding: '10px 10px' }}>
                        {size.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                  Colour
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="color"
                    value={(colorObjects?.find(color => color.id === order.color)).id}
                    onChange={e => handleChange(e, order.productId)}
                    sx={{
                      width: {
                        xs: '170px',
                        md: '140px',
                        lg: '170px'
                      }
                    }}>
                    {colorObjects.map((color, index) => (
                      <MenuItem key={index} value={color.id} sx={{ padding: '10px 10px' }}>
                        {color.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: '#616161',
                    fontSize: '22px',
                    fontWeight: '700'
                  }}>
                  ${cartProductDetails?.productCurrentPrice}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px'
        }}>
        <Box
          sx={{
            color: '#616161',
            opacity: '0.8',
            fontSize: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
          <Typography>Subtotal</Typography>
          <Typography>Shipping</Typography>
          <Typography>Vat,tax</Typography>
          <Typography
            sx={{
              color: '#616161',
              fontSize: '22px',
              fontWeight: '700',
              marginTop: '25px'
            }}>
            Total
          </Typography>
        </Box>
        <Box
          sx={{
            color: '#616161',
            opacity: '0.8',
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
          <Typography>${total}</Typography>
          <Typography>${total !== 0 ? otherDetails.Shipping : 0}</Typography>
          <Typography>${total !== 0 ? otherDetails.vatAndTax : 0}</Typography>
          <Typography
            sx={{
              color: '#616161',
              fontSize: '22px',
              fontWeight: '700',
              marginTop: '25px'
            }}>
            ${total !== 0 ? total + otherDetails.Shipping + otherDetails.vatAndTax : 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
