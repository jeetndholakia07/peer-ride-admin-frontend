const baseURL = "peerRide/api";
const adminURL = `${baseURL}/admin`;
const authURL = `${baseURL}/auth`

export const api = {
    auth: {
        login: `${authURL}/login-admin`
    },
    admin: {
        dashboardMaster: `${adminURL}/dashboard-master`,
        rides: `${adminURL}/rides`,
        users: `${adminURL}/users`,
        createFrequentRide: `${adminURL}/frequent-rides`,
        verifyUser: `${adminURL}/verify-user`,
        frequentRides: `${adminURL}/frequent-rides`
    },
    public: {
        autoComplete: `${publicURL}/auto-complete`,
    }
}