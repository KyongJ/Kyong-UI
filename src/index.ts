import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import './styles/roboot.less'
import './styles/index.less'

library.add(fas)

export {default as Button} from './components/Button/'
export {default as Icon} from './components/Icon/'
export {default as Input} from './components/Input/'
export {default as InputDatePicker} from './components/InputDatePicker/'
export {default as Select} from './components/Select'
export {default as Option} from './components/Select/selectOption'
export {default as Progress} from './components/Progress'

