//const fetch = require('isomorphic-fetch')
exports.getAllData = ()=>(
    fetch('http://localhost:3000/api/news')// eslint-disable-line
        .then(data => data.json())
)


exports.login = (user)=>{
    
    const option ={
        header: {
            Accept: 'Application/json',
            'Content-Type': 'application/json',
        }, 
        method: 'POST',
        body: user
       
    }
    return fetch('http://localhost:3000/login', option)
}