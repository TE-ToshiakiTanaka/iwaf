/// <reference path="./typings/main.d.ts" />

const electron = require('electron');
const BrowserWindow: typeof Electron.BrowserWindow = electron.BrowserWindow;
const app = require('app');

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
            height: 400,
            acceptFirstMouse: true,
            titleBarStyle: 'hidden'
        });

        this.mainWindow.loadURL('file://' + __dirname + '/html/index.html');

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
    }
}

const iwaf = new IwafApplication(app);
