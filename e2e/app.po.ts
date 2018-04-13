import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getLoginSplashscreen() {
    return element(by.css('app-root app-login-splash-screen')).getTagName();
  }

  getMarkers() {
    return element.all(by.css('app-root app-journey-map ngui-map div.bikepointsMarkers marker'));
  }
}
