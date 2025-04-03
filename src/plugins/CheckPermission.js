import { permissions } from './authentication'
export default {
  install(app, options = {}) {
    app.config.globalProperties.$hasPermission = ( code ) => {
      return permissions().find( ( p ) => p == code ) != undefined ? true : false
    }
  }
}