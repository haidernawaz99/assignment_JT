// ** Icon imports
import Login from "mdi-material-ui/Login";
import Table from "mdi-material-ui/Table";
import CubeOutline from "mdi-material-ui/CubeOutline";
import HomeOutline from "mdi-material-ui/HomeOutline";
import FormatLetterCase from "mdi-material-ui/FormatLetterCase";
import AccountCogOutline from "mdi-material-ui/AccountCogOutline";
import CreditCardOutline from "mdi-material-ui/CreditCardOutline";
import AccountPlusOutline from "mdi-material-ui/AccountPlusOutline";
import AlertCircleOutline from "mdi-material-ui/AlertCircleOutline";
import GoogleCirclesExtended from "mdi-material-ui/GoogleCirclesExtended";
import BriefcaseOutline from "mdi-material-ui/BriefcaseOutline";

// ** Type import
import { VerticalNavItemsType } from "../../@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/admin",
    },
    {
      title: "Account Settings",
      icon: AccountCogOutline,
      path: "/admin/account-settings",
    },
    {
      sectionTitle: "Manage",
    },
    {
      title: "Jobs",
      icon: BriefcaseOutline,
      path: "/admin/manage/job",
    },
    {
      sectionTitle: "Pages",
    },
    {
      title: "Login",
      icon: Login,
      path: "/pages/login",
      openInNewTab: true,
    },
    {
      title: "Register",
      icon: AccountPlusOutline,
      path: "/pages/register",
      openInNewTab: true,
    },
    {
      title: "Error",
      icon: AlertCircleOutline,
      path: "/pages/error",
      openInNewTab: true,
    },
    {
      sectionTitle: "User Interface",
    },
    {
      title: "Typography",
      icon: FormatLetterCase,
      path: "/admin/typography",
    },
    {
      title: "Icons",
      path: "/admin/icons",
      icon: GoogleCirclesExtended,
    },
    {
      title: "Cards",
      icon: CreditCardOutline,
      path: "/admin/cards",
    },
    {
      title: "Tables",
      icon: Table,
      path: "/admin/tables",
    },
    {
      icon: CubeOutline,
      title: "Form Layouts",
      path: "/admin/form-layouts",
    },
  ];
};

export default navigation;
