export interface productsType {
  id: number
  productName: string
  productImages: productImage[]
  productDescription: string[]
  productOriginalPrice: number
  productCurrentPrice: number
  gender: number
  category: number
  brand: number
  size: number[]
  color: number[]
  reviewRate: number
}

export interface productImage {
  id: number
  productImage: string
}

// export interface categoryProductListType {
//   id: number
//   imageSource: string
//   productName: string
//   productPrice: number
//   isLike: boolean
//   isNewArrival: boolean
//   filter: string
//   designers?: string
//   brand: string
//   category: string
//   size: string
//   quantity: number
//   color: string
//   productDesc: string[]
//   reviewRate: number
//   imageDifferentAngle: ImageDifferentAngle[]
// }

// export interface ImageDifferentAngle {
//   id: number
//   imagePath: string
// }
