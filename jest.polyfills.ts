/* eslint-disable @typescript-eslint/no-var-requires */
// jest.polyfills.js
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */
const { performance } = require('node:perf_hooks');
const { TextDecoder, TextEncoder, ReadableStream } = require('node:util');

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
    ReadableStream: { value: ReadableStream },
    performance: { value: performance },
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

const { clearImmediate } = require('node:timers');

Object.defineProperties(globalThis, {
    fetch: { value: fetch, writable: true },
    Blob: { value: Blob },
    File: { value: File },
    Headers: { value: Headers },
    FormData: { value: FormData },
    Request: { value: Request },
    Response: { value: Response },
    clearImmediate: { value: clearImmediate },
});