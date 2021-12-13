var { hidefile } = require('./build/index')

async function fc() {
  return await hidefile(`${process.cwd()}\\byebye.js`)
}

fc().then(v => console.log(v))