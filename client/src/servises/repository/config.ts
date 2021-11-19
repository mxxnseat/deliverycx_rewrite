export const config = {
    REACT_APP_API_URL: process.env.NODE_ENV === "development" ? "http://localhost:6661" : "/api"
}
export const mock = {
    REACT_APP_API_URL:"http://localhost:8765"
}