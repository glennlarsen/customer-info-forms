import Fab from "@mui/material/Fab";
import SettingsIcon from "@mui/icons-material/Settings";
import { TabletAndDesktop } from "components/common/ScreenViewSizes";

const fabStyles = {
  "&.MuiFab-root": {
    background: "#191919",
    color: "white",
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  "&:hover": {
    background: "#000000",
  },
};

//Tablet and desktop View only
function SettingsButton({ handleSettings }) {
  return (
    <TabletAndDesktop>
      <Fab
        size="small"
        sx={fabStyles}
        aria-label="settings"
        onClick={handleSettings}
      >
        <SettingsIcon fontSize="small" />
      </Fab>
    </TabletAndDesktop>
  );
}

export default SettingsButton;
