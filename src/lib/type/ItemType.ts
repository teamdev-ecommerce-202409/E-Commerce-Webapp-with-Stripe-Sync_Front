// TODO 以下、モック用で仮で作成した型。モック削除後消す

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
