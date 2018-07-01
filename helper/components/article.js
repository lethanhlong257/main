import HotItem from './hotItem'// eslint-disable-line
import ItemList from './itemlist'// eslint-disable-line
import TableRank from './tableRank'// eslint-disable-line
import SelectTag from './selectTag' // eslint-disable-line
import { connect } from 'react-redux'




class Article extends React.Component {// eslint-disable-line

    render() {
        return (
            <div class="news-part">
                <div class="container">
                    <div class="row">
                        {/* {<!-- start tin tuc bong da -->} */}
                        <div class="col-md-9 article-hot-news">
                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <h2 class="brand-news">Tin tức bóng đá</h2>
                                </div>  
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 category-item">
                                    <SelectTag />
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 view-all-news">
                                    <a href="#">Xem tất cả</a>
                                </div>
                            </div>
                            <div class="row article">
                                <div id='hot-item' class="col-xs-6 col-sm-6 col-md-6 col-lg-6 hot-item">
                                    <HotItem title={this.props.news[0].title} date={this.props.news[0].date}/>    
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div id="item" class="row item">
                                        <ItemList />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {{//<!-- end tin tuc bong da -->}} */}
                        {/* {<!-- start bang xep hang -->} */}
                        <div id='table-rank'>
                            <TableRank />              
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = connect(function (state) { 
    return{news: state}
})(Article)