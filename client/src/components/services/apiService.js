let axios = require('axios').default
let basicUrl = 'http://localhost:8083/users/'
let api = 'https://randomuser.me/api/?results=20&nat=us';

 async function getObject(api){
    return await (await fetch (api)).json();
}

export async function saveUser(userName,password){
    axios.post(`${basicUrl}saveUser`,{
        user:{
            userName:userName,
            password:password
        }
    })
}

export async function findUser(userName,password){
    let myData = await axios.get(`${basicUrl}getUser/${userName}/${password}`).then(user=>{
          return user.data.data.length > 0 ? user : false})
          .catch(err=>{console.log(err)})
    return myData?.data?.data[0]
}

export async function isExists(userName){
    let myData = await axios.get(`${basicUrl}getUser/${userName}`).then(user=>{
          return user.data.data.length > 0 ? true : false})
          .catch(err=>{console.log(err)})
    return myData
}


export default getObject(api);



