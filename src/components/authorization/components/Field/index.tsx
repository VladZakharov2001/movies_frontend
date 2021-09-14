import { TextField } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Form, Field } from "react-final-form";
import { Error } from "./styled";
const FieldInput = ({
  name,
  validate,
}: {
  name: string;
  validate: (value: string) => string;
}): ReactElement => {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <div>
          <div>{name}</div>
          <TextField
            {...input}
            type="text"
            placeholder={name}
            variant="outlined"
          />
          <Error>{meta.error && meta.touched && <div>{meta.error}</div>}</Error>
        </div>
      )}
    </Field>
  );
};
export default FieldInput;
