/**
 * createStore：创建 vuex
 */
import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      name: 'coderhtf'
    }
  }
})

export default store
