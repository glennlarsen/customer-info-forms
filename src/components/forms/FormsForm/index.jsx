import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import {
  FLESLAND_1,
  FLESLAND_2,
  FLESLAND_3,
  FLESLAND_1_TITLE,
  FLESLAND_2_TITLE,
  FLESLAND_3_TITLE,
} from "constants/staticInfo";

const FormsForm = ({ title }) => {
  const navigate = useNavigate();

  const clickForm1 = () => {
    navigate(`/form/${FLESLAND_1}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Header title={title} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Paper onClick={clickForm1} className="box">
            {FLESLAND_1_TITLE}
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper className="box box-inactive">
            {FLESLAND_2_TITLE}
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper className="box box-inactive">
            {FLESLAND_3_TITLE}
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper className="box box-inactive">My Form 4</Paper>
        </Grid>
        <Grid xs={6}>
          <Paper className="box-new box-inactive">New form</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormsForm;
