import { ItemInfo } from "../type/ItemType";
import { CatgoryType } from "../type/ProductType";

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

export const testItems: ItemInfo[] = [
  {
    id: 1,
    name: "testItem1",
    price: 100,
    imageUrl: "/testImg/tops1.jpg",
  },
  {
    id: 2,
    name: "testItem2",
    price: 200,
    imageUrl: "/testImg/tops2.jpg",
  },
  {
    id: 3,
    name: "testItem3",
    price: 300,
    imageUrl: "/testImg/pants1.jpg",
  },
];
