/**
 * 错误码枚举值
 */
export const enum StatusCodeEnum {
  SUCCESS = 200,
  CREATE = 201,
  ACCEPT = 202,
  WRONG = 400,
  NOACCESS = 401,
  FORBIDDEN = 402,
  NOFIND = 404,
  PARAMWRONG = 416,
  SERVICEWRONG = 500,
  OVERTIME = 504
}

/**
 * 错误码接口
 */
export interface StatusCode {
  SUCCESS?: StatusCodeEnum.SUCCESS
  CREATE?: StatusCodeEnum.CREATE
  ACCEPT?: StatusCodeEnum.ACCEPT
  WRONG?: StatusCodeEnum.WRONG
  NOACCESS?: StatusCodeEnum.NOACCESS
  FORBIDDEN?: StatusCodeEnum.FORBIDDEN
  NOFIND?: StatusCodeEnum.NOFIND
  PARAMWRONG?: StatusCodeEnum.PARAMWRONG
  SERVICEWRONG?: StatusCodeEnum.SERVICEWRONG
  OVERTIME?: StatusCodeEnum.OVERTIME
}
