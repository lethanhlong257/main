import {createStore} from 'redux'
const getAllData =require( '../api/api').getAllData

let emulatorData = getAllData().then()

const changeNews = (state = emulatorData, action) => {
    switch (action.type) {
    case 'NGOAI_HANG_ANH':
        return state.filter((e)=> e.type === 'ngoai_hang_anh')
    case 'TAY_BAN_NHA':
        return state.filter((e)=> e.type === 'tay_ban_nha')
    default:
        return state
    }
}

const store = createStore(changeNews)

module.exports = store


