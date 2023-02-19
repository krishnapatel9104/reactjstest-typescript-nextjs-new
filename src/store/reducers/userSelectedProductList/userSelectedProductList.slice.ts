import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userCartProductsType, userCartProductType, userSelectedProductListType } from "../../../types/redux/userSelectedProductList.type";
import { deleteUserSelectedProductListType, updateUserSelectedProductListType } from '../../../types/redux/updateUserSelectedProductList.type';
// import { categoryProductListType } from "../../../types/constants/categoryProductList.type";

const initialState: userCartProductsType = {
  cartProductDetails: []
};
export const userSelectedProductListSlice = createSlice({
  name: "userSelectedProductList",
  initialState: initialState,
  reducers: {
    setUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<userCartProductType>) => {
      let uniqueProductId = Math.floor((Math.random() * 100) + 1);
      console.log("sslice action called : ", state.cartProductDetails, action.payload);
      if (state.cartProductDetails) {
        let alreadyExist = state.cartProductDetails.findIndex((product) => {
          return product.productId === action.payload.productId && product.size === action.payload.size && product.color === action.payload.color;
        });
        console.log("alreadyExist : ", alreadyExist);

        if (alreadyExist === -1) {
          console.log("product new to add cart");

          action.payload.id = uniqueProductId;
          return {
            ...state,
            cartProductDetails: state.cartProductDetails.concat(action.payload),
          };
        } else {
          console.log("product exists to add cart");

          let newArrayObj = [...state.cartProductDetails];
          console.log("already existis product : ", state.cartProductDetails);
          console.log("new product : ", action.payload);


          if (newArrayObj[alreadyExist].size !== action.payload.size && newArrayObj[alreadyExist].color !== action.payload.color) {
            console.log("if change any");
            action.payload.id = uniqueProductId;
            return {
              ...state,
              cartProductDetails: state.cartProductDetails.concat(action.payload),
            };
          } else {
            newArrayObj[alreadyExist] = {
              ...newArrayObj[alreadyExist],
              quantity: newArrayObj[alreadyExist].quantity + 1,
            };
            return {
              ...state,
              cartProductDetails: newArrayObj,
            };
          }
        }
      }
    },
    deleteSelectedProductList: (state: userCartProductsType, action: PayloadAction<deleteUserSelectedProductListType>) => {
      // let list = state.cartProductDetails.filter(
      //   (product) => product.productId === action.payload.productId && product.size === action.payload.size && product.color === action.payload.color
      // );
      // console.log("delete after list ::::::::::::::: ", list);
      let list = state.cartProductDetails.filter((product) => product.id !== action.payload.id)
      return {
        ...state,
        cartProductDetails: list
      };
    },
    updateUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<updateUserSelectedProductListType>) => {
      console.log("redux update action : ", action.payload);

      let result = state.cartProductDetails.map((product) => {
        if (product.id === action.payload.id) {
          if (action.payload?.quantity) {
            console.log("update quantnity : ");
            return {
              ...product,
              quantity:
                action.payload.quantity === "add" ? product.quantity + 1 : product.quantity - 1,
            };
          }
          if (action.payload?.size) {
            console.log("update size : ");
            return {
              ...product,
              size: action.payload.size,
            };
          }
          if (action.payload?.color) {
            console.log("update color : ");
            return {
              ...product,
              color: action.payload.color,
            };
          }
        } else {
          return {
            ...product
          }
        }
      });
      console.log("result REDUXXXXXXXXXXXXXXXXX: ", result)

      return {
        ...state,
        cartProductDetails: result ? result : []
      };
    },
    resetUserSelectedProductList: (state: userCartProductsType) => {
      return {
        ...state,
        cartProductDetails: [],
      };
    },
    restoreUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<updateUserSelectedProductListType>) => {
      return {
        ...state,
        cartProductDetails: action.payload,
      };
    },
  },
});

export const {
  setUserSelectedProductList,
  updateUserSelectedProductList,
  resetUserSelectedProductList,
  deleteSelectedProductList,
  restoreUserSelectedProductList,
} = userSelectedProductListSlice.actions;

export default userSelectedProductListSlice.reducer;
