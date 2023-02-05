import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#7f57f1",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#ccc",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#3a1d8c",
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.7,
          backgroundColor: "grey",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.8,
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
});

function ModalLayout({ children, open, handleClose }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>{children}</Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default ModalLayout;
