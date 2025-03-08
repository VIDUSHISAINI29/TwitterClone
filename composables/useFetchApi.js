import useAuth from "./useAuth.js";

export default (url, options = {}) => {
    const { useAuthToken } = useAuth(); // Call useAuth() first
    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${useAuthToken().value}`
        }
    });
};
