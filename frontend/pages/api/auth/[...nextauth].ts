import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import nextAuth from "next-auth";
import NextAuth from "next-auth";
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

          console.log(credentials);

          const res = await client.mutate({
            mutation: LOGIN_QUERY,
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
      jwt: async ({ token, user }) => {
        //   console.log("jwt: ", token, user);
        //   user && (token.user = user);
        //   return token;
        // this is the first time the user is logging in.  Subsequent invocations will only contain the token parameter.
        console.log(`JWT`);
        if (user) {
          token.accessToken = user.accessToken;
          token.username = user.username;
        }
        return token;
      },
      session: async ({ session, token }) => {
        // Send properties to the client, like an access_token and user id from a provider.

        session.accessToken = token.accessToken as string;
        session.username = token.username as string;
        return session;
      },
    },

    session: {
      // jwt: true,
      maxAge: 20,
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
