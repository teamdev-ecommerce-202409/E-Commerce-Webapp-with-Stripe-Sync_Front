export type CategoryInfo = {
  id: number;
  categoryName: string;
  categoryChoices: CategoryChoice[];
};

export type CategoryChoice = {
  id: number;
  name: string;
};
