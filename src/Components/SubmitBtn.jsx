function SubmitBtn({ handleSubmit }) {
  return (
    <div>
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default SubmitBtn;
