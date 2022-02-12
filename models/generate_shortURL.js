function sample(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function generateShortURL() {
  const words = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let wordsArray = []
  wordsArray = wordsArray.concat(...words)
  let route = ''
  for (let i = 0; i < 5; i++) {
    route += sample(wordsArray)
  }
  return route
}

module.exports = generateShortURL