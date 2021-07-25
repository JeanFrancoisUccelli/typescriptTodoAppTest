import React from "react";
import axios from "axios";

// import CSS
import "./Form.scss";

// Create interface for the props's Form
interface FormProps {
  value: string;
  handleValue: React.Dispatch<React.SetStateAction<string>>;
  getDataFromAPI: () => void;
}

const Form: React.FC<FormProps> = ({ value, handleValue, getDataFromAPI }) => {
  // FUNCTION
  const submitTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value || /^s*$/.test(value)) {
      return;
    }
    axios({
      method: "post",
      url: "http://localhost:1337/tasks/",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: "",
        content: value,
        completed: false,
      },
    })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        getDataFromAPI();
      });

    // initialize value
    handleValue("");
  };

  return (
    <form className="form" onSubmit={submitTask}>
      <input
        className="form-input"
        type="text"
        value={value}
        onChange={(event) => {
          handleValue(event.target.value);
        }}
        placeholder="Indiquer une nouvelle tâche ici"
      />
      <div className="form-container-btn-plus">
        <div className="form-btn-plus">
          <i className="fa fa-plus" aria-hidden="true" />
          <span className="btn-plus-text" onClick={submitTask}>
            <small>OK</small>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Form;
