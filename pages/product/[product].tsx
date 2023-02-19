import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { productLists } from '../../src/data/productLists';
import ItemDetailView from '../../src/components/ItemDetailView/ItemDetailView';
import { productsType } from '../../src/types/constants/products.type';

// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
interface itemDetailViewPageProps {
  product: productsType;
}
const ItemDetailViewPage: NextPage<itemDetailViewPageProps> = ({ product }) => {
  return <ItemDetailView product={product} />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  let result = productLists.find(productItem =>
    context.query.productId
      ? productItem.id === parseInt(context.query.productId)
      : productItem.slug === context.query?.product
  );

  return {
    props: { product: result }
  };
};
export default ItemDetailViewPage;
