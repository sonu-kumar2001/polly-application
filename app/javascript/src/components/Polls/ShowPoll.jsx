import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { logger } from "common/logger";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollApi from "apis/polls";

const showPoll = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPollDetails = async () => {
    try {
      const response = await pollApi.show(slug);
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
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
        <h2 className="pb-4 px-6 text-2xl font-bold border-b text-bb-purple">
          {title}
        </h2>
        <div className="my-5 px-6">
          {options?.map(optionDetail => {
            return (
              <div key={optionDetail.id}>
                <p
                  className="border rounded mb-5 p-3 w-3/4 inline-block cursor-pointer
                hover:bg-bb-purple hover:text-white"
                >
                  {optionDetail.option}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-bb-purple rounded-md text-white px-4 py-1 text-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </Container>
  );
};

export default showPoll;
