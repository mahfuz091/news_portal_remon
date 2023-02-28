let fetchData = [];
const fetchCatagories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
    .then(res => res.json())
    .then(data => showCatagories(data.data))

}

const showCatagories = (data) =>{
    // console.log(data.news_category);

    data.news_category.forEach(singleCategory => {
        // console.log(singleCategory.category_id)
        document.getElementById("catagories-container").innerHTML += `
        <a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')">${singleCategory.category_name}</a>
    `
    })


    
}

const fetchCategoryNews = (category_id, category_name) =>{
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
   fetch(url)
   .then(res=>res.json())
   .then(data=> {
    fetchData = data.data;
    showAllNews(data.data, category_name)})

    // console.log (category_id, category_name)
}
const showAllNews= (data, category_name)=>{
    // console.log(data)
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
    const newsContainer = document.getElementById("all-news");
    newsContainer.innerHTML =""
    data.forEach(singleNews =>{
        const { _id, image_url, title, details, author, total_view } = singleNews;
        // console.log(singleNews)
        newsContainer.innerHTML +=`
        <div class="card mb-3" >
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${image_url}" class="img-fluid p-2 rounded-4" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0, 500)}...</p>
                <div class="card-footer border-0 bg-body d-flex justify-content-between">
                   <div class="d-flex gap-2">
                        <img class="rounded-circle " height="40" width="40" src="${author.img}"></img>
                        <div>
                            <P class="m-0 p-0">${author.name}</P>
                            <P class="m-0 p-0">${author.published_date}<?p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fas fa-eye"></i>
        
                        <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
                    </div>
                    <div>
        
        <i class="fas fa-arrow-right" onclick="fetchNewsDetail('${_id}')" data-bs-toggle="modal"
        data-bs-target="#exampleModal"></i>
        </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
    })


    
}
const fetchNewsDetail = news_id =>{
    const url =`https://openapi.programming-hero.com/api/news/${news_id}`
    // console.log(news_id)
    fetch(url)
    .then(res=>res.json())
    .then(data=>showNewsDetail(data.data[0]))
}
const showNewsDetail=(data)=>{
    console.log(data)
    const { _id, image_url, title, details, author, total_view, others_info } = data;
    document.getElementById("modal-body").innerHTML = `
    <div class= "card mb-3">

    <div class="row g-0">
    <div class="col-md-12">
      <img src=${image_url} class="img-fluid rounded-start p-4" alt="..." />
    </div>
    <div class="col-md-12 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title} <span class="badge text-bg-warning">
        ${others_info.is_trending ? "Trending" : "Not trending"}</span></h5>
        <p class="card-text">
          ${details}
        </p>
        
      </div>
      <div class="card-footer border-0 bg-body d-flex justify-content-between">
        <div class="d-flex gap-2">
        <img src=${
          author.img
        } class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
        <div>
        <p class="m-0 p-0">${author.name ? author.name : "Not available"}</p>
        <p class="m-0 p-0">${author.published_date}</p>
        </div>
        
        </div>
        <div class="d-flex align-items-center">
            <i class="fas fa-eye"></i>
            
            <p class="m-0 p-0">${total_view}</p>
        </div>
        <div>
            <i class="fas fa-star"></i>
        
        </div>
        
      </div>
    </div>
  </div>
  </div>
  `;

}
const showTrending=()=>{
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const category_name = document.getElementById("category-name").innerText;
    showAllNews(trendingNews, category_name);

}