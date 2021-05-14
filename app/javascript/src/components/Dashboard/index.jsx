import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import { Link } from "react-router-dom";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import ListPolls from "../Polls/ListPolls";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <ListPolls data={polls} />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center my-6">
        You have no Polls 😔
      </h1>
      <Link to="/polls/create">
        <p className="inline-block text-center px-5 py-2 bg-indigo-500 text-white font-semibold rounded">
          Create
        </p>
      </Link>
    </Container>
  );
};
export default Dashboard;
