import { ErrorRequestHandler } from "express";
import { IResponse } from "./_response";

export const errorHandler = <ErrorRequestHandler<unknown, IResponse>>(
  async (err, req, res, next) => {
    return res.status(422).json({
      success: false,
      code: 422,
      message: err.message,
      data: null,
    })
  }
)
