export interface categoryProductListType {
  id: number
  imageSource: string
  productName: string
  productPrice: number
  isLike: boolean
  isNewArrival: boolean
  filter: string
  designers?: string
  brand: string
  category: string
  size: string
  quantity: number
  color: string
  productDesc: string[]
  reviewRate: number
  imageDifferentAngle: ImageDifferentAngle[]
}

export interface ImageDifferentAngle {
  id: number
  imagePath: string
}

export interface otherDetails {
  Shipping: number
  vatAndTax: number
}

export interface userSelectedProductListType {
  userSelectedProductLists: categoryProductListType[]
  otherDetails: otherDetails
}

export interface userCartProductsType {
  cartProductDetails: userCartProductType[]
}

export interface userCartProductType {
  id:number
  productId: number
  quantity: number
  size: number
  color: number
}