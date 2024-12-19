import React, { useEffect, useState } from "react";
import TodoCard from "../../components/cards/TodoCard";
import { MdAdd, MdClose } from "react-icons/md";
import AddEditNotes from "../../components/cards/AddEditNotes";
import axiosInstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import not from "../../assets/not.svg";
import add from "../../assets/add.svg";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  // const [open, setOpen] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // modal editing
  const [openAddModel, setOpenAddModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // user data management
  const [userInfo, setUserInfo] = useState(null);

  // navigate config
  const navigate = useNavigate();

  //Get user Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data) {
        setUserInfo(response.data);
      }
    } catch (err) {
      // handle login error
      if (err.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // console.log(userInfo.user.fullName);

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes/");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("unexppected occured try again");
    }
  };

  // edit to do list
  const handleEdit = (noteData) => {
    setOpenAddModel({ isShown: true, data: noteData, type: "edit" });
  };

  //delete Notes
  const deleteNote = async (noteData) => {
    const noteId = noteData._id;
    // console.log(noteId)
    // try {
    const response = await axiosInstance.delete("/delete-note/" + noteId);

    // alert("note added successfully");
    toast.success("Note deleted successfully");
    getAllNotes();

    // if (response.data && !response.data.error) {
    // }
    // } catch (error) {
    //   if (
    //     error.response &&
    //     error.response.data &&
    //     error.response.data.message
    //   ) {
    //     toast.error("Unexpected error happened");
    //   }
    // }
  };

  //search for notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });

      if (response.data && response.data.note) {
        setIsSearch(true);
        setAllNotes(response.data.note);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // updateIsPinned note logic
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      toast.success("Note Pinned successfully");
      getAllNotes();

      // if (response.data && response.data.note) {
      // }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // hancle clearing search after query
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="w-11/12 mx-auto mt-4">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {allNotes.map((note, index) => (
              <TodoCard
                key={note._id}
                title={note.title}
                date={note.date}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            image={isSearch ? not : add}
            message={
              isSearch
                ? `Ops we don't have the note that you searched`
                : `Start creating first note! Click the 'add' button to jot down your thoughts, ideas and reminders, let get started.`
            }
          />
        )}
      </div>

      {/* add todolist button  */}
      <button className="w-16 h-16 flex items-center rounded-2xl bg-primary hover:bg-blue-600 absolute bottom-10 right-10 text-4xl text-white font-bold justify-center hover:shadow-xl z-10">
        {openAddModel.isShown ? (
          <MdClose onClick={() => setOpenAddModel({ isShown: false })} />
        ) : (
          <MdAdd
            onClick={() => {
              setOpenAddModel({ isShown: true, type: "add", data: null });
            }}
          />
        )}
      </button>

      {openAddModel.isShown && (
        <AddEditNotes
          type={openAddModel.type}
          noteData={openAddModel.data}
          getAllNotes={getAllNotes}
        />
      )}
    </>
  );
};

export default Home;
