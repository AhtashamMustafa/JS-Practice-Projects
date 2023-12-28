const getJobData = fetch('https://maroon-shorts.cyclic.cloud/api/jobAds/all?limit=10&pageNo=1&keyWord=react&category=').then ((response)=>{
    return response.json()
}).then((data)=>{
    console.log(data.data,"==>data")
    // jobData(data)
})

const jobData = (data)=>{
    console.log(data.data[0].designation)
    // document.querySelector('card-header').innerHTML= data.data[0].companyName
}