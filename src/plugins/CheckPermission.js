import { permissions } from './authentication'
export default {
  install(app, options = {}) {
    app.config.globalProperties.$hasPermission = ( code ) => {
      return Array.isArray( code ) ? (
        permissions().find( p => code.includes( p ) ) != undefined
        ? true : false
      ) : permissions().includes( code )
    }
  }
}