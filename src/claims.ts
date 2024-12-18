import { Request } from 'express';
import { RequestWithUserInfo, UserInfo } from './types';
import { BadRequestError } from './auth/middleware';

class MissingClaimError extends BadRequestError {
  constructor(claim: keyof UserInfo) {
    super(`Missing claim: ${claim}`);
  }
}

export const getClaim = <K extends keyof UserInfo, R extends boolean = true>(
  req: Request,
  claim: K,
  required?: R,
): R extends true ? Exclude<UserInfo[K], undefined> : UserInfo[K] => {
  const { userInfo = {} } = req as RequestWithUserInfo;
  const value = userInfo[claim];

  if (required && !value) {
    throw new MissingClaimError(claim);
  }

  return value as R extends true
    ? Exclude<UserInfo[K], undefined>
    : UserInfo[K];
};
