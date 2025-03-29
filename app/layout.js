
import './globals.css'

export const metadata = {
  title: 'Simple Connect App',
  description: 'A simple app with frontend and backend connection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-gray-50 to-white opacity-70"></div>
        {children}
      </body>
    </html>
  )
}
