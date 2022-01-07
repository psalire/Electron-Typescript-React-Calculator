
import {
    contextBridge,
    ipcRenderer,
} from "electron";

window.addEventListener('DOMContentLoaded', () => {
    console.log('👋 This message is being logged by "preload.js", included via webpack');
});

contextBridge.exposeInMainWorld("ipcClose", {
    exit: () => ipcRenderer.invoke("ipc-close:exit"),
});
