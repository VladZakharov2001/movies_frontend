import { TextField } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Error } from "./styled";
const FieldInput = ({
  name,
  validate,
}: {
  name: string;
  validate: (value: string) => string;
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <div>
          {<div>{t(`authorization.${name}`)}</div>}
          <TextField
            {...input}
            type="text"
            placeholder={name}
            variant="outlined"
          />
          <Error>
            {(meta.error || meta.submitError) && meta.touched && (
              <span>{meta.error || meta.submitError}</span>
            )}
          </Error>
        </div>
      )}
    </Field>
  );
};
export default FieldInput;
