import { GetServerSideProps, NextPage } from 'next';
import { productLists } from '../../../../src/data/productLists';
import { genderLists } from '../../../../src/data/genderLists';
import { brandLists } from '../../../../src/data/brandLists';
import CategroyDetails from '../../../../src/components/CategoryDetails/CategroyDetails';
interface BrandProductPageProps {
  products: any;
}

const BrandProductPage: NextPage<BrandProductPageProps> = ({ products }) => {
  return (
    <>
      <CategroyDetails products={products} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  console.log('Context==>>', context.query);
  let gender = genderLists.find(gender => gender.slug === context.query.gender);
  let brand = brandLists.find(brand => brand.slug === context.query.brand);

  let result = productLists.filter(
    productItem => productItem.gender === gender?.id && productItem.brand === brand?.id
  );
  return {
    props: { products: { result: result, gender: gender, brand: brand?.id } }
  };
};
export default BrandProductPage;
