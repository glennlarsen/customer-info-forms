import { useContext } from "react";
import FormTextField from "../FormTextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { content } from "constants/DriverFormContent";
import { LangContext } from "utils/LangContext";

const CityInput = ({ register, errors, onClick, show }) => {
  const [lang] = useContext(LangContext);

  if (!show) {
    return null;
  }

  return (
    <FormTextField
      variant="standard"
      label={content[lang]["city"]}
      type="text"
      name="city"
      id="city"
      onClick={onClick}
      fullWidth
      {...register("city")}
      error={Boolean(errors.city)}
      helperText={errors.city ? errors.city.message : ""}
      inputProps={{
        autoComplete: "chrome-off",
      }}
      InputProps={
        errors.city
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
  );
};

export default CityInput;
