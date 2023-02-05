import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { BASE_URL, DRIVERFORM1 } from "constants/apiKeys";
import useApi from "utils/useApi";
import MyLoader from "components/MyLoader";
import DeleteDriver from "utils/DeleteDriver";
import AlertMessage from "components/AlertMessage";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Header from "components/Header";
import { NO_ANSWERS } from "constants/staticInfo";
import SettingsButton from "components/common/SettingsButton";
import AnswersSettingsModal from "components/common/AnswersSettingsModal";
import { SettingsContext } from "utils/SettingsContext";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#7f57f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const FormTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7f57f1",
  },
});

function AnswersForm({ title }) {
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState("");
  const [deleted, setDeleted] = useState(false);
  const countryRef = useRef(null);
  const streetRef = useRef(null);
  const postalRef = useRef(null);
  const cityRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [upperCase, setUpperCase] = useContext(SettingsContext);
  let timer;

  useEffect(() => {
    //Refresh page every 10 seconds to get new form data if no answers are received//
    if (answers.length > 0) {
      return () => clearTimeout(timer);
    }
  }, []);

  const refreshPage = () => {
    navigate(0);
  };

  function copyEmail(e) {
    emailRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied Email!");
    setShow(true);
  }

  function copyPhone(e) {
    phoneRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied Phone Number!");
    setShow(true);
  }

  function copyCity(e) {
    cityRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied City!");
    setShow(true);
  }

  function copyPostal(e) {
    postalRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied Postal Code!");
    setShow(true);
  }

  function copyStreet(e) {
    streetRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied Street!");
    setShow(true);
  }

  function copyCountry(e) {
    countryRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied Country!");
    setShow(true);
  }

  const url = BASE_URL + DRIVERFORM1;
  const { answers, loading, error } = useApi(url);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Customer Info",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  const handleSettings = () => {
    openModal();
  };

  async function handleDelete(id) {
    const deleteDriv = await DeleteDriver(id);
    if (deleteDriv.success) {
      setDeleted(true);
      window.location.reload(true);
    } else {
      setDeleted(false);
    }
  }

  if (loading) {
    return (
      <div className="loaderContainer">
        <MyLoader />
        <span>Loading Answer...</span>
      </div>
    );
  }

  if (error) {
    return <div className="loaderContainer">An error occured!</div>;
  }

  if (answers.length < 1) {
    timer = setTimeout(() => refreshPage(), 10000);
    return (
      <ThemeProvider theme={theme}>
        <Box className="answers-form">
          <Header title={title} />
          <div className="no-answers">{NO_ANSWERS}</div>
          <button onClick={refreshPage} type="submit">
            Refresh
          </button>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <>
      {answers
        .sort((b, a) => a.id - b.id)
        .filter((item, idx) => idx < 1)
        .map((item) => {
          const { country, street, postal, city, phone, email, publishedAt } =
            item.attributes;
          const phoneFormated = phone ? phone.replace(/\s+/g, "") : " ";
          const countryExist = country ? country : " ";
          const streetExist = street ? street : " ";
          const postalExist = postal ? postal : " ";
          const cityExist = city ? city : " ";
          const emailExist = email ? email : " ";
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          };
          const formatDate = (value, locale = "nb-NO") => {
            return new Date(value).toLocaleDateString(locale, options);
          };

          return (
            <ThemeProvider theme={theme} key={item.id}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                className="answers-form"
              >
                <SettingsButton handleSettings={handleSettings} />
                <AnswersSettingsModal open={open} handleClose={closeModal} />
                <Header title={title} />
                <span className="last-received">
                  <strong>Last Answer: </strong>
                  {answers ? (
                    formatDate(publishedAt)
                  ) : (
                    <div>No answers yet!</div>
                  )}
                </span>
                <Tooltip title="Click to Copy">
                  <FormTextField
                    onClick={copyCountry}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            sx={{ boxShadow: "none" }}
                            onClick={copyCountry}
                          >
                            <ContentCopyIcon
                              sx={{ height: ".8em", width: ".8em" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    label="Country"
                    type="text"
                    value={
                      upperCase
                        ? countryExist.toUpperCase()
                        : countryExist[0].toUpperCase() +
                          countryExist.substring(1).toLowerCase()
                    }
                    inputRef={countryRef}
                  />
                </Tooltip>
                <Tooltip title="Click to Copy">
                  <FormTextField
                    onClick={copyStreet}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            sx={{ boxShadow: "none" }}
                            onClick={copyStreet}
                          >
                            <ContentCopyIcon
                              sx={{ height: ".8em", width: ".8em" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    label="Street"
                    type="text"
                    value={
                      upperCase
                        ? streetExist.toUpperCase()
                        : streetExist[0].toUpperCase() +
                          streetExist.substring(1).toLowerCase()
                    }
                    inputRef={streetRef}
                  />
                </Tooltip>
                <Box gap={2} display="flex">
                  <Tooltip title="Click to Copy">
                    <FormTextField
                      onClick={copyPostal}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              color="primary"
                              sx={{ boxShadow: "none" }}
                              onClick={copyPostal}
                            >
                              <ContentCopyIcon
                                sx={{ height: ".8em", width: ".8em" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      label="Postal Code"
                      type="text"
                      value={
                        upperCase
                          ? postalExist.toUpperCase()
                          : postalExist[0].toUpperCase() +
                            postalExist.substring(1).toLowerCase()
                      }
                      inputRef={postalRef}
                    />
                  </Tooltip>
                  <Tooltip title="Click to Copy">
                    <FormTextField
                      onClick={copyCity}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              color="primary"
                              sx={{ boxShadow: "none" }}
                              onClick={copyCity}
                            >
                              <ContentCopyIcon
                                sx={{ height: ".8em", width: ".8em" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      label="City"
                      type="text"
                      fullWidth
                      value={
                        upperCase
                          ? cityExist.toUpperCase()
                          : cityExist[0].toUpperCase() +
                            cityExist.substring(1).toLowerCase()
                      }
                      inputRef={cityRef}
                    />
                  </Tooltip>
                </Box>
                <Tooltip title="Click to Copy">
                  <FormTextField
                    onClick={copyPhone}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            sx={{ boxShadow: "none" }}
                            onClick={copyPhone}
                          >
                            <ContentCopyIcon
                              sx={{ height: ".8em", width: ".8em" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    label="Phone Number"
                    type="text"
                    value={phoneFormated ? phoneFormated : ""}
                    inputRef={phoneRef}
                  />
                </Tooltip>
                <Tooltip title="Click to Copy">
                  <FormTextField
                    onClick={copyEmail}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            sx={{ boxShadow: "none" }}
                            onClick={copyEmail}
                          >
                            <ContentCopyIcon
                              sx={{ height: ".8em", width: ".8em" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    label="Email"
                    type="email"
                    value={
                      upperCase
                        ? emailExist.toUpperCase()
                        : emailExist[0].toUpperCase() +
                          emailExist.substring(1).toLowerCase()
                    }
                    inputRef={emailRef}
                  />
                </Tooltip>
                <button onClick={refreshPage} type="submit">
                  Refresh
                </button>
                <span
                  onClick={() => confirmDelete(item.id)}
                  className="btn-reset btn-delete"
                >
                  Delete answer
                </span>
                {copySuccess && show ? (
                  <Collapse in={show}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setShow(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      severity="success"
                    >
                      {copySuccess}
                    </Alert>
                  </Collapse>
                ) : (
                  <div className="copy-alert"></div>
                )}
                {deleted && (
                  <AlertMessage
                    width="100px"
                    variant="info"
                    title="Deleted"
                    message="Driver Info successfully deleted"
                  />
                )}
              </Box>
            </ThemeProvider>
          );
        })}
    </>
  );
}

export default AnswersForm;
