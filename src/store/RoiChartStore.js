import { defineStore } from 'pinia'
import { supabase } from '../supabase'


export const RoiChartModel = defineStore('RoiChartStore', () => {
    async function fetch_roi({bookmaker_id, sport}){
        const { data, error } = await supabase.rpc('cumulative_orders', {p_bookmaker_id: bookmaker_id, p_sport: sport, p_state: 1});
        if (error) {
          console.error(`Supabase fetch_roi ${bookmaker_id}--${sport} error:`, error)
          return []
        }
        return data || []
        }

    return { fetch_roi }
})