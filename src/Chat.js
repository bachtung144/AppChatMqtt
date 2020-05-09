import React from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MqttService from './core/services/MqttService';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {styleChatScreen} from './Style/StyleChatScreen';
import OfflineNotification from './core/components/OfflineNotification';
// id)name)url)mess
const DataImage = [
  {
    id: 1,
    pic: 'https://bom.to/ABg4gR',
  },
  {
    id: 2,
    pic: 'https://bom.to/ABg4gR',
  },
];
function ItemImage({image}) {
  return (
    <View style={{marginHorizontal: 5}}>
      <Image
        source={{
          uri: image,
        }}
        style={styleChatScreen.image}
      />
    </View>
  );
}
export default class Chat extends React.Component {
  state = {
    isConnected: false,
    message: '',
    message_recive: '',
    mess_list: [],
    arrayName:[],
    arrayAvt:[]
  };
  constructor(props) {
    super(props);
    this.id = 'id_' + parseInt(Math.random() * 100000);
    const {navigation} = this.props;
    this.Name = navigation.getParam('Name');
    this.Image = navigation.getParam('Image');
  }
  componentDidMount(): void {
    MqttService.connectClient(
      this.mqttSuccessHandler,
      this.mqttConnectionLostHandler,
    );
  }

  onWORLD = message_recive => {
    var joined = this.state.mess_list.concat(message_recive);
    this.setState({mess_list: joined});
    // this.setState({
    //   message_recive,
    // });
  };

  mqttSuccessHandler = () => {
    console.log('connected to mqtt');
    MqttService.subscribe('WORLD', this.onWORLD);
    this.setState({
      isConnected: true,
    });
  };

  mqttConnectionLostHandler = () => {
    this.setState({
      isConnected: false,
    });
  };

  onPublish = () => {
    var term = this.id + ')' + this.Name + ')' +this.Image+')' + this.state.message;
    MqttService.publishMessage('WORLD', term);
  };

  RenderRow = ({item}) => {
    let idMessage = item.split(')');
    return (
      <View
        style={[
          styleChatScreen.ctnRender,
          {justifyContent:  idMessage[0] === this.id ? 'flex-end' : 'flex-start'},
        ]}>
        { idMessage[0] === this.id ? (
          <View />
        ) : (
          <View style={styleChatScreen.ctnAvt}>
            <Image
              source={{
                uri: idMessage[2],
              }}
              style={styleChatScreen.imageRender}
            />
            <Text>
              {idMessage[1]}
            </Text>
          </View>
        )}
        <Text
          style={[
            styleChatScreen.textRender,
            {
              color:  idMessage[0] === this.id ? '#FFF' : '#828a97',
              backgroundColor:  idMessage[0] === this.id ? '#827dce' : '#d1dfe4',
            },
          ]}>
          {idMessage[3]}
        </Text>
      </View>
    );
  };
  _keyExtractor = (item, index) => item + index;
  render() {
    const {mess_list, message,isConnected} = this.state;

    return (
      <View style={styleChatScreen.container}>
        {!isConnected && <OfflineNotification />}
        <StatusBar backgroundColor="#7c77cd" />
        <View style={styleChatScreen.containerHeader}>
          <FlatList
            style={styleChatScreen.flUser}
            data={DataImage}
            renderItem={({item}) => <ItemImage image={item.pic} />}
            keyExtractor={item => item.id}
            numColumns={3}
          />
        </View>
        <View style={styleChatScreen.ctnNameUser}>
          <Text style={styleChatScreen.txtName}>David, John, Blake</Text>
        </View>
        <FlatList
          data={mess_list}
          renderItem={this.RenderRow}

          keyExtractor={this._keyExtractor}
        />
        <View style={styleChatScreen.ctnFooter}>
          <AntDesign name={'plus'} style={styleChatScreen.iconPlus} />
          <TextInput
            placeholder={'Type something...'}
            style={styleChatScreen.input}
            value={message}
            onChangeText={message => this.setState({message: message})}
          />
          <TouchableOpacity onPress={this.onPublish}>
            <Text style={styleChatScreen.send}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
