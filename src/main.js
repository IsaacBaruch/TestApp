import React from 'react';
import ReactDOM from 'react-dom';

import Textbox from './components/textbox';

import style from './scss/main.scss';

class App extends React.Component {
    constructor(props) {
  		super(props);

        this.onColorChanged = this.onColorChanged.bind(this);

        this.state = {
            color: props.color
        }
    }

    render () {
        let { color } = this.state;

        let validateColor = (colorString) => {
            var reg = new RegExp('^#[0-9|a-f|A-F]{8}$');
            return reg.test(colorString);
        }

        return (<main>
                    <header />
                    <Textbox placeholder={ "Please select a color" } onInputChanged={ this.onColorChanged }  validation={ validateColor } />
                    <bgcolor style={{ backgroundColor: this._getCssColor(color)}} />
                    <footer />
                </main>
        );
    }

    onColorChanged (color) {
        this.setState({ color });
    }

    _parseStringToRgba(hex) {
        if (hex[0] == "#") {
            hex = hex.substr(1);
        }
        var red = Number("0x" + hex.substr(0,2));
        var green = Number("0x" + hex.substr(2,2));
        var blue = Number("0x" + hex.substr(4,2));
        var alpha = Number("0x" + hex.substr(6,2)) / 255;
        return [red, green, blue, alpha];
    }

    _getCssColor (hex) {
        var color = this._parseStringToRgba(hex);
        return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
    }
}

App.defaultProps = {
    color: "00000000"
};

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.body.querySelector("#root"));
})
