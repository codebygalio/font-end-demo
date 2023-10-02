// require('./style.css')
import './style.scss'
// import './style.css'

function test() {
    console.log('testt')
}
test()
const myPromise = new Promise((resolve, reject) => {
    resolve(1)
})
myPromise.then(res => console.log(res))


// const zerozero = require('./img/0000.jpg')
// let newImage = new Image()
// newImage.src = zerozero
// const getBody =  document.querySelector('body')
// getBody.appendChild(newImage)