// 関連する ForeignKey テーブルの型定義
export type SizeType = {
  id: number;
  name: string;
};

export type TargetType = {
  id: number;
  name: string;
};

export type ClothesType = {
  id: number;
  name: string;
};

export type BrandType = {
  id: number;
  name: string;
};

// Product 型定義
export type ProductInfoType = {
  id: number;
  size: SizeType; // ForeignKey: Size の情報
  target: TargetType; // ForeignKey: Target の情報
  clothes_type: ClothesType; // ForeignKey: ClothesType の情報
  brand: BrandType; // ForeignKey: Brand の情報
  title: string;
  description: string;
  imgUrl: string; //TODO現在、backのmodel.pyにないので仮置き
  price: number; // DecimalField に対応（number 型）
  release_date: string; // DateTimeField は string で扱う
  stock_quantity: number;
  is_deleted: boolean;
  created_at: string; // DateTimeField は string で扱う
  updated_at: string; // DateTimeField は string で扱う
};
