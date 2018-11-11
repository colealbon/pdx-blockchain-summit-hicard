import React, { Component } from 'react';
import Game from './Game.jsx';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile,
} from 'blockstack';

const uuidv4 = require('uuid/v4');
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
export default class Profile extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  me: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	}
  	  },
  	};
  }

  isLocal() {
    return this.props.match.params.username ? false : true
  }

  saveGameResults(shufflerBytes, opponentId) {
     let allGames = this.state.games || [];

     let newGame = {
       id: uuidv4(),
       shuffler: shufflerBytes,
       created_at: Date.now(),
       opponent: opponentId
     }

     allGames.unshift(newGame)
     const options = { encrypt: false }
     putFile('high-cards.json', JSON.stringify(allGames), options)
       .then(() => {
         this.setState({
           games: allGames
         })
       })
   }

  renderPerson(person, username) {
    const { handleSignOut } = this.props;

    return (
      <div className="col-md-12">
        <div className="avatar-section">
          <img
            src={ person != null && person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage }
            className="img-rounded avatar"
            id="avatar-image"
          />
          <div className="username">
            <h1>
              <span id="heading-name">{ person != null && person.name() ? person.name()
                : 'Nameless Person' }</span>
            </h1>
            <span>{username}</span>
            {this.isLocal() &&
              <span>
                &nbsp;|&nbsp;
                <a onClick={ handleSignOut.bind(this) }>(Logout)</a>
              </span>
            }
          </div>
        </div>
    </div>);
  }

  render() {
   const { me } = this.state;
   const { username } = this.state;

   return (
     !isSignInPending() && me ?
     <div className="container">
       <div className="row">
         <div className="col-md-5">
           {this.renderPerson(this.state.me, this.state.myUsername)}
         </div>
         <div className="col-lg-2"><h2>vs.</h2></div>
         <div className="col-md-4">
           {this.renderPerson(this.state.them, this.state.theirUsername)}
         </div>
       </div>
       <div className="row">
         <Game></Game>
       </div>
     </div> : null
   );
  }

  fetchData() {
    //fetch my data
      const options = { decrypt: false }
      getFile('high-cards.json', options)
        .then((file) => {
          var games = JSON.parse(file || '[]')
          this.setState({
            me: new Person(loadUserData().profile),
            myUsername: loadUserData().username,
            games: games
          })
        });

    //fetch their data
      const username = this.props.match.params.username
      lookupProfile(username)
      .then((profile) => {
        this.setState({
          them: new Person(profile),
          theirUsername: username
        })
      })
      .catch((error) => {
        console.log('could not resolve profile')
      })
      .finally(() => {
        this.setState({ isLoading: false })
      });

      const options2 = { username: username, decrypt: false }
      getFile('high-cards.json', options2)
      .then((file) => {
         var deseralizedGames = JSON.parse(file || '[]')
         this.setState({
           games: deseralizedGames
         })
      })
      .catch((error) => {
          console.log('could not fetch games')
      })
      .finally(() => {
        this.setState({ isLoading: false })
      });
  };

  componentDidMount() {
    this.fetchData();
    //this.saveGameResults("D95849AA570A03231B69C65749054A6C8770C7345F8673EC12FA94B302A1ECCC9A90AF79B356FE648479EA59AF6BE7094AD323C3AC4B7373016D6A078625BF43", "jhager.id.blockstack")
  }
}
