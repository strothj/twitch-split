// import axios from 'axios';
import 'isomorphic-fetch';

export const TWITCH = {
  CLIENT_ID: 'hzr8tf9f8ddrcnwv991g0p8njmgc2y',
  ACCEPT: 'application/vnd.twitchtv.v5+json',
  SEARCH: 'https://api.twitch.tv/kraken/search/streams',
  LIMIT: 10,
};

export const STREAM_SEARCH_SUCCESS = 'STREAM_SEARCH_SUCCESS';
export const streamSearchSuccess = (query, result) => ({
  type: STREAM_SEARCH_SUCCESS,
  query,
  result,
});

export const STREAM_SEARCH_ERROR = 'STREAM_SEARCH_ERROR';
export const streamSearchError = (query, error) => ({
  type: STREAM_SEARCH_ERROR,
  query,
  error,
});

export const STREAM_SEARCH_PENDING = 'STREAM_SEARCH_PENDING';
export const streamSearchPending = query => ({
  type: STREAM_SEARCH_PENDING,
  query,
});

export const streamSearch = (rawQuery) => {
  const query = rawQuery.toLowerCase();

  return (dispatch, getState) => {
    const { queries } = getState();

    // If a previous search was already dispatched for the provided query, do
    // nothing.
    if (queries[query]) return Promise.resolve();

    // Add an empty query object to prevent multiple simultaneous searches for
    // the same stream.
    dispatch(streamSearchPending(query));
    return fetch(`${TWITCH.SEARCH}?query=${encodeURIComponent(query)}&limit=${TWITCH.LIMIT}`, {
      headers: {
        'Client-ID': TWITCH.CLIENT_ID,
        Accept: TWITCH.ACCEPT,
      },
    })
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(response => response.json())
    .then(data => dispatch(streamSearchSuccess(query, data)))
    .catch(error => dispatch(streamSearchError(query, error)));
  };
};
