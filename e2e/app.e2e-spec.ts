import { ComplianceAppPage } from './app.po';

describe('compliance-app App', () => {
  let page: ComplianceAppPage;

  beforeEach(() => {
    page = new ComplianceAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
