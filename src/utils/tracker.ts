import { log } from "./log";
import {
  pageOnloadListener,
  pageUnloadListener,
  routeChangeListener,
  uploadData,
} from '@/lib/index'
import {
  getTime,
  getSessionId,
  getURL,
} from '@/utils/index'
import type { TrackerOptions } from '@/types/index'
import { TrackerEventTypeEnum } from '@/types/trackerEventType'

class Tracker {

  public options: TrackerOptions;

  constructor(trackerOptions: TrackerOptions) {
    const defaultOptions = {
      name: 'tracker',
      debug: false,
      openGlobalPvEvent: true,
    }
    this.options = { ...defaultOptions, ...trackerOptions };
    log({
      level: 'info',
      message: `${this.options.name}实例化成功`
    })
    this.initEvent();
  }

  initEvent() {
    pageOnloadListener(this.options, () => {
      this.track(TrackerEventTypeEnum.pageOpen);
    });
    pageUnloadListener(this.options, () => {
      this.track(TrackerEventTypeEnum.pageClose);
    });
    routeChangeListener(this.options, () => {
      this.track(TrackerEventTypeEnum.pageView);
    });
  }

  track(trackEventType: TrackerEventTypeEnum) {
    const reportData = {
      version: '1.0.0',
      eventType: trackEventType,
      clientId: this.options.clientId,
      authorization: this.options.authorization,
      time: getTime(), // 时间戳
      sessionId: getSessionId(),
      title: document.title,
      url: getURL(),
      pathname: location.pathname,
      // version: this.app_version,
    }
    const reportRequestUrl = `${this.options.host}${this.options.reportPath}`
    uploadData(reportData, reportRequestUrl)
    console.log(reportData)
  }
}

export default Tracker