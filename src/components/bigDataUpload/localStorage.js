const LOCAL_GET = (key = "") => localStorage.getItem(key);
const LOCAL_SET = (key = "", value = "") => localStorage.setItem(key, value);
const LOCAL_REMOVE = (key = "") => localStorage.removeItem(key);

export { LOCAL_GET, LOCAL_SET, LOCAL_REMOVE };
