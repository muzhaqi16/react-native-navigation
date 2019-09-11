import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import AsyncStorage from '@react-native-community/async-storage';

export default class FBLoginButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInStatus: false,
      hasError: false,
      isLoading: false,
      errorMessage: ''
    };
  }
  handleLogin = () => {
    const login = this.props.handleLogin
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken
              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                } else {
                  const id = ["@FB_user_id", result.id]
                  const email = ["@FB_email", result.email]
                  const fname = ["@FB_fname", result.first_name]
                  const lname = ["@FB_lname", result.last_name]
                  const picture = ["@FB_picture", result.picture.data.url]
                  try {
                    AsyncStorage.multiSet([id, email, fname, lname, picture])
                  } catch (e) {
                    //save error
                    console.log(login)
                  }
                  login();
                }
              }
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,first_name,last_name,picture'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()

            }
          )
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  render() {
    return (
      <View style={{
        flex: 1, flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button title={this.state.loggedInStatus ? "Sign Out" : "Login with Facebook"}
          onPress={() => this.handleLogin()}
        />
      </View>
    );
  }
}
module.exports = FBLoginButton;