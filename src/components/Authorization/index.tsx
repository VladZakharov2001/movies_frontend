import React, { ReactElement, useState } from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";
import FieldInput from "./components/FieldInput/index";
import logo from "./logo.svg";
import { Container, Logo, ButtonCome, Password } from "./styles";
import { Button } from "@material-ui/core";
import { FORM_ERROR } from "final-form";
import { isValidUser } from "../../services/FillandisValidateData";
import { useTranslation } from "react-i18next";
const Authorization = (props: { isLogged: (value: boolean) => void }) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const required = (value: string): string => {
    return value ? "" : t("authorization.emptyFiled");
  };

  const onSubmit = (values: any) => {
    if (isValidUser(values.login, values.password)) {
      return { [FORM_ERROR]: t("authorization.incorrectData") };
    }
    props.isLogged(true);
    history.push("/");
  };

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
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
                    {t("authorization.logIn")}
                  </Button>
                </ButtonCome>
              </div>
            </form>
          )}
        />
      </Container>
      <Button variant="outlined" onClick={() => changeLanguage("ru")}>
        ru
      </Button>
      <Button variant="outlined" onClick={() => changeLanguage("en")}>
        en
      </Button>
    </div>
  );
};
export default Authorization;
