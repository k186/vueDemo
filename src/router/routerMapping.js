import App from '../view/home/home'
import ios from '../view/pickerMobile/mobilePickerDemo'
import pcPicker from '../view/datepickerPC/datepicker'
import number2words from '../view/number2words/numberword'
export default {
    name: 'routerMapping',
    routes(){
        return [
            {
                path: "/",
                redirect: "/home"
            },
            {
                path: "/home",
                component: App,
                meta: {
                    title: 'K186 Studio'
                }
            },
            {
                path: "/ios",
                component: ios,
                meta: {
                    title: 'ios Picker'
                }
            },
            {
                path: "/pcPicker",
                component: pcPicker,
                meta: {
                    title: 'pc Picker'
                }
            },
            {
                path: "/number2words",
                component: number2words,
                meta: {
                    title: '数字转换'
                }
            },
            {
                path: "*",
                redirect: "/home"
            }
        ]
    }
    //todo lazy load
    /*config nav ../view/home/home.vue */

}