import {rome,shift,type Booking,type Rules,available} from './calendar'
export type User={id:string,name:string,status:'Approvato'|'In attesa'|'Rifiutato',goal:string}
export type Exercise={id:string,name:string,group:string,gear:string,desc:string,cue:string,error:string,source:string,yt:string,blob?:Blob}
export type Row={exercise:string,sets:string,reps:string,rest:string,note:string}
export type Plan={id:string,user:string,name:string,days:{name:string,rows:Row[]}[]}
export type Data={users:User[],exercises:Exercise[],plans:Plan[],bookings:Booking[],rules:Rules}
export const uid=()=>crypto.randomUUID()
export const weekdays=['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato']
export function seed():Data{
const catalog=[
['Panca piana con bilanciere','Petto','Bilanciere e panca','Spinta orizzontale su panca.','Appoggia bene i piedi e accompagna la discesa.','Rimbalzare sul petto.','Jeff Nippard','hWbUlkb5Ms4'],
['Squat con bilanciere','Gambe','Bilanciere e rack','Accosciata con carico sulle spalle.','Mantieni il piede in appoggio durante il movimento.','Sollevare i talloni.','Barbell Logic','3PRwtVpyslo'],
['Lat machine','Dorso','Lat machine','Trazione verticale da seduti.','Porta i gomiti verso i fianchi.','Slanciarsi con il busto.','Max Euceda','43hWj8mfYGY'],
['Shoulder press con manubri','Spalle','Manubri','Spinta verticale con due manubri.','Controlla la traiettoria sopra le spalle.','Inarcare eccessivamente la schiena.','Jay Gardner','NxAeHbhH6F4'],
['Curl manubri su panca inclinata','Bicipiti','Panca inclinata e manubri','Flessione del gomito su panca inclinata.','Tieni le braccia ferme durante la salita.','Oscillare con le spalle.','Max Euceda','HhHHBj3qTJ4'],
['Pushdown tricipiti','Tricipiti','Cavo alto','Estensione del gomito al cavo.','Mantieni i gomiti vicini al busto.','Usare lo slancio.','Max Euceda','-zLyUAo1gMw'],
['Plank','Core','Tappetino','Tenuta isometrica sugli avambracci.','Allinea spalle, bacino e talloni.','Trattenere il respiro.','E3 Rehab','A2b2EmIg0dA'],
['Leg press','Gambe','Pressa','Spinta degli arti inferiori alla pressa.','Mantieni il bacino appoggiato.','Perdere il contatto con lo schienale.','Renaissance Periodization','P8TfK9wmFVo']]
const exercises=catalog.map(([name,group,gear,desc,cue,error,source,yt],i)=>({id:String(i),name,group,gear,desc,cue,error,source,yt}))
const users:User[]=['Marco Rossi','Giulia Costa','Andrea Riva','Sara De Luca','Luca Neri'].map((name,i)=>({id:'u'+i,name,status:i===4?'In attesa':'Approvato',goal:['Forza generale','Costanza in palestra','Tecnica di spinta','Allenamento su due giorni','Prima consulenza'][i]}))
const row=(i:number,sets:number,reps:string):Row=>({exercise:String(i),sets:String(sets),reps,rest:sets===4?'90 s':'60 s',note:exercises[i].cue})
const plans:Plan[]=[{id:'p0',user:'u0',name:'Forza e controllo',days:[{name:'Lunedì · Petto e tricipiti',rows:[row(0,4,'8'),row(3,3,'10'),row(5,3,'12')]},{name:'Mercoledì · Dorso e bicipiti',rows:[row(2,4,'10'),row(4,3,'12'),row(6,3,'30 s')]},{name:'Venerdì · Gambe',rows:[row(1,4,'8'),row(7,3,'12')]}]},...['Ripartenza full body','Tecnica della spinta','Due giorni di equilibrio'].map((name,i)=>({id:'p'+(i+1),user:'u'+(i+1),name,days:[{name:'Martedì · Sessione A',rows:[row([7,0,1][i],3,'10'),row(6,3,'20 s')]},{name:'Giovedì · Sessione B',rows:[row([2,3,7][i],3,'8')]}]}))]
const rules:Rules={weekly:Array.from({length:7},(_,i)=>i===0?[]:['09:00','10:00','11:00','15:00','16:00','17:00']),blocks:[]}
const bookings:Booking[]=[];for(let i=1;bookings.length<4;i++){const date=shift(rome().date,i),time=available(date,rules,bookings)[0];if(time){const n=bookings.length;bookings.push({id:'b'+n,user:'u'+[0,1,4,3][n],date,time,type:n===2?'Prima consulenza':'Controllo periodico',mode:n%2?'In presenza':'Online',status:n===2?'Richiesto':'Confermato'})}}
return {users,plans,exercises,bookings,rules}}
