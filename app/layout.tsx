import './style.css'
import type {ReactNode} from 'react'
export const metadata={title:'Cristian Coaching | Allenamento individuale',description:'Il tuo spazio per schede personali, esercizi e consulenze con Cristian.',manifest:'/manifest.webmanifest',icons:{icon:'/icon.svg'}}
export const viewport={width:'device-width',initialScale:1,themeColor:'#171e29'}
export default function Layout({children}:{children:ReactNode}){return <html lang="it"><body>{children}</body></html>}