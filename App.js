import React, {Component} from 'react';
import {Text, View,TextInput,TouchableOpacity,Button} from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component{

	constructor(props){
		super(props);
		this.unsubscriber = null;
		this.state ={
			email:'',
			password:'',
			user:null,
		};
	}

	componentDidMount(){
		this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser)=>{
			this.setState({user: changedUser});
		})
	}

	componentWillMount(){
		if(this.unsubscriber){
			this.unsubscriber();
		}
	}

	onLogin =() => {
		firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
		.then((loggedInUser) =>{
			//console.log('Login successful!');
			console.log('Login successfull!: '+JSON.stringify(loggedInUser));
		}).catch((error)=>{
			console.log('Login fail with error! '+error);
		});
	}

	onRegister =() => {
		firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
		.then((loggedInUser) =>{
			//console.log('Register Successful!);
			this.setState({user:loggedInUser})
			console.log('Register successfull!: '+JSON.stringify(loggedInUser));
		}).catch((error)=>{
			console.log('Register fail with error!'+error);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Welcome to React Native Firebase!</Text>
				</View>
				<View style={styles.form}>
					<TextInput 
						style={styles.input}
						placeholder={"Enter your email"}
						keyboardType='email-address'
						placeholderTextColor='white'
						autoCapitalize='none'
						onChangeText={
							(text) => {
								this.setState({email: text})
							}
						}
					/>
					<TextInput 
						style={styles.input}
						placeholder={"Enter your password"}
						keyboardType='default'
						placeholderTextColor='white'
						secureTextEntry={true}
						onChangeText={
							(text) => {
								this.setState({password: text})
							}
						}
					/>
					
					<View style={{flex:1,flexDirection:'row', alignItems:'stretch'}}>
						
						<TouchableOpacity 
							style={styles.btn}
							onPress={this.onLogin}

						>
							<Text style={styles.btnText}>Login</Text>

						</TouchableOpacity>

						<TouchableOpacity
							style={styles.btn}
							onPress={this.onRegister}
						>
							<Text style={styles.btnText}>Register</Text>

						</TouchableOpacity>

					</View>
				</View>
				<View style={styles.subContainer}></View>
				
			</View>
		);
	}
}

const styles = {
  container: {
    flex: 1,
	marginTop: 21,
	backgroundColor:'#455a64'
  },
  header:{
	flex:1,
	
	justifyContent: 'center',
	alignItems:'center',
	padding: 20,
  },
  form:{
	flex: 5,
	justifyContent:'flex-start',
	padding:20
  },
  subContainer:{
	  flex:0.5,
	  
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color:'white'
  },
  input:{
	  backgroundColor:'rgba(255, 255,255,0.2)',
	  borderRadius:25,
	  borderWidth:0.5,
	  borderColor:'gray',
	  paddingLeft:16,
	  marginTop:20,
	  height:40,
	  color:'white'
	  
  },
  btn:{
	  flex:1,
	  marginTop:20,
	  margin:10,
	  backgroundColor:'#1c313a',
	  justifyContent:'center',
	  height:40,
	  borderRadius:25,
	  
    },
  btnText:{
	  fontSize:17,
	  textAlign:'center',
	  color:'white'
  }
}
