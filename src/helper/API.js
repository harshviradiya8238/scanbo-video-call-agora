import axios from "axios";
const baseUrl = "https://api.scanbo.com/v16";
const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];

let localStorageNew;
if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorageNew = localStorage.getItem("token");
}
// localStorage.getItem("token");

export default axios.create({
    baseURL: baseUrl,
    timeout: 30000, // 30 secs
    headers: {
        "Content-Type": "application/json",
    },

    validateStatus: (status) => {
        // if (status === 401) {
        //     window.location.href = "/";
        //     localStorage.clear();
        // }
        return status;
    },
});
