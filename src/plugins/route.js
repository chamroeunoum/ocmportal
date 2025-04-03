import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth , getUser, hasPermission } from './authentication'

import LoginComponent from './../layouts/login/index.vue'
import DashboardComponent from '../layouts/dashboard/index.vue'
import WelcomeComponent from '../layouts/welcome/portal/mainportal.vue'

import GlobalSearchComponent from '../components/regulator/global.vue'
import RegulatorFavoriteComponent from '../components/regulator/favorite.vue'

/**
 * Folder Section
 */
import FolderComponent from './../components/regulator/folder/index.vue'
import FolderListComponent from './../components/regulator/folder/thumb.vue'
import FolderDetailComponent from './../components/regulator/folder/detail.vue'
import FolderRegulatorComponent from './../components/regulator/folder/regulator.vue'

/**
 * User Account
 */
import UserComponent from './../components/user/index.vue'
import UserProfileComponent from './../components/user/profile.vue'
import PasswordChangeComponent from './../components/user/password_change.vue'

/**
 * Officer
 */
import OfficerCrud from './../components/officer/index.vue'
import OfficerThumbnailCrud from './../components/officer/listing/thumbnail.vue'

/**
 * Card Officer
 */
import DetailCardComponent from './../layouts/staff/card.vue'
import PrintOfficerCardComponent from './../layouts/staff/printcard.vue'
/**
 * Check in and out
 */
import QrCheckinAndCheckoutComponent from './../layouts/checkinout/check.vue'
import QrCheckinAndCheckoutCameraComponent from './../layouts/checkinout/qrcheck.vue'

/**
 * Schedule of Meeting
 */
import ScheduleMeetingTV1Component from '../layouts/welcome/backup/template1.vue'
import ScheduleMeetingTV2Component from '../layouts/welcome/backup/template2.vue'
import ScheduleMeetingTV3Component from '../layouts/welcome/backup/template3.vue'
import ScheduleMeetingTV4Component from '../layouts/welcome/backup/template4.vue'

/**
 * Meeting
 */
import MeetingComponent from './../components/meeting/index.vue'
import MeetingThumbnailComponent from './../components/meeting/crud/lists/thumbnail.vue'
import MeetingScheduleComponent from './../components/meeting/MeetingSchedule.vue'

/**
 * Error
 */
import Page404 from './../components/errors/404.vue'
import router from '../router'
var routers = [];
console.log( 'Portal Key: ' + hasPermission('portal') )
export const getRoutes = () => {
    if( isAuth() && hasPermission( 'portal' ) ){
        routers = [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/welcome'
                }
            },
            { 
                path: '/login', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/welcome'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/welcome'
                }
            },
            {
                name: "Dashboard" ,
                path: '/dashboard' , 
                component: DashboardComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: "UserProfile" ,
                path: '/profile' ,
                component: UserProfileComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: "UserPasswordChange" ,
                path: '/password/change' ,
                component: PasswordChangeComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: "RegulatorPage" ,
                path: '/regulator' ,
                component: GlobalSearchComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: "RegulatorFavoritePage" ,
                path: '/regulator/favorites' ,
                component: RegulatorFavoriteComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: "FolderPage" ,
                path: '/folder' ,
                component: FolderComponent ,
                meta: {
                    // transition: 'fade'
                },
                children: [
                    {
                        name: "FolderList" ,
                        path: '' ,
                        component: FolderListComponent
                    },
                    {
                        name: "FolderRegulatorComponent" ,
                        path: ':id/regulators' ,
                        component: FolderRegulatorComponent
                    }
                ]
            },
            {
                name: 'Officer' ,
                path: '/hr/officer',
                component: OfficerCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "OfficerTable" ,
                        path: '' ,
                        component: OfficerThumbnailCrud // UserTableCrud
                    },
                    {
                        name: "OfficerThumbnail" ,
                        path: 'thumbnail' ,
                        component: OfficerThumbnailCrud
                    },
                    {
                        name: "OfficerThumbnailFilter" ,
                        path: 'thumbnail/:ids' ,
                        component: OfficerThumbnailCrud
                    }
                ]
            },
            {
                name: 'OfficerCard',
                path: '/officer/card/:id',
                component: DetailCardComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'PrintOfficerCard',
                path: '/officer/print/card/:id',
                component: PrintOfficerCardComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'QrCheckinAndCheckoutComponent',
                path: '/officer/checkinout/:id',
                component: QrCheckinAndCheckoutComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'QrCheckinAndCheckoutCameraComponent',
                path: '/officer/checkinout/:id/camera',
                component: QrCheckinAndCheckoutCameraComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'Meeting' ,
                path: '/meeting',
                component: MeetingComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "MeetingThumbnailComponent" ,
                        path: '' ,
                        component: MeetingThumbnailComponent
                    },
                    {
                        name: "MeetingScheduleComponent" ,
                        path: 'schedule' ,
                        component: MeetingScheduleComponent
                    },
                    
                ]
            },
            {
                name: 'ScheduleMeetingTV1Component',
                path: '/tvtemplate1',
                component: ScheduleMeetingTV1Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'ScheduleMeetingTV2Component',
                path: '/tvtemplate2',
                component: ScheduleMeetingTV2Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'ScheduleMeetingTV3Component',
                path: '/tvtemplate3',
                component: ScheduleMeetingTV3Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'ScheduleMeetingTV4Component',
                path: '/tvtemplate4',
                component: ScheduleMeetingTV4Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            , {
                name: "Welcome" ,
                path: '/welcome' , 
                component: WelcomeComponent ,
                meta: {
                    // transition: 'fade'
                }
            }
        ]
    }else{
        routers = [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/login'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/login'
                }
            },
            {
                name: "LoginPage" ,
                path: '/login' , 
                component: LoginComponent ,
                meta: {
                    // transition: 'fade'
                }
            }
            // , {
            //     name: "Welcome" ,
            //     path: '/welcome' , 
            //     component: WelcomeComponent ,
            //     meta: {
            //         // transition: 'fade'
            //     }
            // }
        ]
    }

    routers.push( 
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }    
    )
    return routers
}