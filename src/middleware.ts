export { default } from "next-auth/middleware"

export const config = { matcher: ["/sprints", "/examples", "/screen/:path*"] }
