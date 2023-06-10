import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'rotionTemplate@3x.png'),
  )

  const tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      type: 'checkbox',
      label: 'Ativar modo dark',
      checked: true,
    },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    { type: 'separator' },
    { label: 'Documentos recentes', enabled: false },
    {
      label: 'Ignite',
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Pessoal',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Untitled',
      accelerator: 'CommandOrControl+3',
      acceleratorWorksWhenHidden: false,
    },
    { type: 'separator' },
    {
      label: 'Sair do Rotion',
      role: 'quit',
    },
  ])

  tray.setContextMenu(contextMenu)
}
