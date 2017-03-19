var React = require('react');
var ReactDom = require('react-dom');
var data = [
    {category:"Sporting Goods", price:"$49.99", stocked:true, name:"Football"},
    {category:"Sporting Goods", price:"$8.99", stocked:true, name:"Baseball"},
    {category:"Sporting Goods", price:"$29.99", stocked:false, name:"Basketball"},
    {category:"Electronic Goods", price:"$99.99", stocked:true, name:"ipad touch"},
    {category:"Electronic Goods", price:"$322.99", stocked:false, name:"iphone 6"},
    {category:"Electronic Goods", price:"$199.99", stocked:true, name:"huawei 5x"}
];


var ProductCategory = React.createClass({
    render: function(){
        return (
            <tr>
                <td  style={{fontWeight:900, color:'#0ff'}}>{this.props.category}</td>
            </tr>
        ) 
    }
})


var ProductItem = React.createClass({
    render: function(){
        return (
            <tr style={(this.props.stocked)?{textAlign:"center"}:{color:'red',textAlign:"center"}}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
})


var ProductMSg = React.createClass({
    componentWillMount: function(){
        this.onChangeItem();
    },
    componentWillUpdate: function(nextProps, nextState){
        this.props = nextProps;
        this.onChangeItem();
        return true;
    },
    onChangeItem: function(nextProps){
        var data = this.props.data;
        var showState = this.props.onlyShowStocked;
        var rows = [];
        var store = '';
        var _self = this;
        data.forEach(function(ele, index){
            if(ele.category !== store){
                rows.push(<ProductCategory key={index} category={ele.category}></ProductCategory>);
            }
            store = ele.category;
            var name = ele.name.toUpperCase();
            var iname = _self.props.onTextChange.toUpperCase();
            if(name.indexOf(iname) !== -1){
                if(!showState || (showState && ele.stocked)){
                    rows.push(<ProductItem key={index + 1000} name={ele.name} price={ele.price} stocked={ele.stocked}></ProductItem>)
                }
            }
        })
        this.rows = rows;
    },
    render: function(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.rows
                    }
                </tbody>
            </table>
        )
    }
})


var Selector = React.createClass({
    onChangeIpt: function(){
        this.props.onTextChange(this.refs.ipt.value)
    },
    render: function(){
        return(
            <div>
                <input type="text" ref="ipt" onChange={this.onChangeIpt}/><br/>
                <input type="checkbox" onClick={this.props.onChangeShow}/>
                <span>Display stock</span>
            </div>
        )
    }
})


var App = React.createClass({
    getInitialState: function(){
        return {
            onlyShowStocked: false,
            filerText: ''
        }
    },
    onChangeShow: function(){
        this.setState({
            onlyShowStocked: !this.state.onlyShowStocked
        })
    },
    onTextChange: function(value){
        this.setState({
            filerText: value
        })
    },
    render: function(){
        return (
            <div>
                <Selector onChangeShow={this.onChangeShow} onTextChange={this.onTextChange}/>
                <ProductMSg data={this.props.data} onlyShowStocked={this.state.onlyShowStocked} onTextChange={this.state.filerText}/>
            </div>
        )
    }
})


ReactDom.render(
    <App data = {data}/>,
    document.getElementById('root')
)