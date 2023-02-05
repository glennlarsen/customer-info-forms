import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Container from "components/Container";
import Head from "components/Head";
import DriverInformation from "components/forms/DriverInformation";
import DriverInformation2 from "components/forms/DriverInformation2";
import DriverInformation3 from "components/forms/DriverInformation3";
import { content } from "constants/DriverFormContent";
import { LangContext } from "utils/LangContext";
import LanguageSelector from "components/common/LanguageSelector";
import Layout from "components/Layout";
import Logo from "components/Logo";
import { Mobile } from "components/common/ScreenViewSizes";
import { FLESLAND_1, FLESLAND_2, FLESLAND_3 } from "constants/staticInfo";
import FormTitle from "components/FormTitle";

function LiveForm() {
  const { formName } = useParams();
  const navigate = useNavigate();
  const [lang] = useContext(LangContext);

  useEffect(() => {
    if (!formName) {
      navigate("/forms");
    }
  }, []);

  return (
    <Container>
      <Head
        page="Liveform"
        description="Customer information form for clients to fill"
      />
      <Layout info={FormTitle(formName)} showSideBar="none">
        <LanguageSelector />
        <Mobile>
          <Logo info={FormTitle(formName)} />
        </Mobile>
        {formName === FLESLAND_1 && (
          <DriverInformation
            title={content[lang]["heading"]}
            confirmation={content[lang]["confirmation"]}
          />
        )}
        {formName === FLESLAND_2 && (
          <DriverInformation2
            title={content[lang]["heading"]}
            confirmation={content[lang]["confirmation"]}
          />
        )}
        {formName === FLESLAND_3 && (
          <DriverInformation3
            title={content[lang]["heading"]}
            confirmation={content[lang]["confirmation"]}
          />
        )}
      </Layout>
    </Container>
  );
}

export default LiveForm;
