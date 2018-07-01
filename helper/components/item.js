
export default class Item extends React.Component {
    render() {
        return (
            <div class = "row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <img src="images/item.jpg" alt="hinh anh" class="img-thumbnail" />
                </div>

                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <h4>{this.props.title}</h4>
                    <p class="news-time">{this.props.date}</p>
                </div>
            </div>
        )
    }
}