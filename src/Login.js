import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {styleLogin} from './Style/StyleLogin';

const Login = React.memo(function Login({navigation}) {
    const [Name,useName] = useState('');
    const [Image,useImage] = useState('https://i.pinimg.com/originals/e0/8e/78/e08e78ec865f6b185b82f98898420696.jpg');
    const [Check,useCheck] = useState(false);
  return (
    <View
      style={styleLogin.container}>
      <View
        style={styleLogin.ctnCenter}>
        <View style={styleLogin.center}>
          <View style={styleLogin.textCenter}>
            <Text >
              SIGN IN TO YOUR ACCOUNT
            </Text>
          </View>
          <TextInput
            style={styleLogin.input1}
            value={Name}
            onChangeText={(value) => useName(value)}
            placeholder={'Input Name...'}
          />
          <TextInput
            style={styleLogin.input2}
            value={Image}
            onChangeText={(value) => useImage(value)}
            placeholder={'Input Avatar...'}
          />
          <View style={styleLogin.ctnCheck}>
            <AntDesign name={'checksquare'} color={!Check?'#746bde':'gray'} size={20}
                       onPress={() => useCheck(!Check)}
            />
            <Text style={styleLogin.txtCheck}>
              Keep me signed in
            </Text>
          </View>
          <TouchableOpacity
            style={styleLogin.ctnButton}
            onPress={() => navigation.navigate('ChatScreen',{Name:Name,Image:Image})}
          >
            <Text style={styleLogin.txtWhite}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styleLogin.ctnForgot}>
            <Text style={styleLogin.txtGray}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default Login;
