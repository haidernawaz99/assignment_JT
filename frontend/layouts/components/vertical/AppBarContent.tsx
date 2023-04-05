// ** React Imports
import { useState } from "react";
// ** MUI Imports
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports
import Menu from "mdi-material-ui/Menu";

// ** Type Import
import { Settings } from "../../../@core/context/settingsContext";

// ** Components
import ModeToggler from "../../../@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../@core/layouts/components/shared-components/UserDropdown";
import NotificationDropdown from "../../../@core/layouts/components/shared-components/NotificationDropdown";
import AdminSearch from "../../../components/admin/AdminSearch";

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  // ** States for Search
  const [globalSearch, setGlobalSearch] = useState(true);
  const [searchBarOption, setSearchBarOption] = useState<string>("Category");
  const onSwitchChange = (checked: boolean) => {
    setGlobalSearch(checked);
    console.log(`switch to ${checked}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      >
        {hidden ? (
          <IconButton
            color="inherit"
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        {/* <TextField
          size="small"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify fontSize="small" />
              </InputAdornment>
            ),
          }}
        /> */}

        <Box sx={{ minWidth: hiddenSm ? 0.05 : "50vw" }}>
          <AdminSearch
            setSearch={() => {}}
            categoryEnabled={true}
            searchBarOption={searchBarOption}
            setSearchBarOption={setSearchBarOption}
            globalSearch={globalSearch}
            enableLocalSearch={false}
            onSwitchChange={onSwitchChange}
          />
        </Box>
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
