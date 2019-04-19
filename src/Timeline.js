'use strict';

const e = React.createElement;
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { publicRepos: null };
  }

  handleChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleSubmit = () => {
    const url = `https://api.github.com/users/${this.state.username}/repos`;
    const options = {
      headers: {
        'Content-Type': 'application/vnd.github.v3.raw+json',
      },
      referrer: 'no-referrer',
    };
    return fetch(url, options)
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      }).then((repos) => {
        const publicRepos = repos.filter(repo => !repo.private && !repo.fork);
        this.setState({publicRepos: publicRepos});
      })
  }

  addToTimeline = () => {
    if (this.state.publicRepos === null) return;

    return (
      <div id="timeline">
        <div className="timeline-container">
          {this.state.publicRepos.map((data, idx) => {
            return (
              <div className="timeline-item" key={idx}>
                <div className="timeline-item-content">
                  <time>{data.createdAt}</time>
                  <p>{data.name}</p>
                  <a
                    href={data.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    link
                  </a>
                  <span className="circle" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div id="content">
        <input type="text" onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Search</button>
        {this.state.publicRepos && this.addToTimeline()}
      </div>
    );
  }
}

const domContainer = document.querySelector('#body');
ReactDOM.render(e(Timeline), domContainer);
