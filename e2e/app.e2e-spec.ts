import { AppPage } from './app.po';

describe('santander-bike-planner App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be able to display map', () => {
    page.navigateTo();
    expect(page.getMap()).toEqual('app-map');
  });

  it('should find markers on map', () => {
    page.navigateTo();
    expect(page.getMarkers().first().getTagName()).toEqual('marker');
  });
});
