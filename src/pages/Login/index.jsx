import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "utils/AuthContext";

import Container from "components/Container";
import LoginForm from "components/forms/LoginForm";
import Head from "components/Head";
import Layout from "components/Layout";
import Logo from "components/Logo";
import { Mobile } from "components/common/ScreenViewSizes";
import { DRIVER_INFO_FORMS } from "constants/staticInfo";

function Login() {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/forms");
    }
  }, []);

  return (
    <Container>
      <Head
        page="Login"
        description="Login to start using Customer info Forms"
      />
      <Layout info={DRIVER_INFO_FORMS} showSideBar="none">
        <Mobile>
          <Logo info={DRIVER_INFO_FORMS} />
        </Mobile>
        <LoginForm title="Login" info={DRIVER_INFO_FORMS} />
      </Layout>
    </Container>
  );
}

export default Login;
