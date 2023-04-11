// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import BriefcaseOutline from "mdi-material-ui/BriefcaseOutline";
import AccountTieOutline from "mdi-material-ui/AccountTieOutline";
import ListStatus from "mdi-material-ui/ListStatus";
import WrenchClock from "mdi-material-ui/WrenchClock";
import TableCog from "mdi-material-ui/TableCog";

// ** Type import
import { VerticalNavItemsType } from "../../@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/admin/dashboard",
    },
    // {
    //   title: "Account Settings",
    //   icon: AccountCogOutline,
    //   path: "/admin/account-settings",
    // },
    {
      sectionTitle: "Manage",
    },
    {
      title: "Jobs",
      icon: BriefcaseOutline,
      path: "/admin/manage/job",
    },
    {
      title: "Affiliates",
      icon: AccountTieOutline,
      path: "/admin/manage/affiliates",
    },
    {
      title: "Categories",
      icon: ListStatus,
      path: "/admin/config/categories",
    },

    // {
    //   title: "Expiration",
    //   icon: WrenchClock,
    //   path: "/admin/config/expiration",
    // },
    {
      title: "User View",
      icon: TableCog,
      path: "/admin/config/user-view",
    },

    // {
    //   sectionTitle: "Pages",
    // },
    // {
    //   title: "Login",
    //   icon: Login,
    //   path: "/pages/login",
    //   openInNewTab: true,
    // },
    // {
    //   title: "Register",
    //   icon: AccountPlusOutline,
    //   path: "/pages/register",
    //   openInNewTab: true,
    // },
    // {
    //   title: "Error",
    //   icon: AlertCircleOutline,
    //   path: "/pages/error",
    //   openInNewTab: true,
    // },
    // {
    //   sectionTitle: "User Interface",
    // },
    // {
    //   title: "Typography",
    //   icon: FormatLetterCase,
    //   path: "/admin/typography",
    // },
    // {
    //   title: "Icons",
    //   path: "/admin/icons",
    //   icon: GoogleCirclesExtended,
    // },
    // {
    //   title: "Cards",
    //   icon: CreditCardOutline,
    //   path: "/admin/cards",
    // },
    // {
    //   title: "Tables",
    //   icon: Table,
    //   path: "/admin/tables",
    // },
    // {
    //   icon: CubeOutline,
    //   title: "Form Layouts",
    //   path: "/admin/form-layouts",
    // },
  ];
};

export default navigation;
