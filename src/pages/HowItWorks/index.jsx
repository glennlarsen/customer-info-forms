import Container from "components/Container";
import Head from "components/Head";
import Layout from "components/Layout/index";
import HowToDesciption from "components/HowToDesciption";
import { DRIVER_INFO_FORMS } from "constants/staticInfo";

function HowItWorks() {
  return (
    <Container>
      <Head
        page="How it Works?"
        description="This is how Customer info forms work. Follow the instructions here."
      />
      <Layout showHowItWorks="none" info={DRIVER_INFO_FORMS}>
        <HowToDesciption title="How it Works?" />
      </Layout>
    </Container>
  );
}

export default HowItWorks;
