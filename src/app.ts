/// <reference path="./typings/main.d.ts" />

const electron = require('electron');
const BrowserWindow: typeof Electron.BrowserWindow = electron.BrowserWindow;
const app = require('app');
const path = require('path');

//app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'plugin', 'Pepperflash', 'pepflashplayer.dll'));
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'pepflashplayer.dll'));
app.commandLine.appendSwitch('ppapi-flash-version', '21.0.0.216');

class IwafApplication {
    mainWindow: Electron.BrowserWindow = null;

    constructor(public app: Electron.App) {
        this.app.on('windows-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
    }

    onWindowAllClosed() {
        if(process.platform != 'darwin') {
            this.app.quit();
        }
    }

    onReady() {
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 502,
            frame: true,
            transparent: false,
            resizable: false,
        });

        this.mainWindow.loadURL('file://' + __dirname + '/html/index.html');
        //this.mainWindow.loadURL('http://www.adobe.com/software/flash/about/');
        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
    }
}

const iwaf = new IwafApplication(app);
