import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import officer from './modules/officer'
import organization from './modules/organization'
import position from './modules/position'
import countesy from './modules/countesy'
import regulator from './modules/regulator'
import regulatorSearch from './modules/regulator/search'
import regulatorType from './modules/regulator/type'
import regulatorOrganization from './modules/regulator/organization'
import regulatorSignature from './modules/regulator/signature'

import folder from './modules/folder'

import meeting from './modules/meeting/meeting'
import meetingCountesy from './modules/meeting/countesy'
import meetingOrganization from './modules/meeting/organization'
import meetingPeople from './modules/meeting/people'
import meetingPosition from './modules/meeting//position'
import meetingRoom from './modules/meeting/room'
import meetingType from './modules/meeting/type'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    company: {
      name: 'ទីស្ដីការគណៈរដ្ឋមន្ត្រី'
    },
    system: {
      name: 'ច្រកសេវារួម'
    },
    activePage: {
      title: ''
    }
    // branch: '' 
  },
  modules: {
    auth ,
    user ,
    officer ,
    organization ,
    position , 
    countesy ,
    // Regulator
    regulator ,
    regulatorSearch ,
    regulatorSignature ,
    regulatorOrganization ,
    regulatorType ,
    // Folder 
    folder ,
    // Meeting
    meeting ,
    meetingCountesy ,
    meetingOrganization ,
    meetingPeople ,
    meetingPosition ,
    meetingRoom ,
    meetingType ,
    // Officer
    officer
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})