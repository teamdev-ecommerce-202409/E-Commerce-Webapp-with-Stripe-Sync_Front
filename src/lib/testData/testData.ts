import { CategoryInfo } from "../type/CategoryType";
import { ItemInfo } from "../type/ItemType";

export const testCategories: CategoryInfo[] = [
  {
    id: 1,
    categoryName: "サイズ",
    categoryChoices: [
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
  },
  {
    id: 2,
    categoryName: "アイテム名",
    categoryChoices: [
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
  },
  {
    id: 3,
    categoryName: "顧客属性",
    categoryChoices: [
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
  },
];

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
