export default class OptionTag extends React.Component {
    render() {
        return (
            <option value={this.props.children}>{this.props.children}</option>
        )
    }
}
