import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "utils/AuthContext";

import Container from "components/Container";
import Head from "components/Head";
import Layout from "components/Layout";
import AnswersForm from "components/forms/AnswersForm";
import AnswersForm2 from "components/forms/AnswersForm2";
import AnswersForm3 from "components/forms/AnswersForm3";
import { ANSWERS } from "constants/staticInfo";
import FormTitle from "components/FormTitle";
import {
  FLESLAND_1,
  FLESLAND_2,
  FLESLAND_3,
} from "constants/staticInfo";

function Answers() {
  const { formName } = useParams();
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
    if (!formName) {
      navigate("/forms");
    }
  }, []);

  return (
    <Container>
      <Head
        page="Answers"
        description="Showing answers that the client provides to the form"
      />
      <Layout backPage={`form/${formName}`} info={FormTitle(formName)}>
        {formName === FLESLAND_1 && <AnswersForm title={ANSWERS} />}
        {formName === FLESLAND_2 && <AnswersForm2 title={ANSWERS} />}
        {formName === FLESLAND_3 && <AnswersForm3 title={ANSWERS} />}
      </Layout>
    </Container>
  );
}

export default Answers;
