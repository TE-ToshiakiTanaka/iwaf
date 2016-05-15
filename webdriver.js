const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Here is the path to your Electron binary.
      binary: __dirname + '/release/win32/Iwaf-win32-ia32/Iwaf.exe',
    }
  })
  .forBrowser('electron')
  .build();

driver.get('http://www.adobe.com/software/flash/about/');
