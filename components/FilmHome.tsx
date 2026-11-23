'use client'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import {seed} from '../lib/data'
import {Player} from './Catalog'
import './film.css'

function Film() {
  const stage = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const section = stage.current
    const clip = video.current
    if (!section || !clip) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const portrait = matchMedia('(orientation: portrait)')
    function selectShot() {
      if (!clip) return
      const format = portrait.matches ? 'verticale' : 'orizzontale'
      clip.poster = '/media/pesi-' + format + '.jpg'
      clip.src = '/media/pesi-' + format + '.mp4'
      clip.load()
    }
    let frame = 0
    let target = 0
    function seek() {
      if (!clip || clip.seeking || !Number.isFinite(clip.duration)) return
      const time = target * Math.max(0, clip.duration - 0.05)
      if (Math.abs(clip.currentTime - time) > 0.035) clip.currentTime = time
    }
    function paint() {
      frame = 0
      if (!section) return
      const distance = document.documentElement.scrollHeight - window.innerHeight
      target = preference.matches ? 0 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, distance)))
      section.style.setProperty('--travel', String(target))
      seek()
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(paint) }
    clip.addEventListener('loadedmetadata', schedule)
    clip.addEventListener('seeked', seek)
    preference.addEventListener('change', schedule)
    window.addEventListener('scroll', schedule, {passive:true})
    window.addEventListener('resize', schedule)
    portrait.addEventListener('change', selectShot)
    selectShot()
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    paint()
    return () => {
      observer.disconnect()
      portrait.removeEventListener('change', selectShot)
      cancelAnimationFrame(frame)
      clip.removeEventListener('loadedmetadata', schedule)
      clip.removeEventListener('seeked', seek)
      preference.removeEventListener('change', schedule)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  return <><div className="walk-backdrop"><picture className="film-still" aria-hidden="true">
        <source media="(orientation: portrait)" srcSet="/media/pesi-verticale.jpg"/>
        <img src="/media/pesi-orizzontale.jpg" alt="" fetchPriority="high"/>
      </picture>
      <video ref={video} className="film-source" muted playsInline preload="auto" aria-hidden="true"/>
      <div className="film-shade"/></div>
    <section ref={stage} className="film-stage"><div className="film-screen">
      <div className="film-copy">
        <p className="film-kicker"><span/> Personal training individuale</p>
        <h1>Allenati con<br/><em>Cristian.</em></h1>
        <p className="film-desc">La tua settimana, i tuoi obiettivi. Una scheda che costruiamo insieme.</p>
        <Link className="film-action" href="/registrazione">Inizia il tuo percorso <span aria-hidden="true">↗</span></Link>
      </div>
      <a href="#prova-scheda" className="film-scroll"><span aria-hidden="true">↓</span> Scopri la scheda</a>
      <div className="film-meter" aria-hidden="true"/>
    </div>
  </section></>
}

export default function FilmHome(){
  const [sample] = useState(seed)
  const [day, setDay] = useState(0)
  const [exercise, select] = useState('')
  const plan = sample.plans[0]
  const session = plan.days[day]
  const current = sample.exercises.find(x => x.id === exercise)
  return <main className="film-home"><Film/>
    <section className="film-sheet" id="prova-scheda">
      <div className="sheet-intro">
        <p className="film-kicker"><span/> La tua area personale</p>
        <h2>Dentro la<br/><em>scheda.</em></h2>
        <p>Questa è la settimana di Marco. Scegli un giorno e tocca un esercizio per vedere come si allena.</p>
        <Link className="sheet-link" href="/demo">Esplora l’area demo ↗</Link>
      </div>
      <div className="session-card">
        <div className="session-title"><div><small>Marco Rossi</small><h3>{plan.name}</h3></div><span>MR</span></div>
        <div aria-label="Giorni di allenamento" className="session-days">{plan.days.map((d,i)=><button key={d.name} aria-pressed={i===day} onClick={()=>{setDay(i);select('')}}>{d.name.split(' · ')[0]}</button>)}</div>
        <div className="session-body" key={day}><h4>{session.name.split(' · ')[1]}</h4>
          {session.rows.map(r=>{const x=sample.exercises.find(v=>v.id===r.exercise)!;return <div key={r.exercise}><button className="session-row" aria-expanded={exercise===x.id} onClick={()=>select(exercise===x.id?'':x.id)}>
            <span className="session-play" aria-hidden="true">{exercise===x.id?'−':'▷'}</span><span><b>{x.name}</b><small>{r.sets} × {r.reps} · Recupero {r.rest}</small></span><span aria-hidden="true">↗</span></button>
            {exercise===x.id&&current&&<div className="session-player"><Player x={current}/><p>{r.note}</p></div>}</div>})}
        </div>
      </div>
    </section>
    <section className="film-consult"><div><p className="film-kicker"><span/> Prima consulenza</p><h2>Da dove<br/><em>partiamo?</em></h2></div><div><p>Raccontami come ti alleni, dove vuoi arrivare e quanto tempo hai. Scegliamo insieme il primo passo.</p><Link className="film-action" href="/registrazione">Prenota una consulenza ↗</Link></div></section>
  </main>
}