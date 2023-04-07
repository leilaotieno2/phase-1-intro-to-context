function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(emp => createEmployeeRecord(emp))
  }
  
  function createTimeInEvent(emp, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ')
    emp.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    })
    return emp
  }
  
  function createTimeOutEvent(emp, dateTimeStr) {
    let [date, hour] = dateTimeStr.split(' ')
    emp.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    })
    return emp
  }
  
  function hoursWorkedOnDate(emp, date) {
    let inEvent = emp.timeInEvents.find(event => event.date === date)
    let outEvent = emp.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour) / 100
  }
  
  function wagesEarnedOnDate(emp, date) {
    let hoursWorked = hoursWorkedOnDate(emp, date)
    return hoursWorked * emp.payPerHour
  }
  
  function allWagesFor(emp) {
    let dates = emp.timeInEvents.map(event => event.date)
    let wages = dates.map(date => wagesEarnedOnDate(emp, date))
    return wages.reduce((total, wage) => total + wage)
  }
  
  function calculatePayroll(emps) {
    let wages = emps.map(emp => allWagesFor(emp))
    return wages.reduce((total, wage) => total + wage)
  }
  