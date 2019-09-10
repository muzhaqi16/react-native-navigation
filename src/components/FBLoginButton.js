import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

export default class FBLoginButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      first: "",
      last: "",
      id: "",
      loggedInStatus: false,
      hasError: false,
      isLoading: false,
      errorMessage: ''
    };
  }
  handleLogin = () => {
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
                  console.log(result)
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
        <Button title={this.state.loggedIn ? "Sign Out" : "Login with Facebook"}
          onPress={() => this.handleLogin()}
        />

      </View>
    );
  }
}
module.exports = FBLoginButton;