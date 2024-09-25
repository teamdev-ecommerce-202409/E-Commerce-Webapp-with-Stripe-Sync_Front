// TODO 以下、モック用で仮で作成した型。モック削除後消す

export type CategoryInfo = {
  id: number;
  categoryName: string;
  categoryChoices: CategoryChoice[];
};

export type CategoryChoice = {
  id: number;
  name: string;
};
