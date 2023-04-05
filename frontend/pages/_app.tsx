import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";

import "./global.css";

// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** Config Imports
import themeConfig from "../configs/themeConfig";

// ** Component Imports
import UserLayout from "../layouts/UserLayout";
import ThemeComponent from "..//@core/theme/ThemeComponent";

// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from "../@core/context/settingsContext";

// ** Utils Imports
import { createEmotionCache } from "../@core/utils/create-emotion-cache";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

export default function MyApp({
  Component,
  pageProps,
  session,
  emotionCache = clientSideEmotionCache,
}) {
  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ApolloProvider client={client}>
        <CacheProvider value={emotionCache}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#722ED1",
                colorInfo: "#722ed1",
              },
            }}
          >
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      {getLayout(<Component {...pageProps} />)}
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </ConfigProvider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
