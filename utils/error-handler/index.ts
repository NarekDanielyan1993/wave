import {
    COMMON_ERROR_TYPES,
    FILE_ERROR_TYPES,
    MONGO_ERRORS,
} from '@constant/error';
import type { NextApiResponse } from 'next';

export class HttpError extends Error {
    status: number;
    msg: string;
    name: string;
    title: string;

    constructor(
        message = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
        statusCode = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status,
        name = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.name,
        title = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.title
    ) {
        super();
        this.status = statusCode;
        this.msg = message;
        this.name = name;
        this.title = title;
    }
}

export class ValidationError extends HttpError {
    private errors: string[] | undefined;
    constructor(message?: string, status?: number, errors?: string[]) {
        super(
            message || COMMON_ERROR_TYPES.VALIDATION_ERROR.msg,
            status || COMMON_ERROR_TYPES.VALIDATION_ERROR.status,
            COMMON_ERROR_TYPES.VALIDATION_ERROR.name,
            COMMON_ERROR_TYPES.VALIDATION_ERROR.title
        );
        this.errors = errors;
    }
}

class MongoNetworkError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || MONGO_ERRORS.CONNECTION.msg,
            status || MONGO_ERRORS.CONNECTION.status,
            COMMON_ERROR_TYPES.MONGO_ERROR.name,
            COMMON_ERROR_TYPES.MONGO_ERROR.title
        );
    }
}

class MongoDuplicateError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || MONGO_ERRORS.DUPLICATE.msg,
            status || MONGO_ERRORS.DUPLICATE.status,
            COMMON_ERROR_TYPES.MONGO_ERROR.name,
            COMMON_ERROR_TYPES.MONGO_ERROR.title
        );
    }
}

export class NotFoundError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || COMMON_ERROR_TYPES.NOT_FOUND.msg,
            status || COMMON_ERROR_TYPES.NOT_FOUND.status,
            COMMON_ERROR_TYPES.NOT_FOUND.name,
            COMMON_ERROR_TYPES.NOT_FOUND.title
        );
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || COMMON_ERROR_TYPES.UNAUTHORIZED.msg,
            status || COMMON_ERROR_TYPES.UNAUTHORIZED.status,
            COMMON_ERROR_TYPES.UNAUTHORIZED.name,
            COMMON_ERROR_TYPES.UNAUTHORIZED.title
        );
    }
}

export class ForbiddenError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || COMMON_ERROR_TYPES.FORBIDDEN.msg,
            status || COMMON_ERROR_TYPES.FORBIDDEN.status,
            COMMON_ERROR_TYPES.FORBIDDEN.name,
            COMMON_ERROR_TYPES.FORBIDDEN.title
        );
    }
}

export class InternalServerError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
            status || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status,
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.name,
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.title
        );
    }
}

export class FileError extends HttpError {
    constructor(message?: string, status?: number) {
        super(
            message || COMMON_ERROR_TYPES.FILE_ERROR.msg,
            status || COMMON_ERROR_TYPES.FILE_ERROR.status,
            COMMON_ERROR_TYPES.FILE_ERROR.name,
            COMMON_ERROR_TYPES.FILE_ERROR.title
        );
    }
}

export class ErrorHandler {
    static handleError(error: any) {
        switch (error.name) {
            case COMMON_ERROR_TYPES.VALIDATION_ERROR.name: {
                const err = new ValidationError(
                    error.msg,
                    error.status,
                    error?.errors
                );
                return err;
            }
            case COMMON_ERROR_TYPES.NOT_FOUND.name: {
                const err = new NotFoundError(
                    error?.msg,
                    error.status || error?.status
                );
                return err;
            }
            case COMMON_ERROR_TYPES.FORBIDDEN.name: {
                const err = new ForbiddenError(
                    error?.msg,
                    error.status || error?.status
                );
                return err;
            }
            case COMMON_ERROR_TYPES.UNAUTHORIZED.name: {
                const err = new UnauthorizedError(
                    error?.msg,
                    error.status || error?.status
                );

                return err;
            }
            case COMMON_ERROR_TYPES.FILE_ERROR.name: {
                if (error?.code === FILE_ERROR_TYPES.LIMIT_FILE_SIZE.name) {
                    return new FileError(
                        FILE_ERROR_TYPES.LIMIT_FILE_SIZE.msg,
                        FILE_ERROR_TYPES.LIMIT_FILE_SIZE.status
                    );
                }
                const fileError = new FileError();
                return fileError;
            }
            case COMMON_ERROR_TYPES.MONGO_ERROR.name: {
                if (error.code === 11000) {
                    const err = new MongoDuplicateError(
                        MONGO_ERRORS.DUPLICATE.msg
                    );

                    return err;
                }
                if (error.name === MongoNetworkError.name) {
                    const err = new MongoNetworkError(
                        MONGO_ERRORS.CONNECTION.msg
                    );

                    return err;
                }
                const err = new HttpError(error.message || error.msg);

                return err;
            }
            default: {
                const err = new InternalServerError(
                    error?.msg,
                    error.status || error?.status
                );
                return err;
            }
        }
    }

    // static handleValidationError(err: ValidationError): ValidationError {
    //     const error = new ValidationError(
    //         err.message || err.msg,
    //         err.status || err?.status,
    //         err
    //     );

    //     return error;
    // }

    // static handleNotFound(err: NotFoundError): NotFoundError {
    //     const error = new NotFoundError(
    //         err.message || err?.msg,
    //         err.status || err?.status
    //     );

    //     return error;
    // }

    // static handleUnauthorized(err: UnauthorizedError): UnauthorizedError {
    //     const error = new UnauthorizedError(
    //         err.message || err?.msg,
    //         err.status || err?.status
    //     );

    //     return error;
    // }

    // static handleForbidden(err: ForbiddenError): ForbiddenError {
    //     const error = new ForbiddenError(
    //         err.message || err?.msg,
    //         err.status || err?.status
    //     );

    //     return error;
    // }

    // static handleInternalError(err: HttpError): HttpError {
    //     const error = new InternalServerError(
    //         err.message || err?.msg,
    //         err.status || err?.status
    //     );

    //     return error;
    // }

    // static handleMongoError(err: MongooseError): HttpError {
    //     if (err.code === 11000) {
    //         const error = new MongoDuplicateError(err.message || err.msg);

    //         return error;
    //     }
    //     if (err.name === MongoNetworkError.name) {
    //         const error = new MongoNetworkError(err.message || err.msg);

    //         return error;
    //     }
    //     const error = new HttpError(err.message || err.msg);

    //     return error;
    // }

    // static handleMulterError(err: FileError): FileError {
    //     if (err?.code === FILE_ERROR_TYPES.LIMIT_FILE_SIZE.name) {
    //         return new FileError(
    //             FILE_ERROR_TYPES.LIMIT_FILE_SIZE.msg,
    //             FILE_ERROR_TYPES.LIMIT_FILE_SIZE.status
    //         );
    //     }

    //     const fileError = new FileError(
    //         err.message || err?.msg,
    //         err.status || err?.status
    //     );

    //     return fileError;
    // }
}

export const handleError = (error: any, res: NextApiResponse) => {
    const err = ErrorHandler.handleError(error);

    res.status(
        err.status || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status
    ).json(err);
};

export const logError = (error: any, info: any) => {
    console.error('Error Logging: ', error);
    console.error('Error Info: ', info);
};
