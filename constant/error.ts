import { ALLOWED_FILE_TYPES } from './file';

export const AUTH_ERRORS_MESSAGES = {
    AUTH_FAILED: 'Authentication failed.',
};

export const USER_ERROR_TYPES = {
    EMAIL_EXISTS: {
        status: 401,
        msg: 'User with this email already exist.',
    },
    INVALID_CREDENTIALS: {
        status: 401,
        msg: 'Credentials are not valid',
    },
    USER_NOT_FOUND: {
        msg: 'User not found',
        status: 401,
    },
    WRONG_PASSWORD: {
        msg: 'Please enter correct password.',
        status: 401,
    },
};

// MONGO ERRORS

export const MONGO_ERRORS = {
    DUPLICATE: {
        msg: 'User with this mail already exist.',
        status: 401,
    },
    CONNECTION: {
        msg: 'Could not connect to the database',
        status: 409,
    },
};

// DEFAULT ERRORS

export const COMMON_ERROR_TYPES = {
    NOT_FOUND: {
        msg: 'Sorry, the requested resource could not be found.',
        status: 404,
        name: 'NotFoundError',
        title: 'Not Found Error',
    },
    FORBIDDEN: {
        msg: 'You are not authorized to access this resource.',
        status: 401,
        name: 'ForbiddenError',
        title: 'Forbidden Error',
    },
    UNAUTHORIZED: {
        msg: 'You are not authorized to perform this action.',
        status: 403,
        name: 'UnauthorizedError',
        title: 'Unauthorized Error',
    },
    VALIDATION_ERROR: {
        msg: 'Oops! There was an error with your request. Please check your input.',
        status: 400,
        name: 'ValidationError',
        title: 'Validation Error',
        types: {
            zod: {
                name: 'ZodError',
            },
        },
    },
    INTERNAL_SERVER_ERROR: {
        msg: 'Oops! Something went wrong. Please try again later.',
        status: 500,
        name: 'InternalServerError',
        title: 'Internal Server Error',
    },
    FILE_ERROR: {
        msg: 'An unexpected error occurred during file upload. Please try again later.',
        status: 500,
        name: 'MulterError',
        title: 'File Upload Error',
    },
    MONGO_ERROR: {
        msg: 'Oops! Something went wrong with the database. Please try again later.',
        status: 500,
        name: 'MongoServerError',
        title: 'Internal Server Error',
    },
};

export const FILE_ERROR_TYPES = {
    FILE_READ: {
        status: 500,
        msg: 'Error occurred while reading the file.',
    },
    LIMIT_FILE_SIZE: {
        msg: 'File size exceeds the limit: 2MB',
        status: 400,
        name: 'LIMIT_FILE_SIZE',
    },
    LIMIT_UNEXPECTED_FILE: {
        msg: 'Unexpected file field',
        status: 400,
        name: 'LIMIT_UNEXPECTED_FILE',
    },
    NO_FILE_FIELD: {
        msg: 'No file uploaded',
        status: 400,
        name: 'NO_FILE_FIELD',
    },
    NO_FILE_FOUND: {
        msg: 'No file found',
        status: 400,
        name: 'NO_FILE_FOUND',
    },
    DELETE_FILE: {
        msg: 'Failed to delete file',
        status: 500,
        name: 'DELETE_FILE',
    },
    INVALID_FILE_TYPE: {
        msg: `Invalid file type. Allowed formats: ${ALLOWED_FILE_TYPES.join(
            ', '
        )}`,
        status: 400,
        name: 'INVALID_FILE_TYPE',
    },
    DEFAULT: {
        msg: 'File upload error',
        status: 400,
        name: 'DEFAULT',
    },
};

export const SCHEMA_VALIDATION_ERRORS = {
    REQUIRED: {
        USER: {
            verified: 'Verified Is Required.',
            lastName: 'Last Name Is Required.',
            firstName: 'First Name Is Required.',
        },
        PRODUCT: {
            price: 'Price Is Required.',
            available: 'Available Is Required.',
            description: 'Description Is Required.',
            frets: 'Frets Is Required.',
            woodType: 'Wood Type Is Required.',
            brandId: 'Brand Id Is Required.',
            model: 'Model Is Required.',
        },
    },
};

export const DEFAULT_VALIDATION_ERRORS = {
    required: 'Is a Required Field',
    string: 'Should be a type of text',
    empty_string: 'Is a required field',
    min_string: 'Minimum length is required',
    email: 'Invalid email address',
    pattern_password:
        'Password should include uppercase letter, lowercase letter, digit, and special character.',
};

export const VALIDATION_ERRORS = {
    PROFILE: {
        UNION: 'Either first name or last name should be filled in.',
    },
};
