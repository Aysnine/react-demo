import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Hello extends Component {

    // class 组件使用箭头函数
    hello = () => {
      // ...
    }

    render() {
        // 准备 local 变量
        const { greeting } = this.props;

        // -----

        // 直接使用变量
        return (
            <div>
                { greeting }
            </div>
        );
    }
}

const App = () => (
    <Hello greeting='hello' />
);

ReactDOM.render(<App />, document.getElementById('app'));
