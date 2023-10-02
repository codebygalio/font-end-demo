import dayjs from 'dayjs'
export function formatDate(date){
    return dayjs(date).format('YYYY-MM-DD')
}

export function importFile(file, obj, callback, func) {
    if (file.size < 10100000) {
      var fileName = file.name
      var suffix = fileName
        .substring(fileName.lastIndexOf('.') + 1)
        .toUpperCase()
      if (
        suffix === 'XLS' ||
        suffix === 'XLSX'
      ) {
        return true
      } else {
        var tipType = '文件类型不正确,请重新上传'
        callback(tipType)
        return false
      }
    } else {
      var tipSize = '文件大小超过10M,请重新上传'
      callback(tipSize)
      return false
    }
  }


  export function getIntegerPoint(e, callback) {
    e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null
  }

  export function getInteger(e, callback) {
    let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
    if (!boolean) {
      var tipType = '请输入正整数'
      callback(tipType)
      e.target.value = ''
    }
  }