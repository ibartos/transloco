export const NAVIGATION_PATH = {
    LOGIN: "login",
    PRE_MATCH: Object.assign("pre-match", {
        OVERVIEW: "overview",
    }),
} as const;

// Example usage:
//path: `${NAVIGATION_PATH.PRE_MATCH}/:${NAVIGATION_PARAM.SPORT_ID}/${NAVIGATION_PATH.PRE_MATCH.OVERVIEW}`,
