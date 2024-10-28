import "../../../style/FilterCardList.css";

type FilterCardProps = {
  name: string;
};

const FilterCard = ({ name }: FilterCardProps) => {
  return <div className="filterCard_container">{name}</div>;
};

type Props<T extends { id: number; name: string }> = {
  categoryLabel: string;
  selectedCategory: T[]; // T型の配列で、idとnameが必要
};

const FilterCardList = <T extends { id: number; name: string }>({
  categoryLabel,
  selectedCategory,
}: Props<T>) => {
  return (
    selectedCategory &&
    selectedCategory.length > 0 ? (
      <div className="filterCardList_container">
        <div className="filterCardList_label">{categoryLabel}：</div>
        <div className="filterCardList_cards_content">
          {selectedCategory.map((category) => (
            <FilterCard name={category.name} key={category.id} />
          ))}
        </div>
      </div>
    ) : null
  );
};

export default FilterCardList;
