import Input from "./Input";
import SubmitBtn from "./SubmitBtn";

function PersonForm({ setNewName, setNewNumber, handleSubmit }) {
  return (
    <form>
      <br></br>
      <Input inputName={"name"} inputType={"text"} handleState={setNewName} />
      <br></br>
      <Input
        inputName={"number"}
        inputType={"number"}
        handleState={setNewNumber}
      />
      <br></br>
      <SubmitBtn handleSubmit={handleSubmit} />
    </form>
  );
}

export default PersonForm;
