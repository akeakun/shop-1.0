
/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
// export const publicRoutes = [
//     "/"
// ]

/**
 * An array of routes that are not accessible to the public
 * these routes do require authentication
 * @type {string[]}
 */
export const privateRoutes = [
    "/account"
]

/**
 * An array of routes that are used for authentication
 * these routes will redirect logged in users to selected path
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/account"