import React, { Component } from 'react';
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
  	  person: {
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
       text: shufflerBytes,
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

  render() {
   const { handleSignOut } = this.props;
   const { person } = this.state;
   const { username } = this.state;

   return (
     !isSignInPending() && person ?
     <div className="container">
       <div className="row">
         <div className="col-md-offset-3 col-md-6">
           <div className="col-md-12">
             <div className="avatar-section">
               <img
                 src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage }
                 className="img-rounded avatar"
                 id="avatar-image"
               />
               <div className="username">
                 <h1>
                   <span id="heading-name">{ person.name() ? person.name()
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
           </div>
           {
             this.isLocal()
           }
         </div>
       </div>
     </div> : null
   );
  }

  fetchData() {
    if (this.isLocal()) {
      const options = { decrypt: false }
      getFile('high-cards.json', options)
        .then((file) => {
          var games = JSON.parse(file || '[]')
          this.setState({
            person: new Person(loadUserData().profile),
            username: loadUserData().username,
            games: games
          })
        })
    }
    else {
      const username = this.props.match.params.username
      lookupProfile(username)
      .then((profile) => {
        this.setState({
          person: new Person(profile),
          username: username
        })
      })
      .catch((error) => {
        console.log('could not resolve profile')
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })

      const options = { username: username, decrypt: false }
      getFile('high-cards.json', options)
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
  })
    }
  }
  componentDidMount() {
    this.fetchData()
    //this.saveGameResults("D95849AA570A03231B69C65749054A6C8770C7345F8673EC12FA94B302A1ECCC9A90AF79B356FE648479EA59AF6BE7094AD323C3AC4B7373016D6A078625BF43", "jhager.id.blockstack")
  }
}
