class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const color = this.props.article.stocked ? 'dark' : 'red';
        return <React.Fragment>
            <tr>
                <td style={{color: color}}>{this.props.article.name}</td>
                <td>{this.props.article.price}</td>
            </tr>
        </React.Fragment>
    }
}

class Category extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr align="center">
                <th colSpan="2"><b>{this.props.category}</b></th>
            </tr>
        )
    }
}

class Articles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let categories = [];
        return (
            this.props.articles.map((article, key) => {
                if(article.stocked || !this.props.display) {
                    if(article.name.includes(this.props.filter)) {
                        if (categories.includes(article.category)) {
                            return (<Article article={article} key={key}/>)
                        } else {
                            categories.push(article.category)
                            return (
                                <React.Fragment key={article.category}>
                                    <Category category={article.category} />
                                    <Article article={article} key={key}/>
                                </React.Fragment>
                            )
                        }
                    }
                }
            })
        )
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [
                {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
                {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
                {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
                {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
            ],
            search: '',
            onlyStock: true,
        }
    }

    onlyInStock(e) {
        if (this.state.onlyStock) {
            this.setState({
                    onlyStock: false
                }
            )
        } else {
            this.setState({
                    onlyStock: true
                }
            )
        }
    }

    search(e) {
        this.setState({
            search: e.target.value
        })
    }

    render() {
        return <div className="sm-2">
            <div className="form-group">
                <input className="form-control" type="text" value={this.state.search} onChange={this.search.bind(this)}/>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.onlyStock} onChange={this.onlyInStock.bind(this)}/>
                <label className="form-check-label">N'afficher que les produits en stock ?</label>
            </div>
                <br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Articles articles={this.state.articles} display={this.state.onlyStock} filter={this.state.search}/>
                    </tbody>
                </table>
            </div>
    }
}

ReactDOM.render(<Home/>, document.querySelector('#app'));