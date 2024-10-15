import { CatgoryType, ProductInfoType } from "../type/ProductType";

export const testCategories: CatgoryType = {
  sizeCatgory: [
    {
      id: 1,
      name: "S",
    },
    {
      id: 2,
      name: "M",
    },
    {
      id: 3,
      name: "L",
    },
  ],
  targetCatgory: [
    {
      id: 1,
      name: "メンズ",
    },
    {
      id: 2,
      name: "レディース",
    },
    {
      id: 3,
      name: "キッズ",
    },
  ],
  typeCatgory: [
    {
      id: 1,
      name: "トップス",
    },
    {
      id: 2,
      name: "ズボン",
    },
    {
      id: 3,
      name: "スカート",
    },
  ],
  brandCatgory: [
    {
      id: 1,
      name: "NICE",
    },
    {
      id: 2,
      name: "UNIQ",
    },
    {
      id: 3,
      name: "KARUKAN",
    },
  ],
};

export const testItems: ProductInfoType[] = [
  {
    id: 1,
    name: "testItem1",
    description: "This is the description for testItem1",
    imgUrl: "/testImg/tops1.jpg",
    price: 100,
    release_date: "2023-09-01",
    stock_quantity: 10,
    is_deleted: false,
    created_at: "2023-09-01T12:00:00Z",
    updated_at: "2023-09-01T12:00:00Z",
    size: { id: 1, name: "M" }, // SizeType example
    target: { id: 1, name: "Men" }, // TargetType example
    clothes_type: { id: 1, name: "Shirt" }, // ClothesType example
    brand: { id: 1, name: "Nike" }, // BrandType example
  },
  {
    id: 2,
    name: "testItem2",
    description: "This is the description for testItem2",
    imgUrl: "/testImg/tops2.jpg",
    price: 200,
    release_date: "2023-09-02",
    stock_quantity: 20,
    is_deleted: false,
    created_at: "2023-09-02T12:00:00Z",
    updated_at: "2023-09-02T12:00:00Z",
    size: { id: 2, name: "L" }, // SizeType example
    target: { id: 2, name: "Women" }, // TargetType example
    clothes_type: { id: 2, name: "T-Shirt" }, // ClothesType example
    brand: { id: 2, name: "Adidas" }, // BrandType example
  },
  {
    id: 3,
    name: "testItem3",
    description: "This is the description for testItem3",
    imgUrl: "/testImg/pants1.jpg",
    price: 300,
    release_date: "2023-09-03",
    stock_quantity: 30,
    is_deleted: false,
    created_at: "2023-09-03T12:00:00Z",
    updated_at: "2023-09-03T12:00:00Z",
    size: { id: 3, name: "S" }, // SizeType example
    target: { id: 3, name: "Kids" }, // TargetType example
    clothes_type: { id: 3, name: "Pants" }, // ClothesType example
    brand: { id: 3, name: "Puma" }, // BrandType example
  },
];
