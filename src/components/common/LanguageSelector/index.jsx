import React, { useContext } from "react";
import { LangContext } from "utils/LangContext";
import { GB, ES, FR, DE, NO } from "country-flag-icons/react/3x2";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const mainColour = "#7f57f1";

const LanguageSelector = (props) => {
  const [lang, setLang] = useContext(LangContext);

  let handleChangeSelect = (event) => {
    setLang(event.target.value);
    localStorage.setItem("lang", event.target.value);
    document.documentElement.setAttribute("lang", event.target.value);
  };

  return (
    <Box sx={{ minWidth: 60 }} className="language-selector">
      <FormControl variant="standard" fullWidth>
        <InputLabel id="language-select-input-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={lang}
          label="Language"
          onChange={handleChangeSelect}
          sx={{
            ":after": { borderBottomColor: mainColour },
          }}
        >
          <MenuItem value="en">
            <GB />
          </MenuItem>
          <MenuItem value="es">
            <ES />
          </MenuItem>
          <MenuItem value="fr">
            <FR />
          </MenuItem>
          <MenuItem value="de">
            <DE />
          </MenuItem>
          <MenuItem value="no">
            <NO />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default LanguageSelector;
