import Menu from './components/menu'
import Carousel from './components/carousel'
import Footer from './components/footer'
import Article from './components/article'
import { Provider } from 'react-redux'
import store from './reducer/redux'



const newsCatSoccer = ['Bóng đá tổng hợp', 'Bóng đá ngoại hạng Anh', 'Bóng đá Tây Ban nha', 'Bóng đá Đức', 'Bóng đá Italy', 'Bóng đá Việt Nam' ]


ReactDOM.render(
    < Menu/>
    ,document.getElementById('menu')
)

ReactDOM.render(
    <Carousel/>
    ,document.getElementById('carousel')
)

ReactDOM.render(
    <Footer/>
    ,document.getElementById('footer')
)

ReactDOM.render(
    <Provider store={store}><Article /></Provider>
    ,document.getElementById('articles')
)


