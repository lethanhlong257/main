
export default class HotItem extends React.Component {
    render() {
        return (
            <div>
                <img src="images/item.jpg" alt="hinh anh" class="img-responsive" />
                <h3 class="news-title">{this.props.title}</h3>
                <p class="news-time">{this.props.date}</p>
            </div>
        )
    }
}