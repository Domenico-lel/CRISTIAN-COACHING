import test from 'node:test'
import assert from 'node:assert/strict'
import {available,rome,shift} from '../lib/calendar.ts'
const now=new Date('2026-07-01T07:30:00Z'),rules={weekly:Array(7).fill(['09:00','10:00','11:00']),blocks:[{date:'2026-07-01',start:'10:30',end:'11:00'}]}
test('Fuso italiano e cambio giorno',()=>{assert.equal(rome(now).time,'09:30');assert.equal(shift('2026-12-31',1),'2027-01-01')})
test('Esclude passato, sovrapposizioni e blocchi parziali',()=>{assert.deepEqual(available('2026-07-01',rules,[],'',now),['11:00']);assert.deepEqual(available('2026-06-30',rules,[],'',now),[]);const b={id:'x',date:'2026-07-01',time:'11:00',status:'Richiesto'};assert.deepEqual(available(b.date,rules,[b],'',now),[]);assert.deepEqual(available(b.date,rules,[b],'x',now),['11:00'])})