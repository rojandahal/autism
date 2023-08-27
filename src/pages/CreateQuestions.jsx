import { useState } from "react";
import "./createquestion.css";

function CreateQuestions() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [newOption, setNewOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    // Create a new option object with text and whether it's the answer
    const newOptionObject = { text: newOption, isAnswer: newOption === answer };

    if (options.length === 4) {
      alert("Can't add more than 4 options")
    } else {

      // Add the new option object to the options array
      setOptions([...options, newOptionObject]);
    }

    // Clear the input fields
    setNewOption("");
    setAnswer("");
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="question-form">
      <h2>Questionnare</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div>
            <label>Question:</label>
            <input
              type='text'
              className="form-controller"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>

          <div>
            <label>Add Option:</label>
            <input
              type='text'
              className="form-controller"
              value={newOption}
              onChange={e => setNewOption(e.target.value)}
            />
          </div>

        </div>
        <div className="grid-2">
          <div>
            <label>Answer:</label>
            <select
              value={answer}
              className="form-controller"
              onChange={e => setAnswer(e.target.value)}
            >
              {options.map((option, index) => (
                <option
                  key={index}
                  value={option.text}
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Upload Image or Sound:</label>
            <input
              type='file'
              onChange={handleFileChange}
            />
            <div className="selected-file">
              <strong>Selected File:</strong>{" "}
              {selectedFile ? selectedFile.name : "None"}
            </div>

            {/* Display preview if a file is selected */}
            {previewUrl && (
              <div>
                {selectedFile.type.startsWith("image") ? (
                  <img
                    src={previewUrl}
                    alt='Preview'
                    style={{ height: "100px" }}
                  />
                ) : (
                  <audio controls>
                    <source src={previewUrl} />

                  </audio>
                )}
              </div>
            )}
          </div>

        </div>
        <div className="btn-container">
          <button type='submit' className="primary-btn">Add</button>
        </div>

      </form>
      <div className="flex flex-1"> <h3>Question:</h3><p>{question}</p></div>
      <div className="flex"><h3>Options:</h3>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              {option.text} {option.isAnswer ? "(Answer)" : ""}
            </li>
          ))}
        </ul></div>
      <div className="flex"><h3>Answer:</h3><p>{answer}</p></div>

    </div>
  );
}

export default CreateQuestions;
