export default class TableRank extends React.Component {
    render() {
        return (
            <div class="col-md-3 article-ranking">
                <h2 class="brand-ranking">Bảng xếp hạng</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Vị trí</th>
                            <th>Tên đội</th>
                            <th>Điểm số</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>BAR</td>
                            <td>69</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>REAL</td>
                            <td>65</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>ALT</td>
                            <td>60</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}