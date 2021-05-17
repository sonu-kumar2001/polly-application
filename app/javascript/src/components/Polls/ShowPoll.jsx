import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { logger } from "common/logger";
import { getFromLocalStorage } from "helpers/storage";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollApi from "apis/polls";
import voteApi from "apis/votes";

const showPoll = () => {
  const { slug } = useParams();
  const userId = getFromLocalStorage("authUserId");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [votedOptionId, setVotedOptionId] = useState(null);
  const [votes, setVotes] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [pollId, setPollId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPollDetails = async () => {
    try {
      const response = await pollApi.show(slug);
      const userVotes = response.data.votes?.find(
        vote => vote.user_id == userId
      );
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
      setVotes(response.data.votes);
      setPollId(response.data.poll.id);
      if (userVotes) {
        setVotedOptionId(userVotes.option_id);
        setIsVoted(Boolean(userVotes));
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await voteApi.create({
        vote: { poll_id: pollId, option_id: votedOptionId },
      });
      setLoading(false);
      fetchPollDetails();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const getVotePercentage = optionId => {
    if (!votes?.length) {
      return "0";
    }
    const filteredVotes = votes.filter(vote => vote.option_id == optionId);
    const percentage = (filteredVotes.length / votes.length) * 100;
    return percentage % 1 ? percentage.toFixed(2) : percentage;
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="w-3/4 mx-auto shadow-2xl rounded-lg py-6 mt-10">
        <h2 className="pb-4 px-6 text-2xl font-bold border-b mb-5 text-bb-purple">
          {title}
        </h2>
        <div className="my-5 px-6">
          {options?.map(optionDetail => {
            return (
              <div key={optionDetail.id}>
                <p
                  className={`border rounded p-3 w-3/4 inline-block cursor-pointer
                hover:bg-bb-purple hover:text-white mb-5 ${
                  optionDetail.id === votedOptionId
                    ? "bg-purple-600 text-white shadow-md"
                    : ""
                } ${isVoted ? "pointer-events-none" : ""}`}
                  onClick={() => {
                    setVotedOptionId(optionDetail.id);
                  }}
                >
                  {optionDetail.option}
                </p>

                <span className={isVoted ? "inline-block ml-4" : "hidden"}>
                  {getVotePercentage(optionDetail.id)} %
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          {isVoted ? (
            <div className="py-1">
              <p className="text-lg text-semibold">Thanks for Voting</p>
              <a className="text-bb-purple " href="/">
                Go to home Page
              </a>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-bb-purple rounded-md text-white px-4 py-1 text-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default showPoll;
