
import './globals.css'

export const metadata = {
  title: 'Simple Connect App',
  description: 'A simple app with frontend and backend connection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
