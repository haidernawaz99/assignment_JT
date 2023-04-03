import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import nextAuth from "next-auth";
import NextAuth from "next-auth";
import { decode, getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../graphql/apollo-client";

const LOGIN_QUERY = gql`
  query login($loginCredentials: AuthLoginInput!) {
    login(loginCredentials: $loginCredentials) {
      accessToken
      username
    }
  }
`;

const NEW_TOKEN = gql`
  query generateNewToken {
    generateNewToken {
      username
      accessToken
    }
  }
`;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    debug: true,
    // Configure one or more authentication providers

    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "JWTAuth",

        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "haidernawaz99",
          },
          password: { label: "Password", type: "password" },
        },

        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)

          const res = await client.query({
            query: LOGIN_QUERY,
            variables: {
              loginCredentials: {
                username: credentials.username,
                password: credentials.password,
              },
            },
          });

          const user = await res.data.login;

          // If no error and we have user data, return it
          if (!res.errors && user) {
            return user;
          }
          // Return null if user data could not be retrieved

          return null;
        },
      }),
    ],

    callbacks: {
      // jwt callback is where we decide whether the token needs to be refreshed.
      // session callback is where we specify what will be available on the client with useSession() or getSession().
      // https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696
      // https://authjs.dev/guides/basics/refresh-token-rotation

      jwt: async ({ token, user }) => {
        //   console.log("jwt: ", token, user);
        //   user && (token.user = user);
        //   return token;
        // this is the first time the user is logging in.  Subsequent invocations will only contain the token parameter.

        if (user) {
          // first time logging in... just create and return the token
          token.accessToken = user.accessToken;
          token.username = user.username;
          token.expirationAccessToken = user.expirationAccessToken;

          return token;
        } else if ((token.expirationAccessToken as number) - Date.now() > 3) {
          // this Token will not expire for at least 3 seconds
          console.log("Token will not expire for at least 3 seconds");
          return token;
        }

        // API Call for new token

        console.log("API Call for new token");
        console.log(token);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token.accessToken);

        var graphql = JSON.stringify({
          query:
            "query generateNewToken {\r\n  generateNewToken {    \r\n    username\r\n expirationAccessToken \r\n   accessToken\r\n  }\r\n}\r\n",
          variables: {},
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
          redirect: "follow",
        };

        const res = await fetch(
          "http://localhost:3000/graphql",
          requestOptions as any
        );
        const resJSON = await res.json();
        console.log("~~~~~~");
        console.log(resJSON);
        // console.log(res.data);

        token.accessToken = resJSON.data.generateNewToken.accessToken as string;
        token.username = resJSON.data.generateNewToken.username as string;
        token.expirationAccessToken = resJSON.data.generateNewToken
          .expirationAccessToken as string;

        return token;
      },
      session: async ({ session, token }) => {
        // Send properties to the client, like an access_token and user id from a provider.
        console.log(`SES`);

        // const res = await client.query({
        //   query: NEW_TOKEN,
        // });

        // if (token.username) {
        //   // API Call for new token
        //   console.log("API Call for new token");
        //   var myHeaders = new Headers();
        //   myHeaders.append("Content-Type", "application/json");
        //   myHeaders.append("Authorization", "Bearer " + token.accessToken);

        //   var graphql = JSON.stringify({
        //     query:
        //       "query generateNewToken {\r\n  generateNewToken {    \r\n    username\r\n    accessToken\r\n  }\r\n}\r\n",
        //     variables: {},
        //   });
        //   var requestOptions = {
        //     method: "POST",
        //     headers: myHeaders,
        //     body: graphql,
        //     redirect: "follow",
        //   };

        //   const res = await fetch(
        //     "http://localhost:3000/graphql",
        //     requestOptions as any
        //   );
        //   const resJSON = await res.json();
        //   console.log("~~~~~~");
        //   console.log(resJSON);
        //   // console.log(res.data);

        //   session.accessToken = resJSON.data.generateNewToken
        //     .accessToken as string;
        //   session.username = resJSON.data.generateNewToken.username as string;
        // } else {
        //   session.accessToken = token.accessToken as string;
        //   session.username = token.username as string;
        // }

        session.accessToken = token.accessToken as string;
        session.username = token.username as string;
        session.expirationAccessToken = token.expirationAccessToken as string;

        // if user is logged in

        return session;
      },
    },

    jwt: {
      maxAge: 59,
    },
    session: {
      // jwt: true,
      maxAge: 59,
    },
  });
}

// export const authOption2s = {
//     const options = {
//         providers: [
//             CredentialsProvider({
//                 name: "Credentials",
//                 credentials: {
//                     username: {
//                         label: "Username",
//                         type: "text"
//                     },
//                     password: {
//                         label: "Password",
//                         type: "password"
//                     }
//                 },
//                 session: {
//                     jwt: true,
//                     maxAge: 30 * 24 * 60 * 60 // the session will last 30 days
//                 },
//                 authorize: async (credentials) => {
//                     const tokenUrl = "http://192.168.0.8:8081/api/auth/token"
//                     const token = await fetch(tokenUrl, {
//                         method: "POST",
//                         mode: "cors",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify({
//                             username: credentials.username,
//                             password: credentials.password
//                         })
//                     })
//                         .then(res => res.json())
//                     console.log("token: ", token)
//                     if (token) {
//                         const userUrl = "http://192.168.0.8:8081/admin/user/username/" + credentials.username;
//                         const user = await fetch(userUrl, {
//                             method: "GET",
//                             mode: "cors",
//                             headers: {
//                                 "Content-Type": "application/json",
//                                 "Authorization": "Bearer " + token.access_token
//                             }
//                         }).then(res => res.json())

//                         return {
//                             token,
//                             user
//                         };
//                     } else {
//                         return null;
//                     }
//                 }
//             }),
//         ],
//         session: {
//             jwt: true
//         },
//         pages: {
//             signIn: "/login",
//         },
//         secret: "TEST",
//         callbacks: {
//             async jwt({ token, user }) {
//                 // Initial call
//                 if (user) {
//                     return {
//                         accessToken: user.token.access_token,
//                         accessTokenExpires: Date.now() + user.token.expire_time * 1000,
//                         refreshToken: user.token.refresh_token,
//                         user: user.user,
//                     }
//                 }
//                 // Subsequent calls
//                 return token;
//             },
//             async session(session) {
//                 session.name = session.token.user.fullName
//                 session.accessToken = session.token.accessToken
//                 session.refreshToken = session.token.refreshToken
//                 return session;
//             }
//         }
//     }
//   };
