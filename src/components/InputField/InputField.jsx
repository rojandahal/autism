function InputField(classNameInput, placeholderArgs, typeArgs) {
  return (
    <input
      type={typeArgs}
      placeholder={placeholderArgs}
      className={classNameInput}
    ></input>
  );
}

export default InputField;
