export default {
  outime() {
    let newTime = new Date()
    let min = newTime.getMinutes()
    let hour = newTime.getHours()
    // 开盘时间 9.30-11.30   13：00-15:00
    if (hour > 8 && hour < 16 && hour !== 12) {
      let bool = hour === 9 ? (min > 30) : (hour === 11 ? (min < 30) : true)
      return bool
    } else {
      return false
    }
  }
}
