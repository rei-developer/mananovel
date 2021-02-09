module.exports.getBGPos = pos => {
  let result = 'unset'
  switch (pos) {
    case 1:
      result = 'left top'
      break
    case 2:
      result = 'center top'
      break
    case 3:
      result = 'right top'
      break
    case 4:
      result = 'left center'
      break
    case 5:
      result = 'center center'
      break
    case 6:
      result = 'right center'
      break
    case 7:
      result = 'left bottom'
      break
    case 8:
      result = 'center bottom'
      break
    case 9:
      result = 'right bottom'
      break
  }
  return result
}
