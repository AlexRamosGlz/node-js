
const locationForm = document.querySelector('input');
const bottonSearch = document.querySelector('.button')



const postInfo = (res) => {
  console.log(res)
}

const setLocation  = (e) => {
  e.preventDefault();

  console.log(locationForm.value);

  const getForecast = new  Promise((resolve, reject) => {
  
  const data = fetch('http://localhost:3000/weather?address='+locationForm.value).then(res => res.json()).then(data => data);
  
  if(data)
  resolve(data);
  
  reject(error);
  })

  getForecast.then((data) => postInfo(data))
}

bottonSearch.addEventListener("click", (e) => setLocation(e))