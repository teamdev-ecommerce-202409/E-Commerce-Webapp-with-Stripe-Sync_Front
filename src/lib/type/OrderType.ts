// 以下、Order関連テーブル

import { ProductInfoType } from "./ProductType";
import { UserInfoType } from "./UserInfoType";

// Order 型定義
export type OrderInfoType = {
  id: number;
  user: UserInfoType; // ForeignKey: User モデルに関連
  order_date: string; // DateTimeField は string で扱う
  order_status: string; // 注文ステータス
  total_price: number; // DecimalField は number で扱う
  order_items: OrderItemInfoType[];
  created_at: string; // DateTimeField は string で扱う
  updated_at: string; // 同じく string で扱う
};

// OrderItem 型定義
export type OrderItemInfoType = {
  id: number;
  order: OrderInfoType; // ForeignKey: Order モデルに関連
  product: ProductInfoType; // ForeignKey: Product モデルに関連
  quantity: number; // 注文された商品の数量
  unit_price: number; // 商品の単価 (DecimalField)
  created_at: string; // DateTimeField は string で扱う
  updated_at: string; // 同じく string で扱う
};

// Payment 型定義
export type PaymentInfoType = {
  id: number;
  order: OrderInfoType; // ForeignKey: Order モデルに関連
  payment_date: string; // 支払日 (DateTimeField)
  payment_option: string; // 支払方法
  payment_status: string; // 支払ステータス
  created_at: string; // DateTimeField は string で扱う
  updated_at: string; // 同じく string で扱う
};

// Shipping 型定義
export type ShippingInfoType = {
  id: number;
  order: OrderInfoType; // ForeignKey: Order モデルに関連
  shipping_tracking_number: string; // 追跡番号
  shipping_date: string; // 出荷日 (DateTimeField)
  shipping_address: string; // 配送先住所
  address_code: string; // 郵便番号などのコード
  created_at: string; // DateTimeField は string で扱う
  updated_at: string; // 同じく string で扱う
};
