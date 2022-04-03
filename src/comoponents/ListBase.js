function ListBase({ items, resourceName, itemComponent: ItemComponent }) {
  return (
    <>
      {items.map((item, index) => (
        <ItemComponent key={index} {...{ [resourceName]: item }} />
      ))}
    </>
  );
}

export default ListBase;
