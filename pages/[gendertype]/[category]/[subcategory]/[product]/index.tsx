import React from "react";
import { ItemDetailView } from "../../../../../src/components/ItemDetailView/ItemDetailView";
import { categoryProductListType } from '../../../../../src/types/constants/categoryProductList.type';

export default function ItemDetailCompoenent(props: categoryProductListType) {
    return <ItemDetailView productDetails={props} />;
}
