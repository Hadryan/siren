import {observable} from 'mobx'

class Todo {
  id = Math.random()
  @observable title = "title"
}

export default new Todo()