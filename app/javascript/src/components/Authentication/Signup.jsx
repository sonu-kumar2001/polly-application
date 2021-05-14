import React, { useState } from "react";

import SignupForm from "components/Authentication/Form/SignupForm";
import authApi from "apis/auth";
import Container from "components/Container";
import { logger } from "common/logger";

const Signup = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await authApi.signup({
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };
  return (
    <Container>
      <SignupForm
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Signup;
