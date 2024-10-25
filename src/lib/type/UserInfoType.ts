import { ProductInfoType } from "./ProductType";

export type UserInfoType = {
  id: number;
  user_name: string;
  email_address: string;
  role: string;
  email_validated_at?: string | null;
  address: string;
  is_deleted: boolean;
  created_at: string; // DateTimeField は string 型で扱う
  updated_at: string; // DateTimeField は string 型で扱う
};

export type UserInfoTypeJotai = {
  userInfo?: UserInfoType;
  authtoken?: string;
  favList?: number[];
};

export type FavoriteInfo = {
  id: number;
  user: UserInfoType; // ForeignKey: User に関連
  product: ProductInfoType; // ForeignKey: Product に関連
  created_at: string; // DateTimeField は string で扱う
  updated_at: string;
};

// WishList 型定義
export type WishListInfo = {
  id: number;
  user: UserInfoType; // ForeignKey: User に関連
  product: ProductInfoType; // ForeignKey: Product に関連
  is_public: boolean; // WishList の公開状態
  created_at: string; // DateTimeField は string で扱う
  updated_at: string;
};

// CartItem 型定義
export type CartItemInfo = {
  id: number;
  user: UserInfoType; // ForeignKey: User モデルに関連
  product: ProductInfoType; // ForeignKey: Product モデルに関連
  quantity: number; // 商品の数量
  created_at: string; // DateTimeField は string で扱う
  updated_at: string;
};
