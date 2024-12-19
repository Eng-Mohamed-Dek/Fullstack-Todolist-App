import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const InputTag = ({ tags, setTags }) => {
  //get the data
  const [inputValue, setInputValue] = useState("");

  //handle the input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //create newTag
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  //delte Tag
  const delteTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // console.log("tags : ", tags);

  //create newTag with Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center flex-wrap mt-5s gap-4 bg-white">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-10 text-sm text-slate-500 px-3 py-3 rounded bg-slate-100 mt-4"
            >
              {" "}
              # {tag}
              <button
                onClick={() => {
                  delteTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          value={inputValue}
          type="text"
          name="tags"
          className="text-smm bg-tranparent border px-3 py-2 rounded outline-none"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter Tags"
        />
        <button
          className="w-8 h-8 flex justify-center items-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default InputTag;
