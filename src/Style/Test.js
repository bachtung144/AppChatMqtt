import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
const Data = [
  {
    id: 1,
    name: 'tung 1',
    mess: 'dasffffffadgagagadgsdg',
    pic:
      'https://bom.to/ABg4gR',
  },
  {
    id: 2,
    name: 'tung 2',
    mess: 'affsagasgag',
    pic:
      'https://bom.to/ABg4gR',
  },
];

const DataImage = [
  {
    id: 1,
    pic:
      'https://bom.to/ABg4gR',
  },
  {
    id: 2,
    pic:
      'https://bom.to/ABg4gR',
  },
];
function Item({image}) {
  return (
    <View style={{marginHorizontal: 5}}>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
        }}
      />
    </View>
  );
}

const Test = React.memo(function Chat({navigation}) {
  let name = navigation.getParam('Name');
  let image = navigation.getParam('Image');

  const RenderRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: item.id === 1 ? 'flex-end' : 'flex-start',
          marginTop: 10,
          marginHorizontal: 15,
        }}>
        {item.id === 1 ? (
          <View />
        ) : (
          <View style={{paddingRight: 7}}>
            <Image
              source={{
                uri: item.pic,
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
              }}
            />
          </View>
        )}
        <Text
          style={{
            backgroundColor: item.id === 1 ? '#827dce' : '#d1dfe4',
            padding: 10,
            fontSize: 20,
            color: item.id === 1 ? '#FFF' : '#828a97',
            borderRadius: 5,
          }}>
          {item.mess}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#7c77cd" />
      <View
        style={{
          backgroundColor: '#7c77cd',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          style={{marginVertical:5}}
          data={DataImage}
          renderItem={({item}) => <Item image={item.pic} />}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 0.1,
          borderBottomColor: 'gray',
          height: '8%',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        }}>
        <Text style={{color: '#7c77cd', fontSize: 20}}>David, John, Blake</Text>
      </View>
      <FlatList
        data={Data}
        renderItem={RenderRow}
        keyExtractor={item => item.id}
      />
      <View
        style={{
          width: '100%',
          borderTopColor: 'gray',
          borderTopWidth: 0.3,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <AntDesign
          name={'plus'}
          size={40}
          color={'#7c77cd'}
          style={{marginTop: 5}}
        />
        <TextInput
          placeholder={'Type something...'}
          style={{
            borderWidth: 0.3,
            borderColor: 'gray',
            width: '60%',
            height: 40,
            marginTop: 5,
            borderRadius: 5,
          }}
        />
        <Text style={{color: '#7c77cd', fontSize: 20, marginTop: 10}}
              onPress={() => console.warn('hhh')}
        >
          Send
        </Text>
      </View>
    </View>
  );
});

export default Test;
