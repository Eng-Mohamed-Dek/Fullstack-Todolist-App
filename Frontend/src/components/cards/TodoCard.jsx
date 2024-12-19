import moment from "moment";
import React from "react";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";

const TodoCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onDelete,
  onPinNote,
  onEdit,
}) => {
  return (
    <div className="border rounded bg-white p-4 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        {/* todolist Title  */}
        <div>
          <h6 className="text-[20px] mb-2 font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      {/* the todolist content  */}
      <p className="text-xs text-slate-500 mb-5 mt-5">
        {content?.slice(0, 60)}
      </p>

      {/* todolist actions  */}
      <div className="text-xs text-slate-500 flex items-center justify-between mt-2">
        {/* todolist tags  */}
        <div className="text-xs text-slate-500 px-2">{tags.map((tag) => ` #${tag}`)}</div>

        {/* todolist pin and unpin */}
        <div className="flex items-center gap-4">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
