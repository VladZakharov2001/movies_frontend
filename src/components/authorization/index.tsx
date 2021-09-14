import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import FieldInput from "./components/Field/index";
import logo from "./logotip.svg";
import { Container, Logo, ButtonCome, Password } from "./styles";
import { login, password, formData } from "./constants";
import { Button } from "@material-ui/core";

localStorage.setItem("login", login);
localStorage.setItem("password", password);

const Authorization = () => {
  let history = useHistory();
  const [isCorrectValue, setIsCorrectValue] = useState(true);

  const required = (value: string): string => {
    return value ? "" : "Empty field";
  };

  const onSubmit = (values: any) => {
    if (
      values.login == localStorage.getItem("login") &&
      values.password == localStorage.getItem("password")
    ) {
      history.push("/");
      setIsCorrectValue(true);
    } else {
      setIsCorrectValue(false);
    }
  };
  console.log(isCorrectValue);
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
          initialValues={formData}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <FieldInput name={"login"} validate={required} />
              <Password>
                <FieldInput name={"password"} validate={required} />
              </Password>
              <div>
                {!isCorrectValue && <div>Неверный логин или пароль</div>}
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
