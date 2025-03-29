
import './globals.css'
import { ThemeProvider } from '../context/ThemeContext'

export const metadata = {
  title: 'Simple Connect App',
  description: 'A simple app with frontend and backend connection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className="min-h-screen">
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-gray-50 to-white opacity-70 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
