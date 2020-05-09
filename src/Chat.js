import React from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MqttService from './core/services/MqttService';
import Feather from 'react-native-vector-icons/dist/Feather';
import OfflineNotification from './core/components/OfflineNotification';

export default class Chat extends React.Component {
    state = {
        isConnected: false,
        message: '',
        message_recive: '',
        mess_list: [],
    };
    constructor() {
        super();
        this.id = 'id_' + parseInt(Math.random() * 100000);
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
        this.setState({
            message_recive,
        });
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
        var term = this.id + ':' + this.state.message;
        MqttService.publishMessage('WORLD', term);
    };

  renderRow = ({item}) => {
      let idMessage = item.split(':');
    return (
        <View style={{
            flexDirection:'row',
            justifyContent:idMessage[0] === this.id?'flex-end':'flex-start',
            marginVertical: 5,
            marginLeft: idMessage[0] === this.id ? 60 : 10,
            marginRight: idMessage[0] === this.id ? 10 : 60,
        }}>
            {idMessage[0] !== this.id ? <Text style={{marginTop:13,marginRight:10}}>
                {idMessage[0]}
                {/*id_1345*/}
            </Text> : null}
      <View
        style={{
          backgroundColor:idMessage[0] === this.id ? '#66db30':'gray',
          marginVertical: 5,
          // marginLeft: idMessage[0] === this.id ? 60 : 10,
          // marginRight: idMessage[0] === this.id ? 10 : 60,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            marginVertical: 7,
            marginHorizontal: 7,
          }}>
            {idMessage.length !== 1 ? idMessage[1] : idMessage[0]}
        </Text>
      </View>
            {idMessage[0] === this.id ? <Text style={{marginTop:13,marginLeft:10}}>{idMessage[0]}</Text> : null}
        </View>
    );
  };
  _keyExtractor = (item, index) => item + index;
  render() {
      const {isConnected, mess_list,message} = this.state;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
          {/*{!isConnected && <OfflineNotification />}*/}
        <FlatList
          data={mess_list}
          renderItem={this.renderRow}
          keyExtractor={this._keyExtractor}
          extraData={this.state}
        />
        <View style={{flexDirection: 'row', borderTopWidth: 0.5}}>
          <TextInput style={{width: '85%'}}
                     value={message}
                     onChangeText={message => this.setState({message: message})}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#66db30',
              justifyContent: 'center',
              alignItems: 'center',
              width: '15%',
            }}
            onPress={this.onPublish}
          >
            <Feather name={'send'} size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
