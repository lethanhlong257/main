import Item from './item'
//import getLast4News from '../api/api'
import { connect } from 'react-redux'

class ItemList extends React.Component {

    render() {
        return (
            <div>
                {this.props.news.map((data, index) => 
                    <Item key={index} title = {data.title} date={data.date} />
                )}
            </div>
        )
    }
}

module.exports = connect(function (state) { 
    return{news: state}
})(ItemList)