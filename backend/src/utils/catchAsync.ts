import { Request, Response, NextFunction } from "express";

//this is helper function to catch all try and catch  async function
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => next(err));
  };
};

export default catchAsync;
