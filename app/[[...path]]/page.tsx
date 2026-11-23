import Studio from '../../components/Studio'
export default async function Page({params}:{params:Promise<{path?:string[]}>}){const {path}=await params;return <Studio route={(path||[]).join('/')}/>}