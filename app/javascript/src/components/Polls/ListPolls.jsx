import React from "react";
import { Link } from "react-router-dom";

const ListPolls = ({ data }) => {
  return (
    <div className="container mx-auto my-20 px-7 py-5 px-8 shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-indigo-500 mb-2">Polls</h2>
        <Link to="/polls/create">
          <p className="inline-block px-5 py-2 bg-indigo-500 text-white font-semibold rounded">
            Create
          </p>
        </Link>
      </div>
      {data.map(poll => {
        return (
          <p
            key={poll.id}
            className="font-semibold text-2xl my-3 hover:text-bb-purple cursor-pointer"
          >
            {poll.title}
          </p>
        );
      })}
    </div>
  );
};

export default ListPolls;
