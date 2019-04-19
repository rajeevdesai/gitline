'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Timeline = function (_React$Component) {
  _inherits(Timeline, _React$Component);

  function Timeline(props) {
    _classCallCheck(this, Timeline);

    var _this = _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, props));

    _this.handleChange = function (event) {
      _this.setState({ username: event.target.value });
    };

    _this.handleSubmit = function () {
      var url = 'https://api.github.com/users/' + _this.state.username + '/repos';
      var options = {
        headers: {
          'Content-Type': 'application/vnd.github.v3.raw+json'
        },
        referrer: 'no-referrer'
      };
      return fetch(url, options).then(function (response) {
        if (response.ok) {
          return response.json();
        }
      }).then(function (repos) {
        var publicRepos = repos.filter(function (repo) {
          return !repo.private && !repo.fork;
        });
        _this.setState({ publicRepos: publicRepos });
      });
    };

    _this.addToTimeline = function () {
      if (_this.state.publicRepos === null) return;

      return React.createElement(
        'div',
        { id: 'timeline' },
        React.createElement(
          'div',
          { className: 'timeline-container' },
          _this.state.publicRepos.map(function (data, idx) {
            return React.createElement(
              'div',
              { className: 'timeline-item', key: idx },
              React.createElement(
                'div',
                { className: 'timeline-item-content' },
                React.createElement(
                  'time',
                  null,
                  data.createdAt
                ),
                React.createElement(
                  'p',
                  null,
                  data.name
                ),
                React.createElement(
                  'a',
                  {
                    href: data.html_url,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  },
                  'link'
                ),
                React.createElement('span', { className: 'circle' })
              )
            );
          })
        )
      );
    };

    _this.state = { publicRepos: null };
    return _this;
  }

  _createClass(Timeline, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'content' },
        React.createElement('input', { type: 'text', onChange: this.handleChange }),
        React.createElement(
          'button',
          { onClick: this.handleSubmit },
          'Search'
        ),
        this.state.publicRepos && this.addToTimeline()
      );
    }
  }]);

  return Timeline;
}(React.Component);

var domContainer = document.querySelector('#body');
ReactDOM.render(e(Timeline), domContainer);