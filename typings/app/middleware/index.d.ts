// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCors from '../../../app/middleware/cors';
import ExportError from '../../../app/middleware/error';
import ExportNuxt from '../../../app/middleware/nuxt';

declare module 'egg' {
  interface IMiddleware {
    cors: typeof ExportCors;
    error: typeof ExportError;
    nuxt: typeof ExportNuxt;
  }
}
