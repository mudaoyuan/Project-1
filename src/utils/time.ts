/* eslint-disable prefer-const */
export const getTime = () => {
  let message = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    message = '晚上'
  }
  return message
  console.log(message)
}
