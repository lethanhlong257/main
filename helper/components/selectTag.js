import OptionTag from './optiontag'

export default class SelectTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectTagArr: ['Bóng đá tổng hợp', 'Bóng đá ngoại hạng Anh', 'Bóng đá Tây Ban nha', 'Bóng đá Đức', 'Bóng đá Italy', 'Bóng đá Việt Nam'] }
    }

    render() {
        return (
            <select>
                {this.state.selectTagArr.map((e, i) => <OptionTag key={i}>{e}</OptionTag>)}
            </select>
        )
    }
}