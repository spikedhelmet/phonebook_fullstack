function Persons({ filteredList, handleDelete }) {
  return (
    <ul>
      {filteredList.map((person) => (
        <div className="flex-h" key={person.id}>
          <li>
            {person.name} {person.number}
          </li>
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </ul>
  );
}

export default Persons;
