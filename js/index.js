var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Header = function Header() {return React.createElement('h1', null, 'Pomodoro Timer');};

var SetTimer = function SetTimer(_ref) {var type = _ref.type,value = _ref.value,handleClick = _ref.handleClick;return (
    React.createElement('div', { className: 'SetTimer' },
      React.createElement('div', { id: type + '-label' }, ' ', type === 'session' ? 'Session ' : 'Break ', 'Length '),
      React.createElement('div', { className: 'SetTimer-controls' },
        React.createElement('button', { id: type + '-decrement', onClick: function onClick() {return handleClick(false, type + 'Value');} }, '\u2193'),
        React.createElement('div', { id: type + '-length' }, value),
        React.createElement('button', { id: type + '-increment', onClick: function onClick() {return handleClick(true, type + 'Value');} }, '\u2191'))));};




var Timer = function Timer(_ref2) {var mode = _ref2.mode,time = _ref2.time;return (
    React.createElement('div', { className: 'Timer' },
      React.createElement('h1', { id: 'timer-label' }, mode === 'session' ? 'Session' : 'Break'),
      React.createElement('h1', { id: 'time-left' }, time)));};



var Controls = function Controls(_ref3) {var active = _ref3.active,handleReset = _ref3.handleReset,handlePlayPause = _ref3.handlePlayPause;return (
    React.createElement('div', { calssName: 'Controls' },
      React.createElement('button', { id: 'start_stop', onClick: handlePlayPause },
        active ? React.createElement('span', null, '\u275A\u275A') : React.createElement('span', null, '\u25BA')),

      React.createElement('button', { id: 'reset', onClick: handleReset }, '\u21BB')));};var




App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));_this.






















    handleSetTimers = function (inc, type) {
      if (_this.state[type] === 60 && inc) return;
      if (_this.state[type] === 1 && !inc) return;
      _this.setState(_defineProperty({}, type, _this.state[type] + (inc ? 1 : -1)));
    };_this.

    handleReset = function () {
      _this.setState({
        breakValue: 5,
        sessionValue: 25,
        time: 1000 * 60 * 25,
        touched: false,
        active: false,
        mode: 'session' });


      clearInterval(_this.pomodoro),
      _this.audio.pause(),
      _this.audio.currentTime = 0;

    };_this.

    handlePlayPause = function () {
      if (_this.state.active) {
        clearInterval(_this.pomodoro);
        _this.setState({ active: false });
      } else {
        if (_this.state.touched) {
          _this.pomodoro = setInterval(function () {return _this.setState({ time: _this.state.time - 1000 });}, 1000);
          _this.setState({ active: true });
        } else {
          _this.setState({
            time: _this.state.sessionValue * 60 * 1000,
            touched: true,
            active: true }, function () {return _this.pomodoro = setInterval(function () {return _this.setState({ time: _this.state.time - 1000 });}, 1000);});


        }
      }
    };_this.state = { breakValue: 5, sessionValue: 25, mode: 'session', time: 1000 * 60 * 25, active: false, touched: false };return _this;}_createClass(App, [{ key: 'componentDidUpdate', value: function componentDidUpdate(prevProps, prevState) {if (prevState.time === 0 && prevState.mode === 'session') {this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' });this.audio.play();}if (prevState.time === 0 && prevState.mode === 'break') {this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session' });this.audio.play();}} }, { key: 'render', value: function render()

    {var _this2 = this;
      return (
        React.createElement('div', null,
          React.createElement(Header, null),
          React.createElement('div', { className: 'settings' },
            React.createElement(SetTimer, { type: 'break', value: this.state.breakValue, handleClick: this.handleSetTimers }),
            React.createElement(SetTimer, { type: 'session', value: this.state.sessionValue, handleClick: this.handleSetTimers })),

          React.createElement(Timer, { mode: this.state.mode, time: moment(this.state.time).format('mm:ss') }),
          React.createElement(Controls, {
            active: this.state.active,
            handlePlayPause: this.handlePlayPause,
            handleReset: this.handleReset }),

          React.createElement('audio', {
            id: 'beep',
            src: 'https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3',
            ref: function ref(el) {return _this2.audio = el;} })));




    } }]);return App;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));