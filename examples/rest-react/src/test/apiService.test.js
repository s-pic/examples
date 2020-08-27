import {rest} from 'msw';
import {server} from '../mocks/server'

import {fetchJson} from '../apiService'

describe('apiService', function () {
    describe('fetchJson', () => {
        it('given an URL, it asynchronously returns a json', async () => {
            // SETUP: intercept requests with dummy json
            let url = 'https://test.io';
            const resolver = (req, res, ctx) => res(ctx.json({a: 'b'}));
            server.use(rest.get(url, resolver));

            // ACT: invoke api service
            const json = await fetchJson(url);

            // ASSERT: make sure actual return equals asserted return
            expect(json).toEqual({a: 'b'})
        });
        it('handles a network error', async () => {
            // SETUP: intercept requests to throw a network error
            let url = 'https://test.io';
            // axios seems to use this message when a network error occurs, see https://github.com/axios/axios/issues/383#issue-166464329
            const axiosErrorMessage = 'Network Error'
            const resolver = (req, res, ctx) => res.networkError(axiosErrorMessage);
            server.use(rest.get(url, resolver));

            // ACT: invoke api service, catch error
            let error;
            try {
                await fetchJson(url);
            } catch (e) {
                error = e;
            }

            // ASSERT: make sure actual return equals asserted return
            expect(error.message).toEqual(axiosErrorMessage)
        })
    })
});