import { useSelector } from 'react-redux'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { RootState } from '@/redux/store'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme)

  return (
    <div className="min-h-screen myTheme" data-theme={currentTheme}>
      <Header />
      <main role="main" aria-label="Main Content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
