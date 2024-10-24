import { ProductInfoType } from "./ProductType";

// ↓はモック用テーブル。モックを全部消したら削除
// export type UserInfoType = {
//   id?: number;
//   name?: string;
//   userImg?: string;
//   email?: string;
//   isAdmin?: boolean;
//   introduction?: string;
//   followers?: number[];
//   followings?: number[];
// };

// 以下から本番用の型。今後の開発は原則以下を試用
// User 型定義
// export type UserInfoType = {
//   id: number;
//   user_name: string;
//   email_address: string;
//   role: string;
//   email_validated_at?: string | null;
//   address: string;
//   is_deleted: boolean;
//   created_at: string; // DateTimeField は string 型で扱う
//   updated_at: string; // DateTimeField は string 型で扱う
// };

// export type UserInfoType = {
//   id: number;
//   uid: string;
//   nickname: string;
//   userImg: string;
//   email: string;
//   authtoken?: string; // Optionalなプロパティ
//   isAuth: boolean;
//   isAdmin: boolean;
// };


// export type UserInfoTypeJotai = {
//   id: number;
//   uid: string;
//   nickname: string;
//   userImg: string;
//   email: string;
//   authtoken?: string;
//   isAuth: boolean;
//   isAdmin: boolean;
//   userInfo?: UserInfoType;
// };

export type UserInfoType = {
  id: number;               // ユーザーID
  username: string;         // ユーザー名
  email: string;            // メールアドレス
  authtoken?: string;
  password?: string;         // パスワード
  role: string;             // ユーザーの役割 (例: "user", "admin" など)
  is_active: boolean;       // アカウントが有効かどうか
  is_staff: boolean;        // スタッフ/管理者かどうか
  is_superuser: boolean;    // スーパーユーザーかどうか
  date_joined?: string;      // ユーザーが登録した日時 (DateTimeField)
  last_login?: string | null; // 最後にログインした日時 (オプションで null を許可)
  created_at: string;       // レコード作成日時
  updated_at: string;       // 最終更新日時
};

export type UserInfoTypeJotai = {
  userInfo?: UserInfoType;
  authtoken?: string; 
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
