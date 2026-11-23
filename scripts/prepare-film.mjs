import {mkdir,writeFile,access,mkdtemp,rm,rename} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {execFileSync} from 'node:child_process'
import ffmpeg from '@ffmpeg-installer/ffmpeg'
import {source} from './film-source.mjs'

// Vercel serves the optimized clip and still as same-origin static assets.
const dir='public/media'
await mkdir(dir,{recursive:true})
const clip=join(dir,'orbita.mp4')
const still=join(dir,'orbita.jpg')
const exists=path=>access(path).then(()=>true,()=>false)
if(!await exists(clip)||!await exists(still)){
  const temporary=await mkdtemp(join(tmpdir(),'cc-film-'))
  try{
    const response=await fetch(source,{signal:AbortSignal.timeout(60000)})
    if(!response.ok) throw Error('Download scena: '+response.status)
    const input=join(temporary,'source.mp4')
    await writeFile(input,new Uint8Array(await response.arrayBuffer()))
    const encode=(args)=>execFileSync(ffmpeg.path,['-hide_banner','-loglevel','error','-y','-i',input,...args],{stdio:'inherit'})
    encode(['-an','-vf','scale=1280:-2,fps=24','-c:v','libx264','-preset','fast','-crf','23','-g','4','-keyint_min','4','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',clip+'.tmp.mp4'])
    encode(['-frames:v','1','-vf','scale=1280:-2','-q:v','3',still+'.tmp.jpg'])
    await rename(clip+'.tmp.mp4',clip)
    await rename(still+'.tmp.jpg',still)
  }finally{await rm(temporary,{recursive:true,force:true})}
}