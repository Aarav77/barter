import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Modal } from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            firstName:'',
            lastName:'',
            addresss:'',
            contact:'',
            confirmPassword:'',
            isModelVisible:false
        }
    }
    userLogin=(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            return Alert.alert('loggedInSuccesfully')
        })
        .catch((error)=>{
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert.alert(errorMessage)
        })
    }
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModelVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }
      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModelVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }     
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Barter</Text>
                </View>
                <View style={styles.buttonContainer}>

               
                <TextInput style={styles.loginBox}
                placeholder="abc@bf.com"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={(text)=>{
                    this.setState({emailId:text})
                }}
                >

                </TextInput>
                <TextInput style={styles.loginBox}
                placeholder="password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({emailId:text})
                }}
                >

                </TextInput> 
                <TouchableOpacity style={[styles.button, {marginBottom:20, marginTop:20}]}
                onPress={()=>{this.userLogin(this.state.emailId, this.state.password)}}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {marginBottom:20, marginTop:20}]}
                onPress={()=>{this.setState({isModelVisible:true})}}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F8BE85'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    }
  })