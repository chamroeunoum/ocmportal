<template >
    <div v-if="show" class="birth-information" >
        <Transition name="slide-fade" >
            <div v-if="record != undefined && record != null " class="absolute left-0 right-0 bottom-0 top-0 p-8 mb-6 flex flex-wrap" >
                <div class="relative font-moul border-b border-gray-200 w-full pb-2 mb-4 " >ព័ត៌មានផ្ទាល់ខ្លួន
                    <svg 
                        class="w-7 h-7 text-green-500 absolute right-0 -top-2 cursor-pointer " 
                        @click="save"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
                </div>
                <n-scrollbar >
                    <div class="body" >
                        <div class="w-12/12 p-4 border border-gray-200 rounded-md  bg-white shadow " >
                            <div class="profile-information" >
                                <div class="flex flex-wrap" >
                                    <div class="w-full pb-4  border-b border-gray-200 " >
                                    <div class="flex flex-initial" >
                                        <div class="flex-grow flex flex-initial" >
                                        <div class="profile_information ml-4 flex-grow" >
                                            <table class="officer_information" >
                                                <tbody >
                                                    <tr v-if="record.people != null && record.people != undefined" >
                                                        <td colspan="2" class="font-moul p-2 pb-1" >{{ record.countesy != undefined && record.countesy != null ? record.countesy.name : "" }} {{ record.people.lastname + " " + record.people.firstname }}</td>
                                                    </tr>
                                                    <tr v-if="record.people != null && record.people != undefined" >
                                                        <td colspan="2" class="font-moul p-2 pt-1" >{{ record.people.enlastname + " " + record.people.enfirstname }}</td>
                                                    </tr>
                                                    <tr v-if="record.code != null && record.code.length > 0" >
                                                        <td class="font-btb-black p-2" >អត្តលេខ</td>
                                                        <td>{{ record.code.length > 0 ? record.code : ( 'OCM-ORG-'+record.id ) }}</td>
                                                    </tr>
                                                    <tr v-if="record != null && record.position != null " >
                                                        <td class="p-2 font-btb-black " >តួនាទី</td>
                                                        <td>{{ record.position.name }}</td>
                                                    </tr>
                                                    <tr v-if="record != null && record.organization != null " >
                                                        <td class="font-btb-black p-2" >អង្គភាព</td>
                                                        <td>{{ record.organization.name }}</td>
                                                    </tr>
                                                    <tr v-if="record != null && record.email != null " >
                                                        <td class="font-btb-black p-2" >អ៉ីមែល</td>
                                                        <td>{{ record.email }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="flex-none w-48" >
                                            <!-- <qrcode-vue :value="'OCM-ORG-'+record.id" :size="100" level="H" class=" mx-auto p-2 border border-gray-200 rounded" :render-as="'svg'" /> -->
                                            <div class="flex-none" >
                                                <div class="w-28 overflow-hidden mx-auto bg-center bg-no-repeat bg-white bg-cover rounded border border-gray-200" >
                                                    <img 
                                                    class="w-full mx-auto"
                                                    :src="record.image!=''? record.image : ocmLogoUrl "  />
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="w-full py-4 " >
                                    
                                        <!-- <div class="py-4" >
                                            <div v-if="record.people != null && record.people != undefined" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200 flex font-moul">{{ record.countesy != undefined && record.countesy != null ? record.countesy.name : "" }} {{ record.people.lastname + " " + record.people.firstname }}<br/>{{ record.people.enlastname + " " + record.people.enfirstname }}</div>
                                            <div v-if="record.code != null && record.code.length > 0" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">អត្តលេខ ៖ {{ $toKhmer( 'OCM-ORG-'+record.id ) }}</div>
                                            <div v-if="record != null && record.position != null " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">តួនាទី ៖ {{ record.position.name }}</div>
                                            <div v-if="record != null && record.organization != null " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">អង្គភាព ៖ {{ record.organization.name }}</div>
                                        </div>
                                    
                                        <div class="py-4" >
                                            <div v-if="record.user.username != null && record.user.username.length > 0" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">ឈ្មោះប្រើប្រាស់ក្នុងប្រព័ន្ធ ៖ {{ record.user.username }}</div>
                                            <div v-if="record.user.phone != null && record.user.phone.length > 0" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">ទូរស័ព្ទ ៖ {{ $toKhmer( record.user.phone ) }}</div>
                                            <div v-if="record.user.email != null && record.user.email.length > 0 " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">អ៊ីមែល ៖ {{ record.user.email }}</div>
                                            <div v-if="record.user.last_login != null && record.user.last_login.length > 0 " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">ចូលចុងក្រោយ ៖ {{ $toKhmer( dateFormat( new Date( record.user.last_login ) , 'dd-mm-yyyy' ) ) }}</div>
                                            <div v-if="record.user.ip != null && record.user.ip.length > 0 " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">លេខម៉ាស៊ីន ៖ {{ $toKhmer( record.user.ip ) }}</div>
                                            <div v-if="record.user.login_count != null && parseInt( record.user.login_count ) > 0 " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">បានចូលចំនួន ៖ {{ $toKhmer( record.user.login_count ) }}</div>
                                        </div> -->
                                    
                                        <div class="" >
                                            <!-- <div v-if="record.people != null && record.people != undefined" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200 flex font-moul">{{ record.countesy != undefined && record.countesy != null ? record.countesy.name : "" }} {{ record.people.lastname + " " + record.people.firstname }}<br/>{{ record.people.enlastname + " " + record.people.enfirstname }}</div> -->
                                            <!-- <div v-if="record != null && record.people != undefined && record.people != null && record.people.nid != null " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">លេខអត្តសញ្ញាណបណ្ណ ៖ {{ $toKhmer( record.people.nid ) }}</div> -->
                                            <div v-if="record != null && record.people != undefined && record.people != null && record.people.dob != null " class="w-full pb-2 leading-6 ">ថ្ងៃខែឆ្នាំកំណើត ៖ {{ $toKhmer( dateFormat( new Date(record.people.dob) , 'dd-mm-yyyy' ) ) }}</div>
                                            <!-- <div v-if="record != null && record.people != undefined && record.people != null && record.people.mobile_phone != null && record.people.mobile_phone.length > 0" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">លេខទូរស័ព្ទផ្ទាល់ខ្លួន ៖ {{ $toKhmer( record.people.mobile_phone ) }}</div>
                                            <div v-if="record != null && record.people != undefined && record.people != null && record.people.office_phone != null && record.people.office_phone.length > 0" class="w-full mb-4 pb-2 leading-6 border-b border-gray-200">លេខទូរស័ព្ទការិយាល័យ ៖ {{ $toKhmer( record.people.office_phone ) }}</div> -->
                                            <div v-if="record != null && record.people != undefined && record.people != null && record.people.marry_status != null && record.people.marry_status == 'married' " class="w-full mb-4 pb-2 leading-6 flex flex-wrap ">
                                                រៀបការរួច ៖
                                                <svg class="w-4 h-4 text-pink-500 ml-4 mt-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M8 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2z" fill="currentColor"></path><path d="M24 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2z" fill="currentColor"></path><path d="M26 30h-4a2 2 0 0 1-2-2v-7h2v7h4v-9h2v-6a1 1 0 0 0-1-1h-6.42L16 20l-4.58-8H5a1 1 0 0 0-1 1v6h2v9h4v-7h2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h7.58L16 16l3.42-6H27a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2z" fill="currentColor"></path></svg>
                                            </div>
                                                <div v-if="record != null && record.people != undefined && record.people != null && record.people.marry_status != null && record.marry_status == 'single' " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200 flex flex-wrap ">
                                                នៅលីវ
                                                <svg class="w-4 h-4 text-blue-500 ml-4 mt-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 30h-4a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2zm-5-18a.94.94 0 0 0-1 1v6h2v9h4v-9h2v-6a.94.94 0 0 0-1-1z" fill="currentColor"></path><path d="M16 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2z" fill="currentColor"></path></svg>
                                            </div>
                                            <div v-if="record != null && record.people != undefined && record.people != null && record.people.marry_status != null && record.marry_status == 'devorced' " class="w-full mb-4 pb-2 leading-6 border-b border-gray-200 flex flex-wrap ">
                                                ពោះមាយ / មេមាយ
                                                <svg class="w-4 h-4 text-blue-500 ml-4 mt-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13 12a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1.5C2 15.554 4.088 17 7.5 17c.459 0 .893-.026 1.302-.076l-.363-.363a1.494 1.494 0 0 1-.359-.576c-.187.01-.38.015-.58.015C4.579 16 3 14.907 3 13.5V12a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v.085a1.496 1.496 0 0 1 1 1.414V12zm5 .5c0 .425-.065.822-.193 1.185l-.829-.828c.015-.115.022-.234.022-.357V12a1 1 0 0 0-1-1h-2.171a3 3 0 0 0-.594-1H16a2 2 0 0 1 2 2v.5zm-7-7a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0zm-6 0a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm12 1a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0zm-4 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zm-1.854 11.354a.5.5 0 0 0 .708-.708L10.707 16h5.586l-1.147 1.146a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708L16.293 15h-5.586l1.147-1.146a.5.5 0 0 0-.708-.708l-2 2a.5.5 0 0 0 0 .708l2 2zM11.243 15h1.325h-1.325z" fill="currentColor"></path></g></svg>
                                            </div>
                                        </div>

                                        <div class="parent-panel w-full flex flex-wrap" >
                                            <!-- Father information -->
                                            <n-form class="flex flex-wrap w-full " >
                                                <div class="flex flex-wrap  w-full " >
                                                    <div class="w-full mb-4 border-b border-gray-200 pb-2 font-moul" >ព័ត័មានឪពុកបង្កើត</div>
                                                    <n-form-item label="គោត្តនាម (ខ្មែរ)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="father.lastname" placeholder="គោត្តនាម ខ្មែរ" />
                                                    </n-form-item>
                                                    <n-form-item label="នាម (ខ្មែរ)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="father.firstname" placeholder="នាម ខ្មែរ" />
                                                    </n-form-item>
                                                    <n-form-item label="គោត្តនាម (អង់គ្លេស)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="father.enlastname" placeholder="គោត្តនាម អង់គ្លេស" />
                                                    </n-form-item>
                                                    <n-form-item label="នាម (អង់គ្លេស)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="father.enfirstname" placeholder="នាម អង់គ្លេស" />
                                                    </n-form-item>

                                                    <n-form-item label="ថ្ងៃខែឆ្នាំកំណើត" class="w-1/3 p-1" >
                                                        <n-date-picker v-model:value="fatherDob" type="date" clearable format="dd-MM-yyyy" placeholder="ថ្ងៃ ខែ ឆ្នាំ កំណើត" class="w-full" />
                                                    </n-form-item>
                                                    <n-form-item label="លេខអត្តសញ្ញាណបណ្ណ" class="w-1/3 p-1" >
                                                        <n-input v-model:value="father.nic" placeholder="លេខអត្តសញ្ញាណបណ្ណ" />
                                                    </n-form-item>
                                                    <n-form-item label="មុខរបរ" class="w-1/3 p-1" >
                                                        <n-input v-model:value="father.profession" placeholder="មុខរបរ" />
                                                    </n-form-item>

                                                    <n-form-item label="ជនជាតិ" class="w-1/3 p-1" >
                                                        <n-radio-group v-model:value="father.national" name="national">
                                                            <n-space>
                                                                <n-radio
                                                                    value="khmer"
                                                                    label="ខ្មែរ"
                                                                />
                                                                <n-radio
                                                                    value="others"
                                                                    label="ផ្សេងទៀត"
                                                                />
                                                            </n-space>
                                                        </n-radio-group>
                                                    </n-form-item>  
                                                    <n-form-item label="សញ្ជាតិ" class="w-1/3 p-1" >
                                                        <n-radio-group v-model:value="father.nationality" name="nationality">
                                                            <n-space>
                                                                <n-radio
                                                                    value="khmer"
                                                                    label="ខ្មែរ"
                                                                />
                                                                <n-radio
                                                                    value="others"
                                                                    label="ផ្សេងទៀត"
                                                                />
                                                            </n-space>
                                                        </n-radio-group>
                                                    </n-form-item>  
                                                    <n-form-item label="" class="w-1/3 p-1" >
                                                        <n-radio-group v-model:value="father.death" name="death">
                                                            <n-space>
                                                                <n-radio
                                                                    :value="0"
                                                                    label="រស់"
                                                                />
                                                                <n-radio
                                                                    :value="1"
                                                                    label="ស្លាប់"
                                                                />
                                                            </n-space>
                                                        </n-radio-group>
                                                    </n-form-item>  
                                                    <n-form-item label="ទីកន្លែងកំណើត" class="w-1/2 p-1" >
                                                        <n-input type="textarea" v-model:value="father.pob" placeholder="ទីកន្លែងកំណើត" />
                                                    </n-form-item>
                                                    <n-form-item label="អាសយដ្ឋានបច្ចុប្បន្ន" class="w-1/2 p-1" >
                                                        <n-input type="textarea" v-model:value="father.address" placeholder="អាសយដ្ឋានបច្ចុប្បន្ន" />
                                                    </n-form-item>
                                                </div>
                                                <!-- Mother information -->
                                                <div class="w-full flex flex-wrap " >
                                                    <div class="w-full mb-4 border-b border-gray-200 pb-2 font-moul" >ព័ត័មានម្ដាយបង្កើត</div>
                                                    <n-form-item label="គោត្តនាម (ខ្មែរ)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="mother.lastname" placeholder="គោត្តនាម ខ្មែរ" />
                                                    </n-form-item>
                                                    <n-form-item label="នាម (ខ្មែរ)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="mother.firstname" placeholder="នាម ខ្មែរ" />
                                                    </n-form-item>
                                                    <n-form-item label="គោត្តនាម (អង់គ្លេស)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="mother.enlastname" placeholder="គោត្តនាម អង់គ្លេស" />
                                                    </n-form-item>
                                                    <n-form-item label="នាម (អង់គ្លេស)" class="w-1/2 p-1" >
                                                        <n-input v-model:value="mother.enfirstname" placeholder="នាម អង់គ្លេស" />
                                                    </n-form-item>

                                                    <n-form-item label="ថ្ងៃខែឆ្នាំកំណើត" class="w-1/3 p-1" >
                                                        <n-date-picker v-model:value="motherDob" type="date" clearable format="dd-MM-yyyy" placeholder="ថ្ងៃ ខែ ឆ្នាំ កំណើត" class="w-full" />
                                                    </n-form-item>
                                                    <n-form-item label="លេខអត្តសញ្ញាណបណ្ណ" class="w-1/3 p-1" >
                                                        <n-input v-model:value="father.nic" placeholder="លេខអត្តសញ្ញាណបណ្ណ" />
                                                    </n-form-item>
                                                    <n-form-item label="មុខរបរ" class="w-1/3 p-1" >
                                                        <n-input v-model:value="mother.profession" placeholder="មុខរបរ" />
                                                    </n-form-item>

                                                    <n-form-item label="ជនជាតិ" class="w-1/3 p-1" >
                                                        <n-radio-group v-model:value="mother.national" name="national">
                                                            <n-space>
                                                                <n-radio
                                                                    value="khmer"
                                                                    label="ខ្មែរ"
                                                                />
                                                                <n-radio
                                                                    value="others"
                                                                    label="ផ្សេងទៀត"
                                                                />
                                                            </n-space>
                                                        </n-radio-group>
                                                    </n-form-item>  
                                                    <n-form-item label="សញ្ជាតិ" class="w-1/3 p-1" >
                                                        <n-radio-group v-model:value="mother.nationality" name="nationality">
                                                            <n-space>
                                                                <n-radio
                                                                    value="khmer"
                                                                    label="ខ្មែរ"
                                                                />
                                                                <n-radio
                                                                    value="others"
                                                                    label="ផ្សេងទៀត"
                                                                />
                                                            </n-space>
                                                        </n-radio-group>
                                                    </n-form-item> 
                                                    <n-form-item label="" class="w-1/3 p-1" >
                                                        <n-radio-group v-model:value="mother.death" name="death">
                                                            <n-space>
                                                                <n-radio
                                                                    :value="0"
                                                                    label="រស់"
                                                                />
                                                                <n-radio
                                                                    :value="1"
                                                                    label="ស្លាប់"
                                                                />
                                                            </n-space>
                                                        </n-radio-group>
                                                    </n-form-item>  
                                                    <n-form-item label="ទីកន្លែងកំណើត" class="w-1/2 p-1" >
                                                        <n-input type="textarea" v-model:value="mother.pob" placeholder="ទីកន្លែងកំណើត" />
                                                    </n-form-item>
                                                    <n-form-item label="អាសយដ្ឋានបច្ចុប្បន្ន" class="w-1/2 p-1" >
                                                        <n-input type="textarea" v-model:value="mother.address" placeholder="អាសយដ្ឋានបច្ចុប្បន្ន" />
                                                    </n-form-item>
                                                </div>
                                            </n-form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
        </Transition>
        <Transition name="slide-fade" >
            <div v-if="record == undefined || record == null " >មានបញ្ហាក្នុងការបង្ហាញ ព័ត៌មានមន្ត្រី</div>
        </Transition>
    </div>    
</template>
<script >
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'

import Frame4Corner from '@components/widgets/frame/corner4.vue'
import QrcodeVue from 'qrcode.vue'
import ocmLogoUrl from '@assets/logo.svg'
import dateFormat from 'dateformat'

    export default {
        components: {
            Frame4Corner ,
            QrcodeVue ,
        },
        props: {
            record: {
                type: Object ,
                required: true ,
                default: () => {
                    return reactive({
                        id: 0 ,
                        username: '' ,
                        firstname: '' ,
                        lastname: '' ,
                        nid: '' ,
                        dob: '' ,
                        marry_status: '' ,
                        email: '' ,
                        phone: '' ,
                        person: null ,
                        orgainzations: [] ,
                        positions: [] ,
                        countesies: []
                    })
                },    
            },
            show: {
                type: Boolean ,
                default: false
            },
            onClose: {
                type: Function
            },
        },
        setup(props){
            const fatherDob = ref( new Date() )
            const motherDob = ref( new Date() )

            const father = reactive({
                lastname : '' ,
                firstname : '' ,
                enlastname : '' ,
                enfirstname : '' ,
                profession : '' ,
                dob: '' ,
                national: '' ,
                nationality: '' ,
                pob: '' ,
                address: '' ,
                death : ''
            })
            const mother = reactive({
                lastname : '' ,
                firstname : '' ,
                enlastname : '' ,
                enfirstname : '' ,
                profession : '' ,
                dob: '' ,
                national: '' ,
                nationality: '' ,
                pob: '' ,
                address: '' ,
                death : ''
            })

            function save(){

            }
            
            return {
                father , 
                mother ,
                fatherDob , 
                motherDob ,
                dateFormat ,
                save
            }
        }
    }
</script>
<style scoped >
</style>