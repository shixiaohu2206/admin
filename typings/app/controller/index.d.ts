// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/baseController';
import ExportMemberController from '../../../app/controller/memberController';
import ExportTongjiController from '../../../app/controller/tongjiController';
import ExportWeatherController from '../../../app/controller/weatherController';

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    memberController: ExportMemberController;
    tongjiController: ExportTongjiController;
    weatherController: ExportWeatherController;
  }
}
