// ** React Imports
import { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react'

// ** MUI Imports
import { PaletteMode, Snackbar, Alert } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from 'configs/themeConfig'

// ** Types Import
import { ThemeColor, ContentWidth } from '@core/layouts/types'

export type Settings = {
  mode: PaletteMode
  themeColor: ThemeColor
  contentWidth: ContentWidth
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
  setSnackbarAlert: Dispatch<
    SetStateAction<{ message: string; severity: 'error' | 'success' | 'warning' | 'info' } | null>
  > // updated type
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings,
  setSnackbarAlert: () => null
})

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings })
  const [snackbarAlert, setSnackbarAlert] = useState<{
    message: string
    severity: 'success' | 'error' | 'warning' | 'info'
  } | null>(null)

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings)
  }

  const handleSnackbarAlertClose = () => {
    setSnackbarAlert(null)
  }

  const renderSnackbarAlert = () => {
    if (!snackbarAlert) return null
    const { message, severity } = snackbarAlert

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open
        autoHideDuration={3000}
        onClose={handleSnackbarAlertClose}
      >
        <Alert onClose={handleSnackbarAlertClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, setSnackbarAlert }}>
      {children}
      {renderSnackbarAlert()}
    </SettingsContext.Provider>
  )
}

export const SettingsConsumer = SettingsContext.Consumer
