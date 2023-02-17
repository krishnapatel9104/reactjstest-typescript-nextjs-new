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
      console.log("sslice action called : ", state.cartProductDetails, action.payload);
      let alreadyExist = state.cartProductDetails.findIndex((product) => {
        return product.productId === action.payload.productId && product.size === action.payload.size && product.color === action.payload.color;
      });
      if (alreadyExist === -1) {
        return {
          ...state,
          cartProductDetails: state.cartProductDetails.concat(action.payload),
        };
      } else {

        let newArrayObj = [...state.cartProductDetails];
        console.log("already existis product : ", state.cartProductDetails);
        console.log("new product : ", action.payload);


        if (newArrayObj[alreadyExist].size !== action.payload.size && newArrayObj[alreadyExist].color !== action.payload.color) {
          console.log("if change any");
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

    },
    deleteSelectedProductList: (state: userCartProductsType, action: PayloadAction<deleteUserSelectedProductListType>) => {
      let list = state.cartProductDetails.filter(
        (product) => product.productId === action.payload.productId && product.size === action.payload.size && product.color === action.payload.color
      );
      console.log("delete after list ::::::::::::::: ", list);

      return {
        ...state,
        cartProductDetails: list
      };
    },
    updateUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<updateUserSelectedProductListType>) => {
      console.log("redux update action : ", action.payload);

      let result = state.cartProductDetails.map((product) => {
        if (product.productId === action.payload.productId) {
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
        }
      });
      console.log("result REDUXXXXXXXXXXXXXXXXX: ", result)

      return {
        ...state,
        cartProductDetails: result ? result : []
      };
    },
    resetUserSelectedProductList: (state) => {
      return {
        ...state,
        cartProductDetails: [],
      };
    },
    restoreUserSelectedProductList: (state, action) => {
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
