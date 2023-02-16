import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userSelectedProductListType } from "../../../types/redux/userSelectedProductList.type";
import { updateUserSelectedProductListType } from '../../../types/redux/updateUserSelectedProductList.type';
import { categoryProductListType } from "../../../types/constants/categoryProductList.type";
const initialState: userSelectedProductListType = {
  userSelectedProductLists: [],
  otherDetails: {
    Shipping: 64,
    vatAndTax: 64,
  },
};
export const userSelectedProductListSlice = createSlice({
  name: "userSelectedProductList",
  initialState: initialState,
  reducers: {
    setUserSelectedProductList: (state, action) => {
      console.log("sslice : ", state.userSelectedProductLists, action.payload);
      let alreadyExist = state.userSelectedProductLists.findIndex((product) => {
        return product.id === action.payload.id;
      });
      if (alreadyExist === -1) {
        return {
          ...state,
          userSelectedProductLists: state.userSelectedProductLists.concat(action.payload),
        };
      } else {
        let newArrayObj = [...state.userSelectedProductLists];
        newArrayObj[alreadyExist] = {
          ...newArrayObj[alreadyExist],
          quantity: newArrayObj[alreadyExist].quantity + 1,
        };
        return {
          ...state,
          userSelectedProductLists: newArrayObj,
        };
      }
    },
    deleteSelectedProductList: (state, action) => {
      return {
        ...state,
        userSelectedProductLists: state.userSelectedProductLists.filter(
          (product) => product.id !== action.payload
        ),
      };
    },
    updateUserSelectedProductList: (state: userSelectedProductListType, action: PayloadAction<updateUserSelectedProductListType>) => {
      let obj = state.userSelectedProductLists.map((product) => {
        if (product.id === action.payload.orderId) {
          if (action.payload.quantity) {
            return {
              ...product,
              quantity:
                action.payload.quantity === "add" ? product.quantity + 1 : product.quantity - 1,
            };
          }
          if (action.payload.size) {
            return {
              ...product,
              size: action.payload.size,
            };
          }
          if (action.payload.color) {
            return {
              ...product,
              color: action.payload.color,
            };
          }
        } else return product;
      });
      return {
        ...state,
        userSelectedProductLists: obj,
      };
    },
    resetUserSelectedProductList: (state) => {
      return {
        ...state,
        userSelectedProductLists: [],
      };
    },
    restoreUserSelectedProductList: (state, action) => {
      return {
        ...state,
        userSelectedProductLists: action.payload,
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
