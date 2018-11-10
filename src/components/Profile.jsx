import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile,
} from 'blockstack';

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
      this.setState({
        person: new Person(loadUserData().profile),
        username: loadUserData().username
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
    }
  }
  componentDidMount() {
    this.fetchData()
  }
}
