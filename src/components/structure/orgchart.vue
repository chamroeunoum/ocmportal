<template>
  <div class="relative w-full " >
    <!-- Buttons -->
    <!-- <div v-if="false" class="action-buttons " style="margin:0 100px" >
      <button @click='chart.setExpanded("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expand 1</button>

      <button @click='chart.setExpanded("1",false).render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Collapse 1</button>

      <button @click='chart.addNode({id:"5",parentId:"1",name:"ក្រសួងថ្មី",image:"https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-1/272989966_243037994668044_1336394919081446684_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=c6021c&_nc_ohc=YFBkZNzaqLkAX-WexVW&_nc_ht=scontent.fpnh11-1.fna&oh=00_AfBWCY8Gms9RVLWbKvQlJsdtlOZvVFjs32HHnQlFRixw3g&oe=639809C4"})' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Add node as roots' child</button>
      
      <button @click='chart.addNode({id:"6",parentId:"1",name:"ក្រសួងថ្មី ១",_centered:true})' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Insert node at 5-th to 1</button>

      <button @click='chart.removeNode("2")' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Remove 2</button>

      <button @click='chart.fit()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Fit</button>

      <button @click='changeLayout()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Swap Layouts</button>

      <button @click='chart.setCentered("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Center O-6162 </button>

      <button @click='chart.setHighlighted("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Highlight O-6162 </button>

      <button @click='chart.setUpToTheRootHighlighted("1").render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Highlight O-6162 to root </button> 

      <button @click='chart.clearHighlighting()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Clear highlighting </button>

      <button @click='chart.fullscreen()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Full Screen </button>

      <button @click='chart.zoomIn()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Zoom In </button>

      <button @click='chart.zoomOut()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Zoom Out</button>

      <button @click='chart.exportImg()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expo Current Image</button>

      <button @click='chart.exportSvg()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Export SVG</button>

      <button @click='chart.expandAll()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Expand All</button>

      <button @click='chart.connections([{from:"O-6067",to:"O-6070",label:"Conflicts of interest"}]).render()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Multi Node Connections</button>
      
      <button @click='downloadPdf()' class="simptip-position-bottom border border-gray-300 py-2 px-4 rounded m-2 " >Download PDF</button>

    </div> -->

    <!-- <a href="https://github.com/bumbeishvili/d3-organization-chart">
    <img style="position:fixed;top:0;right:0;border:0;z-index:2;" width="149" height="149"
        src="https://bumbeishvili.github.io/d3-tooltip/forkme.png" alt="Fork me on GitHub">
    </a> -->
    <!-- Chart -->
    <Transition name="slide-fade" >
      <div v-if="dataFlattened" class="chart-container border bg-gray-50 fixed left-40 top-12 right-0 bottom-0 " > </div>
    </Transition>
    <!-- Loading -->
    <Transition name="slide-fade" >
      <div v-if="loading" class="fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-90 bg-green-100 ">
        <div class="flex mx-auto items-center">
          <div class="spinner">
            <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
            <br/><br/>កំពុងអានអង្គការលេខ...
          </div>
        </div>
        <!-- <div class="absolute top-2 right-2 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
          <svg class="w-10 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
        </div> -->
      </div>
    </Transition>
    <!-- Naive Drawer for child creation -->
    <!-- 
    <action-form v-bind:model="model" v-bind:record="selectedNode" v-bind:show="organizationModal" :onClose="onCloseOrganizationModel" />
    <add-child-organization-form v-bind:model="model" v-bind:record="selectedNode" v-bind:show="childOrganizationModal" :onClose="onCloseChildOrganizationModal" />
    -->
    <!-- <Frame4Corner />  -->
  </div>
</template>

<script>

import * as d3 from 'd3'
import { OrgChart } from 'd3-org-chart'
import { onMounted, reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import Frame4Corner from './../widgets/frame/corner4.vue'
import ocmLogoUrl from './../../assets/logo.svg'
import ocmLogoUrlPng from './../../assets/logo.png'

/**
 * CRUD component form
 */

export default {
  name: "OrganizationOrgchart" ,
  components: { 
    Frame4Corner ,
    // ActionForm ,
    // AddChildOrganizationForm
  },
  setup(){

    const store = useStore()

    const organizationStructure = ref([])
    function readOrganizationStructure(children){
      return children.map( (child) => {
        let parent = [{
          // Fields use by the organization chart
          id: child.id ,
          parentId: parseInt( child.pid ) > 0 ? parseInt( child.pid ) : null ,
          name: child.organization.name , 
          desp: child.organization.desp ,
          image: child.organization.image ,
          // Field others
          pid: child.pid ,
          tpid: child.tpid ,
          total_jobs: child.total_jobs ,
          total_unit_jobs: child.total_unit_jobs ,
          organization: child.organization ,
          root_position: child.root_position ,
          pdf: child.organization.pdf
        }]
        if( child.children != undefined && child.children != null ){
          return parent.concat( readOrganizationStructure(child.children) )
        }else{
          return parent
        }
      }).flat(Infinity)
    }

    const dataFlattened = ref([])
    const chart = ref(null)
    const loading = ref(true)
    function drawingOrgchart(){
      store.dispatch('organization/getStructure' , { organization_structure_id : 1 },{
        search: '' ,
        perPage: 1000 , 
        page: 1 ,
        id: 2
      }).then( res => {
          const nodes = ref([])
          nodes.value.push( {
            id: res.data.record.id ,
            parentId: parseInt( res.data.record.pid ) > 0 ? parseInt( res.data.record.pid ) : null ,
            name: res.data.record.organization.name ,
            pid: res.data.record.pid  ,
            organization: res.data.record.organization ,
            image: res.data.record.root_position.image != "" && res.data.record.root_position.image != undefined ? res.data.record.root_position.image : ocmLogoUrlPng ,
            desp: res.data.record.desp ,
            _centered: true ,
            // Field others
            pid: res.data.record.pid ,
            tpid: res.data.record.tpid ,
            total_jobs: res.data.record.total_jobs ,
            total_unit_jobs: res.data.record.total_unit_jobs ,
            organization: res.data.record.organization ,
            root_position: res.data.record.root_position ,
            pdf: res.data.record.organization.pdf,
            total_jobs : res.data.record.total_jobs ,
            total_unit_jobs : res.data.record.total_unit_jobs ,
            permissions : res.data.record.permissions ,
            total_officers : res.data.record.total_officers ,
            total_unit_officers : res.data.record.total_unit_officers ,
            _centered: true  
          } )

          if( res.data.record.children != undefined && res.data.record.children != null ){
            organizationStructure.value = readOrganizationStructure( res.data.record.children )
            console.log( organizationStructure.value )
            for(const e of organizationStructure.value ){
              if( e.root_position == null ){
                console.log( e )
              }
              nodes.value.push({
                id: e.id ,
                parentId: parseInt( e.pid ) > 0 ? parseInt( e.pid ) : null ,
                name: e.organization.name ,
                pid: e.pid ,
                organization: e.organization ,
                image: e.root_position != null && e.root_position.image != "" && e.root_position.image != undefined ? e.root_position.image : ocmLogoUrl ,
                desp: e.organization.desp ,
                permissions : e.permissions ,
                total_officers : e.total_officers ,
                total_unit_officers : res.data.record.total_unit_officers
              })
            }
          }

          dataFlattened.value = nodes.value
          dataFlattened.value.columns = 'id,name,image,parentId,desp'
          chart.value = new OrgChart()
          .container('.chart-container')
          .data( 
            dataFlattened.value
          )
          .svgHeight(window.innerHeight - 55)
          .initialZoom(0.8)
          .nodeWidth((d3Node) => {
            let i = 0;
            if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
            if (i && i == d3Node.parent.children.length - 1) { return 600; }
            return (!i || i == d3Node.parent.children.length - 1) ? 300 : 100
          })
          .nodeHeight((d3Node) => {
            let i = 0;
            if (d3Node.parent) { i = d3Node.parent.children.indexOf(d3Node); }
            if (i && i == d3Node.parent.children.length - 1) { return 300; }
            return (!i || i == d3Node.parent.children.length - 1) ? 200 : 100
          })
          .siblingsMargin(d3Node => 50)
          .childrenMargin(d3Node => 50)
          // .neightbourMargin((n1, n2) => 50)
          .compactMarginPair(d3Node => 70)
          .compactMarginBetween(d3Node => 50)
          .setActiveNodeCentered(true)
          // .layout(new URLSearchParams(new URL(document.location.href).search).get('layout') || "top")
          .layout("top")
          .linkUpdate(function (d3Node, i, arr) {
              const link = this;
              d3.select(link)
                  .attr('stroke-dasharray', !i ? '2 2' : 'none')
                  .attr('stroke-width', 3)
          })
          .nodeUpdate(function (node, i, arr) {
              d3.select(this).on('click.node', (event, d, i) => {
                chart.setCentered( d.data.id +'' ).render()
              })
          })
          .nodeHeight(d => 100)
          .nodeWidth(d => {
              return 400
          })
          .childrenMargin(d => 50)
          .onNodeClick( d => {
            this.selectedNode = this.dataFlattened.find( node => node.id == d )
            this.organizationModal = true
            /**
             * Show drawer for adding
             */
            this.nodeVal.pid = this.selectedNode.id 
            this.drawerHelper = true 
          })
          .compactMarginBetween(d => 35)
          .compactMarginPair(d => 30)
          // .neightbourMargin((a, b) => 20)
          .buttonContent(({ node, state }) => {
            return `<div class="border border-gray-300 bg-white rounded-md flex flex-row h-6 font-bold text-blue-500" >
              <svg class="w-4" style="margin: 2px 5px auto 5px; " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
              <div class="" style="margin: 1px 5px auto 5px; " >${ ( node.data._directSubordinates ) }</div>
              </div>`
          })
          .linkUpdate(function (d, i, arr) {
              d3.select(this)
                  .attr("stroke", d => d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9')
                  .attr("stroke-width", d => d.data._upToTheRootHighlighted ? 5 : 1)

              if (d.data._upToTheRootHighlighted) {
                  d3.select(this).raise()
              }
          })
          .nodeContent(function (d, i, arr, state) {
              const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
              const color = "#FFFFFF"
              return `<div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9;">
                        <div class="border overflow-hidden border-gray-200" style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" >
                        <!-- Picture -->` +
                        (
                          d.data.image!=null && d.data.image!=undefined
                          ? `<div class="bg-center bg-cover " style="background-image: url(`+ d.data.image +`); width: 50px; height: 50px;  background-repeat: no-repeat; background-position: center;" ></div>`
                          // : `<svg class='w-8 h-8 m-2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>`
                          : `<div class="" style="background-image: url(`+ ocmLogoUrlPng +`); width: 50px; height: 50px;  background-size: 70%; background-repeat: no-repeat; background-position: center;" ></div>`
                        )
                        + `</div><!-- Menu icon -->
                        <!-- <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div> -->
                        <!-- Name of the shape -->
                        <div style="" class="text-center text-gray-600 p-4 pt-6 font-moul leading-7" > ${d.data.name} </div>
                        <!-- Position of the shape -->
                        <div style="color:#716E7B;margin: 3px 10px 5px 10px;font-size:12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;  text-align: center; ">${ 
                          '' // d.data.leader != undefined && d.data.leader.length > 0 ? ( d.data.leader[0].countesies.map( (c) => c.name ).join(' , ') + "" + d.data.leader[0].lastname + " " + d.data.leader[0].firstname + " " + d.data.leader[0].positions.map( (p) => p.name ).join(' , ') ) : 'មិនមានអ្នកគ្រប់គ្រង' 
                        }</div>
                        <!-- Total staffs of each positions within the organization -->
                        <div style="position: absolute; right: 5px; bottom: -4px; border: 1px solid #CCC; background-color: #FFF; color:#716E7B; border-radius: 5px; height: 22px; padding: 2px; float: left;" >
                          <svg class="text-blue-600" style=" float: left; width: 11px; height: 11px; margin: 2px 5px auto 5px; display: inline-block; font-size: 12px ;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136l32-56h-96l32 56l-32 136l-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" fill="currentColor"></path></svg>
                          <div class="text-blue-600" style=" float: right; font-size: 10px ; margin: 0px 5px 0px 0px; " >` + _this.$toKhmer( d.data.total_unit_officers ) + `</div>
                        </div>
                        <!-- Total Staffs in the whole organization structure -->
                        <div style="position: absolute; left: 5px; bottom: -4px; border: 1px solid #CCC; background-color: #FFF; color:#716E7B; border-radius: 5px; height: 22px; padding: 2px; float: left;" >
                          <svg class="text-blue-600" style=" float: left; width: 14px; height: 14px; margin: 2px 5px auto 5px; display: inline-block; font-size: 12px ;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M12.475 8.014a1 1 0 0 1 .993.884l.007.116v4.368a3.484 3.484 0 0 1-6.964.19l-.005-.19V9.014a1 1 0 0 1 .883-.993l.117-.007h4.969zm0 1h-4.97v4.368a2.484 2.484 0 0 0 4.964.163l.006-.163V9.014zm-6.701-1a1.988 1.988 0 0 0-.26.82l-.008.18h-2.49v3.74a1.856 1.856 0 0 0 2.618 1.693c.08.329.196.644.344.94a2.856 2.856 0 0 1-3.957-2.466l-.004-.168V9.014a1 1 0 0 1 .883-.993l.117-.007h2.757zm8.433 0h2.784a1 1 0 0 1 .993.884l.007.116v3.74a2.855 2.855 0 0 1-3.984 2.624c.148-.298.264-.613.343-.943a1.856 1.856 0 0 0 2.635-1.536l.006-.145v-3.74h-2.516l-.006-.149a1.989 1.989 0 0 0-.262-.851zM9.988 2.989a2.227 2.227 0 1 1 0 4.455a2.227 2.227 0 0 1 0-4.455zm4.988.628a1.913 1.913 0 1 1 0 3.827a1.913 1.913 0 0 1 0-3.827zm-9.96 0a1.913 1.913 0 1 1 0 3.827a1.913 1.913 0 0 1 0-3.827zm4.972.372a1.227 1.227 0 1 0 0 2.455a1.227 1.227 0 0 0 0-2.455zm4.988.628a.913.913 0 1 0 0 1.827a.913.913 0 0 0 0-1.827zm-9.96 0a.913.913 0 1 0 0 1.827a.913.913 0 0 0 0-1.827z" fill="currentColor"></path></g></svg>
                          <div class="text-blue-600" style=" float: right; font-size: 11px ; margin: 0px 5px 0px 0px; " >` + _this.$toKhmer( d.data.total_officers ) + `</div>
                        </div>
                      </div>
                      `;
          })
          .render()
          // .expandAll()
          .fit()
          loading.value = false
        // }) // Finish building chart
      }).catch( err => { console.log( err ) } );

    }

    function addChild(){
      this.$store.dispatch( 'organizations/addchild',{
        name: this.childNode.name ,
        // document_id : 0 , // Id of the document that this record despribe
        pid : this.nodeVal.parentId > 0 ? this.nodeVal.parentId : 0 , // Id of the parent record
        desp: this.childNode.desp ,
        image: '' // this.nodeVal.image
      }).then( res => {
        if( res.data.ok ){

          this.chart.addNode({
            id: res.data.record.id,
            parentId: res.data.record.pid ,
            name: res.data.record.name,
            image: res.data.record.image != "" ? res.data.record.image : ocmLogoUrlPng ,
            desp: res.data.record.desp ,
            _centered: true
          })
          // this.chart.setCentered(res.data.record.id).render()
        
          this.nodeVal = {
            id: 0 ,
            parentId: 0 ,
            name: "" ,
            image: "" ,
            desp: ''
          }
          this.childNode = reactive({
            id: 0 ,
            parentId: 0 ,
            name: "" ,
            image: "" ,
            desp: ''
          })
        }else{
          console.log( res.data.message )
        }
      }).catch( err => {
        console.log( err )
      })
      this.drawerHelper = false 
    }

    onMounted(()=>{
      drawingOrgchart()
    })

    return {
      ocmLogoUrl ,
      ocmLogoUrlPng,
      model: {
        name: "organizations" ,
        title: "រចនាសម្ព័ន្ធក្រសួង"
      },
      chart ,
      dataFlattened,
      chart,
      loading ,
      organizationStructure
    }
  }
}

</script>

<style scoped>
  [data-tooltip]:focus:after {
      display: none;
      border-bottom-color: none !important;
      ;
  }

  [data-tooltip]:focus:before {
      display: none;
      border-bottom-color: none !important;
      ;
  }

  [data-tooltip]:after {
      height: auto !important;
      padding: 11px 11px 11px 11px !important;
      content: attr(data-tooltip);
      white-space: pre;
      line-height: 16px !important;
      text-align: left !important;
  }
</style>