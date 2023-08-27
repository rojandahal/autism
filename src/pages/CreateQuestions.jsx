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

    // Add the new option object to the options array
    setOptions([...options, newOptionObject]);

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Question:</label>
        <input
          type='text'
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />

        <label>Add Option:</label>
        <input
          type='text'
          value={newOption}
          onChange={e => setNewOption(e.target.value)}
        />

        <label>Answer:</label>
        <select
          value={answer}
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

        <label>Upload Image or Sound:</label>
        <input
          type='file'
          onChange={handleFileChange}
        />
        <div>
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

        <button type='submit'>Add</button>
      </form>
      <h2>Options:</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {option.text} {option.isAnswer ? "(Answer)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateQuestions;
