import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import * as StorageHelper from '../helpers/StorageHelper'


export default function InfoPage(props) {


    const [listCount, setListCount] = useState(0)
    const [listInfo, setListInfo] = useState([])

    useEffect(() => {
        const nonFollow = props.navigation.addListener('focus', ()=> {
            loadStorage()
        })
        return nonFollow
    },[listCount])


    const loadStorage = async() => {
        let dataGet = await StorageHelper.getMySetting('myList')

        let a = JSON.parse(dataGet)
        let newArray = []
        a.forEach((thing) => {
            newArray.push(thing.ProduceOrg + '的' + thing.Name)
        })
        setListCount(a.length)
        setListInfo(newArray)
    }


  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, fontWeight:'bold'}}>您收藏了 {listCount} 個產品</Text>
      <View style={styles.seperator}></View>
      {
        listInfo.map((product, index) => {
            return (
                <Text style={{fontSize:16, lineHeight:'1.5rem'}} key={index}>收藏的商品: {product}</Text>
            )
        })
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8FBC8F',
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    padding:10,
  },
  seperator:{
    height:1,
    width:'100%',
    backgroundColor:'#D2691E',
    margin:10,
  },
});
