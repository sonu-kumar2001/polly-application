import React, { useState } from "react";
import Container from "components/Container";
import { logger } from "common/logger";
import PollForm from "./Form/PollForm";
import pollApi from "apis/polls";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { option: "" },
    { option: "" },
    { option: "" },
    { option: "" },
  ]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollApi.create({ poll: { title, options_attributes: options } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm
        title={title}
        options={options}
        setTitle={setTitle}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateTask;
