export const fetchAPI = async (path, options) => {
    const res = await fetch(`http://localhost:8000/${path}`, options);
    if (!res.ok) {
        alert('HTTP error: ' + res.status);
        throw new Error('HTTP Error: ' + res.status);
    }
    return res;
};

export default fetchAPI;
