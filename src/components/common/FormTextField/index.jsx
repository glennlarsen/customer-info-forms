import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const FormTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7f57f1",
    },
  });

export default FormTextField;