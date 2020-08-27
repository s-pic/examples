import axios from 'axios';

export const fetchJson = async url => {
    let jsonData;
    const response = await axios.get(url, {
        mode: 'no-cors',
        timeout: 10000 // in the real httpClient, we also use a default timeout
    });
    jsonData = response.data;

    return jsonData
};


export class NetworkError extends Error {
    /**
     * A custom error class indicatong a network error
     * @param {string} message
     * @param {string} url
     */
    constructor(url, message = 'Network problem encountered, please check your network') {
        super(`Msg: ${message} Url: ${url}`);
        // Set the prototype explicitly, see https://stackoverflow.com/a/41429145/5418403
        Object.setPrototypeOf(this, Error.prototype);
    }
}

/**
 * Wraps magic constants (strings used by axios internally)
 */
export const axiosErrorMessages = {
    /**
     * axios seems to use this message when a network error occurs,
     * see https://github.com/axios/axios/issues/383#issue-166464329
     */
    NETWORK_ERROR: 'Network Error'
}