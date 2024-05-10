import { IncomingHttpHeaders } from 'http2';
import {
    DefaultBodyType,
    HttpResponse,
    JsonBodyType,
    StrictRequest,
    http,
} from 'msw';
import { setupServer } from 'msw/node';

export const createServer = (
    handlerConfig: {
        path: string;
        method: keyof typeof http;
        headers?: IncomingHttpHeaders;
        res: (req: StrictRequest<DefaultBodyType>) => JsonBodyType;
    }[]
) => {
    const handlers = handlerConfig.map(config =>
        http[(config.method.toLowerCase() as keyof typeof http) || 'get'](
            config.path,
            ({ request }) =>
                HttpResponse.json(config.res(request), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
        )
    );

    const server = setupServer(...handlers);

    beforeAll(async () => {
        server.listen();
    });

    afterEach(async () => {
        server.resetHandlers();
    });

    afterAll(async () => {
        server.close();
    });
};
