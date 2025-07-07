import crud from '../../../api/crud'
// initial state
const state = () => ({
  model: {
    name: "village" ,
    module: "villages" ,
    title : 'ភូមិ'
  },
  server: import.meta.env.VITE_API_SERVER ,
  columns: {
    all: ['id'] ,
    visible : ['id'] ,
    searchable : []
  } , 
  records: {
    all : [] ,
    selected: [] ,
    matched: [] ,
    record : null ,
    created: [] ,
    updated: [] ,
    deleted: []
  },
  pagination: {
    ids: [] ,
    page: 0 ,
    perPage: 10 ,
    search: '' ,
    totalRecords : 0 ,
    totalPages : 0 ,
    totalButtons: 10 ,
    buttons: [] ,
    start: 1 , 
    end: 1 
  }
})
// getters
const getters = {
  pagination(state, getters, rootState) {
    return state.pagination
  },
  records(state,getters,rootState){
    return state.records
  },
  rootState(state,getters,rootState){
    return rootState
  },
  server(state,getters,rootState){
    return import.meta.env.VITE_API_SERVER
  },
  columns(state,getters,rootState){
    return state.columns
  },
  model(state,getters,rootState){
    return state.model
  },
}

// actions
const actions = {
  /**
   * Crud functions
   */
  async list ({ state, commit, rootState },params) {
    return await crud.list(
      import.meta.env.VITE_API_SERVER+"/"+state.model.module + 
      ( 
        params != undefined && params != null
          ? "?" + new URLSearchParams({
            search: params.search ,
            perPage: params.perPage ,
            page: params.page
          }).toString()
          : ''
      )
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/"+params.id+"/read")
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.module+'/create',params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.module+'/update',params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.module+'/delete',params)
  },
  async toggleActive({state, commit, rootState}, params){
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/toggleactive",params)
  },
  async uploadPicture({ state, commit, rootState },formData) {
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/upload/picture",formData)
  },
  async uploadPdf({ state, commit, rootState },formData) {
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/upload/pdf",formData)
  },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/pdf?id="+params.id)
  },
  /**
   * Specific functions base on requirements
   */
  async globalFolder ({ state, commit, rootState },params) {
    return await crud.list(
      import.meta.env.VITE_API_SERVER+"/"+state.model.module + "/global?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async regulators ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/regulators"+ "?" + new URLSearchParams({
      folder_id: params.id ,
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async addRegulator ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/regulators/add",params)
  },
  async removeRegulator ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/regulators/remove",params)
  },
  async ofUser ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/user"+ "?" + new URLSearchParams({
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async listRegulatorWithValidation ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.module+"/list/regulator/validation"+ "?" + new URLSearchParams({
      search: params.search ,
      perPage: params.perPage ,
      page: params.page ,
      regulator_id : params.regulator_id
    }).toString(),
    null,
    true
  )},
  async updateAccessibility ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.module+'/'+params.id+'/accessibility',{mode: params.mode})
  }
}

// mutations
const mutations = {
  setModel( state, model ){
    state.model = model
  },
  setPagination(state , pagination ){
      state.pagination = pagination
  },
  setPaginationIds( state , ids ){
    state.pagination.ids = ids != null && ids != undefined && ids.length > 0 ? ids.filter( ( id ) => parseInt( id ) > 0 ) : []
  },
  setPaginationPage( state , page ){
    if( !(typeof page === 'number') ){
      throw new Error(`លេខទំព័រមិនត្រឹមត្រូវ ៖ ${page} មិនមែនជាប្រភេទតួលេខ។`)
    }
    state.pagination.page = parseInt( page )
  },
  setPaginationPerPage( state , perPage ){
    if( !(typeof perPage === 'number') ){
      throw new Error(`ចំនួនទិន្នន័យក្នុង ១ ទំព័រ មិនត្រឹមត្រូវ ៖ ${perPage} មិនមែនជាប្រភេទតួលេខ។`)
    }
    state.pagination.perPage = parseInt( perPage )
  },
  setPaginationSearch( state , search ){
    if( string == null || string == undefined ){
      throw new Error(`សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក : ${string}`);
    }
    state.pagination.search = string
  },
  setPaginationStart( state , start ){
    if( !(typeof start === 'number') ){
      throw new Error(`លេខទំព័រមិនត្រឹមត្រូវ ៖ ${start} មិនមែនជាប្រភេទតួលេខ។`)
    }
    state.pagination.start = parseInt( start )
  },
  setPaginationEnd( state , end ){
    if( !(typeof end === 'number') ){
      throw new Error(`លេខទំព័រមិនត្រឹមត្រូវ ៖ ${end} មិនមែនជាប្រភេទតួលេខ។`)
    }
    state.pagination.end = parseInt( stendart )
  },
  setServer(state , server ){
      if( server == null || server == undefined || server == "" ){
          throw new Error(`សូមបញ្ជាក់ពី Server ៖ ${server}`);
      }
      import.meta.env.VITE_API_SERVER = server
  },
  setColumns(state ,columns){
    if( !Array.isArray( columns ) || ( Array.isArray( columns ) && columns.length <= 0 ) ){
        throw new Error(`សូមបញ្ចូលឈ្មោះក្បាលតារាង ៖ ${columns}`);
    }
    state.columns.all = columns
    state.columns.visible = columns
  },
  setVisibleColumns(state ,columns){
    console.log( columns)
      if( !Array.isArray( columns ) || ( Array.isArray( columns ) && columns.length <= 0 ) ){
          throw new Error(`សូមបញ្ចូលឈ្មោះក្បាលតារាង ៖ ${columns}`);
      }
      state.columns.visible = columns
  },
  setSearchableColumns(state ,columns){
      if( !Array.isArray( columns ) || ( Array.isArray( columns ) && columns.length <= 0 ) ){
          throw new Error(`សូមបញ្ចូលឈ្មោះក្បាលតារាង ៖ ${columns}`);
      }
      state.columns.searchable = columns
  },
  setAllRecords( state , records ){
    state.records.all = state.records.matched = records 
  },
  setMatchedRecords( state , records ){
    state.records.matched = records
  },
  setSelectedRecords( state , records ){
    state.records.selected = records
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}