// ** React Import
import { ReactNode } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Type Import
import { Settings } from "../../../../../@core/context/settingsContext";

// ** Configs
import themeConfig from "../../../../../configs/themeConfig";

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
  verticalNavMenuBranding?: (props?: any) => ReactNode;
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: "normal",
  textTransform: "uppercase",
  color: theme.palette.text.primary,
  transition: "opacity .25s ease-in-out, margin .25s ease-in-out",
}));

const StyledLink = styled("a")({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  // ** Hooks
  const theme = useTheme();

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href="/admin/dashboard" passHref>
          <StyledLink>
            <svg
              id="logo-86"
              width="30"
              height="25"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.69181 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z"
                fill="#A16EFD"
                stopColor="#A16EFD"
              ></path>
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5.16562e-07C10 1.31322 9.74135 2.61358 9.2388 3.82683C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966 5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 5.4439e-06 10L5.00679e-06 20C2.62644 20 5.22716 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 -3.81469e-06L10 5.16562e-07Z"
                fill="#A16EFD"
                stopColor="#A16EFD"
              ></path>
            </svg>
            {/* <svg
              width={30}
              height={25}
              version="1.1"
              viewBox="0 0 30 23"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Artboard" transform="translate(-95.000000, -51.000000)">
                  <g id="logo" transform="translate(95.000000, 50.000000)">
                    <path
                      id="Combined-Shape"
                      fill={theme.palette.primary.main}
                      d="M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z"
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646"
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162"
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="22.7419355 8.58870968 30 12.7417372 30 16.9537453"
                      transform="translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) "
                    />
                    <polygon
                      id="Rectangle"
                      opacity="0.077704"
                      fill={theme.palette.common.black}
                      points="22.7419355 8.58870968 30 12.6409734 30 15.2601969"
                      transform="translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) "
                    />
                    <path
                      id="Rectangle"
                      fillOpacity="0.15"
                      fill={theme.palette.common.white}
                      d="M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z"
                    />
                    <path
                      id="Rectangle"
                      fillOpacity="0.35"
                      fill={theme.palette.common.white}
                      transform="translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) "
                      d="M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z"
                    />
                  </g>
                </g>
              </g>
            </svg> */}
            <HeaderTitle variant="h6" sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
