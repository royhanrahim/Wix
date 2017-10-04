import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import t from 'tcomb-form-native'; 
import ImagePicker from 'react-native-image-picker';

const Form = t.form.Form;


// here we are: define your domain model
const Menu = t.struct({
  name: t.String,              // a required string
  email: t.maybe(t.String),  // an optional string
  noNumber: t.Number,               // a required number
});

const options = {
  fields:{
    name:{
      label: 'Nama',
      placeholder:'Masukan Nama',
    },
    email:{
      label:'Email',
      placeholder:'Masukan Email',
    },
    noNumber:{
      label:'Nomor Telepon',
      placeholder:'Masukan Nomor Telepon',
    },
  },
  auto:'placeholders',

  title: 'Select Avatar',

  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Main extends Component{
  state = {
    avatarSource: null,
  };

  onUpload(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  view = [];

  constructor(){
    super();
    this.state = {
      view:this.view,
    };
  }


   onPress(){
    // call getValue() to get the values of the form
    let picture = this.state.avatarSource;
    let form = this.refs.form.getValue();
    let combine = Object.assign({form, picture}); 

    if (picture == null) {
      return;
    }
    viewPush = this.state.view;
    viewPush.push(combine);
      this.setState({
        view: viewPush,
        avatarSource: null,
      });
    }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({
  //       nama:'Royhan Rahim',
  //     });
  //     console.log('Aktif');
  //   }, 7000);
  // } 

  /*Contoh change text*/
    // onClick(){
    //   const {nama} = this.state;
    //   this.setState({
    //     nama:"Royhan Rahim",
    //   });
    // }
  /*Contoh change text*/

  renderRow(obj, index){
    return(
      <View key={index}>
        <Text>{obj.form.name}</Text>
        <Text>{obj.form.email}</Text>
        <Text>{obj.form.noNumber}</Text>
        <Image
          source={obj.picture}
          style={{width: 100, height: 100}}
        />
      </View>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <View>
          <ScrollView>
          {/* display */}
          <View style={{backgroundColor:'#FFF', borderRadius:2, height:100, borderWidth:1, justifyContent:'center'}} onPress={() => this.onUpload()}>
             
            <TouchableOpacity style={styles.buttonUpload} onPress={() => this.onUpload()} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Upload</Text>
              <Image source={this.state.avatarSource} 
                     style={{width:330, height:220, borderWidth:1,}}
              />
            </TouchableOpacity>
          </View>

          <Text>{this.state.nama}</Text>
          
          <Form
            ref="form"
            type={Menu}
            options={options}
          />
          
          <TouchableHighlight style={styles.buttonSave} onPress={() => this.onPress()} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonSave} onPress={() => this.onClick()} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Click</Text>
          </TouchableHighlight>

          {this.state.view.map((viewPush, index)=> this.renderRow(viewPush, index))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  buttonSave: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonUpload: {
    height: 110,
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingTop:70
  },
});

