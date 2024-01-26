function Filter({ setSearchInput }) {
  return (
    <input
      type="search"
      placeholder="Enter person's name"
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}

export default Filter;
