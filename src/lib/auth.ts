import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/drive.file email profile",
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: any) {
            session.accessToken = token.accessToken
            return session
        },
        async jwt({ token, account }: any) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
    },
}

export const handler = NextAuth(authOptions)
