import { generateErrorUUID } from "../utils/uuidGen";

enum ErrorType {
    UNHANDLED_ERROR = "UNHANDLED_ERROR",
    RUNTIME_EXCEPTION = "RUNTIME_EXCEPTION",
    INPUT_VALIDATION_ERROR = "INPUT_VALIDATION_ERROR",
    DB_ERROR = "DYNAMO_DB_ERROR"
}

enum Severity {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}

export interface ServerError extends Error {
    readonly uuid: GENERAL.ERROR_UUID;
    readonly async?: boolean;
    readonly typeEnum: ErrorType;
    readonly status: number;
    message: string;
    readonly severity: Severity;
    details?: any;
    getAsyncDetails?: () => Promise<any>;
}

class BaseError extends Error {
    public uuid: GENERAL.ERROR_UUID;
    constructor(message: string) {
        super(message);
        this.uuid = generateErrorUUID();
    }
}

export class InputValidationError extends BaseError implements ServerError {
    constructor(errorArray: string[]) {
        super("Invalid Request");
        this.details = { errors: errorArray };
    }
    public details: { errors: string[] };
    readonly typeEnum = ErrorType.INPUT_VALIDATION_ERROR;
    readonly status = 400;
    readonly severity = Severity.INFO;
}

export class ValueNotFoundError extends BaseError implements ServerError {
    constructor(errorArray: string[]) {
        super("Invalid Request");
        this.details = { errors: errorArray };
    }
    public details: { errors: string[] };
    readonly typeEnum = ErrorType.INPUT_VALIDATION_ERROR;
    readonly status = 404;
    readonly severity = Severity.INFO;
}

export class RuntimeError extends BaseError implements ServerError {
    constructor(errorArray: string[]) {
        super("Runtime Error");
        this.details = { errors: errorArray };
    }
    public details: { errors: string[] };
    readonly typeEnum = ErrorType.RUNTIME_EXCEPTION;
    readonly status = 500;
    readonly severity = Severity.ERROR;
}