/** Material UI, Remix example in TypeScript, GitHub repository, https://github.com/mui/material-ui/tree/master/examples/material-ui-remix-ts */
/** Remix Software Inc., Remix Indie Stack, GitHub repository, https://github.com/remix-run/examples/blob/main/_official-blog-tutorial */

import { useContext } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json }from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { Analytics } from "@vercel/analytics/react";
import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import ClientStyleContext from "./src/mui/ClientStyleContext";
import { store } from "./src/store";
import Page from "./src/route/Page";
import { Provider } from "react-redux";

import style from "~/src/styles/index.css?url";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * Remix Software Inc., Remix Guide Environment Variables, https://remix.run/docs/en/main/guides/envvars
 */ 
export async function loader() {
  return json({
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      REACT_APP_KAKAO_REST_API_KEY: process.env.REACT_APP_KAKAO_REST_API_KEY,
      REACT_APP_KAKAO_REDIRECT_URL: process.env.REACT_APP_KAKAO_REDIRECT_URL,
    },
  });
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" },
  { rel: "stylesheet", href: style },
];

export const Layout = withEmotionCache(({ children, title }: LayoutProps, emotionCache) => {

  /* Env Variable */
  const data = useLoaderData<typeof loader>();

  /* Material UI */
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);  
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
});

export default function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  )
}
