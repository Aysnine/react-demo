import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Hello extends Component {

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
