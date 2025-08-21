import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const BetsTableModel = defineStore('BetsTableModel', () => {
  async function fetch_bets({bookmaker_id, sport, type, cut_time}){
    let query = supabase.from('order').select('*')
    query = query.eq('bookmaker_id', bookmaker_id)
    query = query.eq('sport', sport)

    if (type === 'comming') {
      query = query.gt('match_time', cut_time)
    } else if (type === 'settled'){
      query = query.lt('match_time', cut_time)
    }else{
    }

    query = query.order('match_time', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error(`Supabase fetch ${type} error:`, error)
      return []
    }
    return data || []
  }

  return { fetch_bets }

})