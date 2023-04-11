import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type JobTabProps = {
  jobDescription: string;
  howToApply: string;
  aboutUs: string;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function JobTabs({
  jobDescription,
  howToApply,
  aboutUs,
}: JobTabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minWidth: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Job Detail Tab"
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Apply" {...a11yProps(1)} />
          <Tab label="About Us" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {jobDescription}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {howToApply}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {aboutUs}
      </TabPanel>
    </Box>
  );
}
