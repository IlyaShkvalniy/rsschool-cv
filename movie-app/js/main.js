console.log('70/60\n\nВерстка соблюдена+10\n\nПри загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\n\nЕсли в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\n\nПри открытии приложения курсор находится в поле ввода +5(это значит input в фокусе, а не старница управляет курсором мыши)\n\nЕсть placeholder +5\n\nАвтозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n\nПоисковый запрос можно отправить нажатием клавиши Enter +5\n\nПосле отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n\nВ поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n\nДополнительным функционалом может быть, например, наличие на карточке фильма его описания и рейтинга на IMDb (вытянул из api всю полезную игформацию, что и было в демо) так же адаптивно до ширины 320 +10')

const searchOn = document.getElementById("search")
let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
const mainMain = document.querySelector('.main')
const form = document.querySelector('.form')
const searchIcon = document.querySelector('.form__icon')

const getColor= (num) => { 
    if(num >= 8) return 'green'
    if(num < 8 && num >= 5) return 'yellow'
    if(num < 5) return 'red'
}

const showData = d  => { 
    const arr = d.results

    for(let i = 0; i < arr.length ; i++){
        createEl(arr[i])
    }
}


const dataRm = () => { 
    const rem = document.querySelectorAll('.main__element')
    for (let i =0; i < rem.length ; i++){ 
        rem[i].remove()
    }
}
const createTag = (str, str2) => { 
    const smtg = document.createElement(str);
    smtg.classList.add(str2)
    return smtg
}

const appendElement = (el, el2) => { 
    el.append(el2)
}

const createEl = (obj) => {
    const divWrapper = createTag('div','main__element')
    const divInfo = createTag('div','main__element-info')   
    const divOverview = createTag('div','main__element-overview')
    const mainImg = createTag('img', 'main__element-img')
    const infoTitle = createTag('h3', 'main__element-title')
    const infoRating = createTag('span', 'main__element-rating')
    const overviewInfo = createTag ('p', 'main__element-about')
    const votes = createTag('div', 'main__element-votes')
    const overviewTitle = createTag('div', 'main__element-overtitle')

    
    appendElement(mainMain, divWrapper)
    appendElement(divWrapper,mainImg)
    appendElement(divWrapper ,divInfo)
    appendElement(divWrapper ,divOverview)     
    appendElement( divInfo ,infoTitle)
    appendElement(divInfo ,infoRating)
    appendElement(divOverview, votes)
    appendElement(divOverview, overviewTitle)
    appendElement( divOverview ,overviewInfo)

    if ( obj.poster_path === null){mainImg.src = './icons/not-found.jpg'}
    else{mainImg.src = `https://image.tmdb.org/t/p/w1280${obj.poster_path}`}
    votes.textContent = `Rating: ${obj.vote_average} | ${obj.vote_count} votes`
    overviewTitle.textContent = 'Overview'
    infoTitle.textContent = `${obj.original_title}`
    infoRating.textContent = `${obj.vote_average}`
    infoRating.classList.add(getColor(obj.vote_average))
    overviewInfo.textContent = `${obj.overview}`
}




const submit = el => { 
    const text = document.getElementById('search').value    
    url = `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`
    el.preventDefault()
    dataRm()
    getData()
}

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    showData(data)
}

getData()
form.onsubmit = submit;
window.onload = (e) => { 
    searchOn.focus()
}
searchIcon.addEventListener('click', () => { searchOn.focus()})