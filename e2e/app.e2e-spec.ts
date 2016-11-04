import { QywebNg2Page } from './app.po';

describe('qyweb-ng2 App', function() {
  let page: QywebNg2Page;

  beforeEach(() => {
    page = new QywebNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
