/*lazy loading*/
const App = resolve => require(['../view/home/home'], resolve);
const ios = resolve => require(['../view/pickerMobile/mobilePickerDemo'], resolve);
const pcPicker = resolve => require(['../view/datepickerPC/datepicker'], resolve);
const number2words = resolve => require(['../view/number2words/numberword'], resolve);
export default {
    name: 'routerMapping',
    routes(){
        return [
            {
                path: "/",
                name:'aaa',
                redirect: "/home"
            },
            {
                path: "/home",
                name:'home',
                component: App,
                meta: {
                    title: 'K186 Studio'
                }
            },
            {
                path: "/ios",
                name:'iosPicker',
                component: ios,
                meta: {
                    title: 'ios Picker'
                }
            },
            {
                path: "/pcPicker",
                name:'pcPicker',
                component: pcPicker,
                meta: {
                    title: 'pc Picker'
                }
            },
            {
                path: "/number2words",
                name:'number2words',
                component: number2words,
                meta: {
                    title: '数字转换'
                }
            },
            {
                path: "*",
                name:'all',
                redirect: "/home"
            }
        ]
    }
    /*config nav ../view/home/home.vue */

}