/* eslint-disable react/prop-types */
function Input({ inputType, inputName, handleState }) {
  const text =
    inputName[0].toUpperCase() + inputName.slice(1, inputName.length);

  return (
    <div>
      <label htmlFor={inputName}>{text}: </label>
      <input
        type={inputType}
        id={inputName}
        onChange={(e) => handleState(e.target.value)}
      />
    </div>
  );
}

export default Input;
