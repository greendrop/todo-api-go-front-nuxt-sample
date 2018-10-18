import moment from 'moment'

export default class {
  static datetime(val, format = 'YYYY/MM/DD HH:mm') {
    return moment(val).format(format)
  }
}
