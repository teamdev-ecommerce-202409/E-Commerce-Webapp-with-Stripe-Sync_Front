// 商品情報の型情報を書く。以下は参考

// 商品情報の型定義
export type ItemInfo = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export enum ItemType {
  "トップス",
  "ズボン",
  "スカート",
}

export type LikesInfo = {
  id: number;
  userId: number;
  postId: number;
};
