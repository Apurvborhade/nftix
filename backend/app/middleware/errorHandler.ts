import { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.statusCode || 500;

    console.log(err)
    res.status(status).json({
        error: {
            message: err.message,
            statusCode: status
        }
    })
}