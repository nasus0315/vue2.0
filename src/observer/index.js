import {
    arrayMethods
} from './array'
class Observer {
    constructor(value) {
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false, // 不能被枚举表示 不能被循环
            configurable: false, // 不能删除此属性
        })
        if (Array.isArray(value)) {
            Object.setPrototypeOf(value, arrayMethods);
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }
    observeArray(data) {
        data.forEach(item => {
            observe(item)
        })
    }
    walk(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}


function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            console.log('get')
            return value
        },
        set(newValue) {
            console.log('set')
            if (value === newValue) return;
            observe(newValue);
            value = newValue
        }
    })
}
export function observe(data) {
    if (typeof data !== 'object' || data == null) {
        return;
    }
    if (data.__ob__) { 
        return;
    }
    return new Observer(data)
}
