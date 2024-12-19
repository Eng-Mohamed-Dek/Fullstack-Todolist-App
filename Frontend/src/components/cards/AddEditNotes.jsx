import React, { useState } from "react";
import InputTag from "../input/InputTag";
import axiosInstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEditNotes = ({ noteData, getAllNotes, type }) => {
  // tags state value
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  // error handle
  const [error, setError] = useState("");

  // add note logic
  const AddNote = async () => {
    try {
      const response = await axiosInstance.post("add-note", {
        title,
        content,
        tags,
      });

      // alert("note added successfully");
      setTitle("");
      setContent("");
      setTags("");
      toast.success("Note added successfully !");
      getAllNotes();

      // if (response.data && response.data.note) {
      // }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // edit note logic
  const EditNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      // alert("note added successfully");
      setTitle("");
      setContent("");
      setTags("");
      toast.success(response.data.message);
      getAllNotes();

      // if (response.data && response.data.note) {
      // }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  }

  // handle AddEditNotesRequests
  const handAddNote = () => {
    // validations
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!content) {
      setError("Please enter a content");
      return;
    }

    setError("");

    if (type == "edit") {
      // update note logic
      EditNote();
    } else {
      // add note logic
      AddNote();
    }
  };

  // handle input tag change
  return (
    <>
      <ToastContainer />
      <div className="sm:w-[500px] w-[450px] bg-white p-10 shadow-md rounded-lg absolute top-[0%] sm:top-[10%] left-[2%] sm:left-[36%]">
        <div className="flex flex-col gap-2">
          <label className="input-label">TodoList Title</label>
          <input
            value={title}
            type="text"
            name="title"
            className="text-2xl text-slate-950 outline-none border-[1px] border-black p-4 rounded-lg"
            placeholder="Enter Your TodoList"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="input-label">TodoList Content</label>
          <textarea
            value={content}
            type="text"
            name="content"
            className="text-lg text-slate-950 outline-none bg-slate-50 p-6 r-2 rounded-md "
            placeholder="Enter Your Content"
            rows={10}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-3 mb-5">
          <label className="input-label">TAGS</label>
          <InputTag tags={tags} setTags={setTags} />
        </div>

        {error && <span className="text-red-500 text-xl"> {error} </span>}

        <button
          className="btn font-medium mt-5 p-3"
          onClick={() => {
            handAddNote();
          }}
        >
          {type == "edit" ? "Update TodoList" : "Add TodoList"}
        </button>
      </div>
    </>
  );
};

export default AddEditNotes;
