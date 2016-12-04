import { PagesPage } from './app.po';

describe('pages App', function() {
  let page: PagesPage;

  beforeEach(() => {
    page = new PagesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
