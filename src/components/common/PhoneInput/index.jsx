import React, { useContext } from "react";
import { MuiTelInput } from "mui-tel-input";
import { styled } from "@mui/material/styles";
import { Controller } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { content } from "constants/DriverFormContent";
import { LangContext } from "utils/LangContext";

const mainColour = "#7f57f1";

const MuiTelInputStyled = styled(MuiTelInput)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: mainColour,
  },
});

const PhoneInput = ({ control, errors, defaultValue, onClick, show }) => {
  const [lang] = useContext(LangContext);

  if (!show) {
    return null;
  }

  return (
    <Controller
      name="tel"
      defaultValue=""
      control={control}
      render={({ field }) => (
        <MuiTelInputStyled
          {...field}
          defaultCountry={defaultValue}
          forceCallingCode
          id="tel"
          onClick={onClick}
          fullWidth
          focusOnSelectCountry
          preferredCountries={[
            "NO",
            "SE",
            "DK",
            "DE",
            "US",
            "GB",
            "ES",
            "FR",
            "NL",
            "AU",
            "FI",
            "PL",
          ]}
          variant="standard"
          label={content[lang]["phone"]}
          error={Boolean(errors.tel)}
          helperText={errors.tel ? content[lang]["phoneerror"] : ""}
          InputProps={
            errors.tel
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <ErrorRoundedIcon color="error" />
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
      )}
    />
  );
};

export default PhoneInput;
