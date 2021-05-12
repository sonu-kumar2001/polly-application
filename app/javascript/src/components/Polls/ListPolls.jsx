import React from "react";

const ListPolls = ({ data }) => {
  return (
    <div className="container mx-auto my-20 px-7 py-5 px-8 shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-indigo-500 mb-2">Polls</h2>
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
