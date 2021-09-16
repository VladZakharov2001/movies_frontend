import React, { useState } from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";
import FieldInput from "./components/FieldInput/index";
import logo from "./logo.svg";
import { Container, Logo, ButtonCome, Password } from "./styles";
import { Button } from "@material-ui/core";
import { FORM_ERROR } from "final-form";
const Authorization = (props: {
  getValueAuth: (value: boolean) => boolean;
}) => {
  const history = useHistory();
  const required = (value: string): string => {
    return value ? "" : "Empty field";
  };

  const onSubmit = (values: any) => {
    if (values.login !== localStorage.getItem("login")) {
      return { login: "Unknown username" };
    }
    if (values.password !== localStorage.getItem("password")) {
      return { [FORM_ERROR]: "Invalid password" };
    }
    props.getValueAuth(true);
    history.push("/");
  };
  return (
    <div>
      <Container>
        <Logo>
          <div>
            <img src={logo} />
          </div>
        </Logo>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit}>
              <FieldInput name={"login"} validate={required} />
              <Password>
                <FieldInput name={"password"} validate={required} />
              </Password>
              <div>
                {submitError && <div className="error">{submitError}</div>}
                <ButtonCome>
                  <Button variant="outlined" type="submit">
                    Войти
                  </Button>
                </ButtonCome>
              </div>
            </form>
          )}
        />
      </Container>
    </div>
  );
};
export default Authorization;
