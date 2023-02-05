import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Header from "components/Header";
import {
  FLESLAND_1,
  FLESLAND_2,
  FLESLAND_3,
} from "constants/staticInfo";

import { useNavigate, useParams } from "react-router-dom";

function FormDetails({ title }) {
  const navigate = useNavigate();
  const { formName } = useParams();

  const onClickLiveForm = () => {
    if (formName === FLESLAND_1) {
      navigate(`/liveForm/${FLESLAND_1}`);
    } else if (formName === FLESLAND_2) {
      navigate(`/liveForm/${FLESLAND_2}`);
    } else if (formName === FLESLAND_3) {
      navigate(`/liveForm/${FLESLAND_3}`);
    } else if (!formName) {
      navigate("/forms");
    }
  };

  const onClickAnswers = () => {
    if (formName === FLESLAND_1) {
      navigate(`/answers/${FLESLAND_1}`);
    } else if (formName === FLESLAND_2) {
      navigate(`/answers/${FLESLAND_2}`);
    } else if (formName === FLESLAND_3) {
      navigate(`/answers/${FLESLAND_3}`);
    } else if (!formName) {
      navigate("/forms");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Header title={title} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Paper onClick={onClickLiveForm} className="box">
            Live Form
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper onClick={onClickAnswers} className="box">
            Answers
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper className="box box-inactive">Edit Form</Paper>
        </Grid>
        <Grid xs={6}>
          <Paper className="box box-inactive">Delete Form</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormDetails;
