<template>
    <div class="relative flex min-h-screen place-items-center " :style=" ' background-image: url( ' + pkachan + ' ); ' " >
      <Transition name="slide-fade" >
      <div v-if="toggleLoginForm" class="w-96 mx-auto p-8 bg-white shadow-lg h-auto border border-gray-100 rounded-md ">
        <div class="w-14 mx-auto mt-0 p-1">
          <img src="./../../assets/logo.svg" class="w-full" >
        </div>
        <div class="text-center h-6 " >
          <div class="mb-1 font-moul text-yellow-500">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
          <div class="mb-1 text-4xl font-tacteing h-6 leading-4 hidden" >3</div>
          <div class="mb-1 font-moul hidden">{{ store.state.company.name }}</div>
          <div class="mb-1 font-moul hidden">នាយកដ្ឋានធនធានមនុស្ស</div>
        </div>
        <div class="w-full mx-auto leading-6 text-center font-moul mb-4 my-2 ">{{ store.state.system.name }}</div>
        <div class="mx-auto mt-1 w-full" >
          <div class="w-full mx-auto my-8 text-left hidden">ចូលប្រព័ន្ធ</div>
          <n-form>
            <n-form-item label="ឈ្មោះគណនី" >
              <n-input round 
                placeholder="ឈ្មោះគណនី ឬ អ៊ីមែល ឬ លេខទូរស័ព្ទ"
                v-model:value="credentials.email"
                clearable
                @keyup.enter="funcLogin"
                class="text-xs"
              >
                <template #prefix>
                  <svg class='text-gray-600 w-4 h-4 ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8s8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47c.65.89 1.77 1.47 2.96 1.47c1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3z" fill="currentColor"></path></svg>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="ពាក្យសម្ងាត់" >
              <n-input round 
                placeholder="ពាក្យសំងាត់"
                v-model:value="credentials.password"
                type="password"
                clearable
                @keyup.enter="funcLogin"
                class="text-xs" 
              >
                <template #prefix>
                  <svg class='text-gray-600 w-4 h-4 ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M15 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm-2.5-4C9.424 2 7 4.424 7 7.5c0 .397.04.796.122 1.175c.058.27-.008.504-.142.638l-4.54 4.54A1.5 1.5 0 0 0 2 14.915V16.5A1.5 1.5 0 0 0 3.5 18h2A1.5 1.5 0 0 0 7 16.5V16h1a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-.18c.493.134 1.007.18 1.5.18c3.076 0 5.5-2.424 5.5-5.5S15.576 2 12.5 2zM8 7.5C8 4.976 9.976 3 12.5 3S17 4.976 17 7.5S15.024 12 12.5 12c-.66 0-1.273-.095-1.776-.347A.5.5 0 0 0 10 12.1v.9H9a1 1 0 0 0-1 1v1H7a1 1 0 0 0-1 1v.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.586a.5.5 0 0 1 .146-.353l4.541-4.541c.432-.432.522-1.044.412-1.556A4.619 4.619 0 0 1 8 7.5z" fill="currentColor"></path></g></svg>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
        </div>
        <div class="w-full my-2">
          <n-button type="success" class="w-24 mt-2 " :loading="loading" @click="funcLogin"  >
            ចូល
            <template #icon>
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><defs></defs><path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7c-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8c7-8.5 14.5-16.7 22.4-24.5c32.6-32.5 70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8c47.9 0 94.3 9.3 137.9 27.8c42.2 17.8 80.1 43.4 112.7 75.9c32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8c-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 0 1 520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 0 1 270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5c-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 0 1 0 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z" fill="currentColor"></path></svg>
            </template>
          </n-button>
          <!-- <n-button type="default" class="m-2" @click="$router.push('/welcome')"  >
            ទំព័រស្វាគមន៍
            <template #icon>
              <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 512"><path d="M272 191.91c-17.6 0-32 14.4-32 32v80c0 8.84-7.16 16-16 16s-16-7.16-16-16v-76.55c0-17.39 4.72-34.47 13.69-49.39l77.75-129.59c9.09-15.16 4.19-34.81-10.97-43.91c-14.45-8.67-32.72-4.3-42.3 9.21c-.2.23-.62.21-.79.48l-117.26 175.9C117.56 205.9 112 224.31 112 243.29v80.23l-90.12 30.04A31.974 31.974 0 0 0 0 383.91v96c0 10.82 8.52 32 32 32c2.69 0 5.41-.34 8.06-1.03l179.19-46.62C269.16 449.99 304 403.8 304 351.91v-128c0-17.6-14.4-32-32-32zm346.12 161.73L528 323.6v-80.23c0-18.98-5.56-37.39-16.12-53.23L394.62 14.25c-.18-.27-.59-.24-.79-.48c-9.58-13.51-27.85-17.88-42.3-9.21c-15.16 9.09-20.06 28.75-10.97 43.91l77.75 129.59c8.97 14.92 13.69 32 13.69 49.39V304c0 8.84-7.16 16-16 16s-16-7.16-16-16v-80c0-17.6-14.4-32-32-32s-32 14.4-32 32v128c0 51.89 34.84 98.08 84.75 112.34l179.19 46.62c2.66.69 5.38 1.03 8.06 1.03c23.48 0 32-21.18 32-32v-96c0-13.77-8.81-25.99-21.88-30.35z" fill="currentColor"></path></svg>
            </template>
          </n-button> -->
        </div>
      </div>
    </Transition>
    <div class="fixed bottom-0 mx-auto w-full">
      <FooterComponent />
    </div>

  </div>
</template>
<script>
import { getUser } from '@plugins/authentication'
import { getMaxUploadFilesize, setMaxUploadFilesize } from '@plugins/file'
import { getRoutes } from '@plugins/route'
import FooterComponent from '@components/footer/copy-right.vue'
import { ref, reactive , onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification , useMessage } from 'naive-ui'
import pkachan from '@assets/pkachan.png'

export default {
  name: 'LoginTemplate' ,
  components: {
    FooterComponent
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const router = useRouter()
    const notify = useNotification()
    const message = useMessage()
    const toggleLoginForm = ref(false)

    if( getUser() !== undefined && getUser() !== null ){
      router.push('/search')  
    }
    
    /**
     * Data
     */
    const credentials = reactive({
        email: '' ,
        password: '' ,
      })
    const loading = ref( false )
    /**
     * Login function
     */
    function funcLogin(){
      if( credentials.email == "" || credentials.email == null ){
        message.warning("សូមបញ្ចូលអ៊ីមែលរបស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។")
        return false
      }"Thank you for your hard work today"
      if( credentials.password == "" || credentials.password == null ){
        message.warning("សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។")
        return false
      }
      loading.value = true
      store.dispatch('auth/login',{
        email: credentials.email ,
        password: credentials.password
      }).then( res => {
        if( res.data.ok ){
          /**
           * Store the authenticated user into the store
           */
          store.commit('auth/setAuthentication',{
            user: res.data.record ,
            token: res.data.token
          })

          setMaxUploadFilesize( parseFloat( res.data.upload_max_filesize.replace( 'M' , '' ) ) )

          let routes = router.getRoutes()
          for(let i in routes ){
            router.hasRoute( routes[i].name ) ? router.removeRoute( routes[i].name ) : false
          }
          routes = getRoutes()
          for(let i in routes ){
            router.addRoute( routes[i] )
          }

          message.success("សូមស្វាគមន៍ !")
          router.push('/')
          // router.push('/hr/officer')
          // if( res.data.user.role == 1 ){
          //   this.$router.push('/dashboard')
          // }else{
          //   this.$router.push('/receive')
          // }
        }else{
          message.error( res.data.message )
        }
        loading.value = false
      }).catch( err => {
        loading.value = false
        if( err.response !== null ){
          console.log( err )
          let messageText = err.response.status + ": " + err.response.statusText + "."
          if( err.response.data !== null ){
            for(var key in err.response.data.errors ){
              messageText += err.response.data.errors[key]
            }  
          }
          message.error( err.response.data.message + " ( " + messageText + " ) " )
        }else{
          console.log( err.response )
        }
      });
    }

    onMounted( () => {
      setTimeout( function(){
        toggleLoginForm.value = true
      } , 200 )
    })
    /**
     * End login function
     */
    return {
      /**
       * data
       */
      credentials ,
      loading , 
      store ,
      toggleLoginForm ,
      /**
       * Functions
       */
      funcLogin ,
      /**
       * Components
       */
      pkachan
    }
  },
  mounted(){
    // console.log( this.credentials )
  }
}
</script>
<style scoped >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.8rem;
}
/**
Transition
*/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
