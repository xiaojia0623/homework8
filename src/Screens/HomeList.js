import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity , SafeAreaView, ScrollView ,FlatList } from 'react-native';

import React, {useState, useEffect} from 'react';
import * as StorageHelper from '../helpers/StorageHelper'
import TextStyle from '../styles/TextStyle';
import { Feather } from '@expo/vector-icons';

export default function HomeList(props) {

    const [dataSource, setDataSource] = useState([])

    useEffect(()=> {
        fetchData()
    },[])

    useEffect(()=> {
        let getAll = []
        dataSource.map(a => {
            if (a.addToMyList === true){
                getAll.push(a)
            }
        })
        saveToStorage(getAll)
    })

    const saveToStorage = async (getInfo) => {
        try{
            await StorageHelper.setMySetting('myList', JSON.stringify(getInfo));
        }catch(error){
            console.log(error)
        }
    }

    const fetchData = () => {
        const REQUEST_DATA = 'assets/data/giftData.json';

        fetch(REQUEST_DATA)
            .then((res) => res.json())
            .then((resData) => {
                setDataSource(resData)
            })
            .catch((err) => {
                console.log('err問題: ', err)
            })
    }

    

    const passRow = (cases) => {
        const newDatas = dataSource.map( a => {
            let copyA = {... a}
            if (copyA.ID === cases.ID){
                copyA.addToMyList = !copyA.addToMyList
            }
            return copyA
        })
        setDataSource(newDatas)
    }

    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lN-MIfzq_YivOa0M67__O1MNHV0bwzr0-hbVQiKe8g&s'

    const renderInfoData = (cases) => {
        return (
            <TouchableOpacity  onPress={() => props.navigation.push('listInfoPage', {passProps:cases})}>
                <View>
                    <View style={styles.MainStyle}>

                        { /* 勾選框 */ }
                        <TouchableOpacity onPress={() => passRow(cases)}>
                            {cases.addToMyList === true ? <Image style={styles.smallImage}  source={require('../../assets/images/check_mark_and_box_by_babylonica_d1rht9d-fullview.jpg')}/> : <Image style={styles.smallImage}  source={require('../../assets/images/free-square-1768057-1502230.webp')}/>}
                        </TouchableOpacity>

                        { /* 產品圖片 */ }
                        <Image  style={styles.aniImg}
                        defaultSource={defaultImage}
                        source={{uri:cases.Column1 ? cases.Column1 : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lN-MIfzq_YivOa0M67__O1MNHV0bwzr0-hbVQiKe8g&s'}}
                        imgResizeMode="contain"
                        />

                        <View style={{flex:1}}>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={TextStyle.titleFont}>
                                產品名稱: {cases.Name}
                            </Text>
                            <Text ellipsizeMode='tail' numberOfLines={3} style={TextStyle.titleContent}>
                                農會: {cases.ProduceOrg}
                            </Text>
                        </View>
                        <Feather name="arrow-right-circle" size={24} color="black"/>
                    </View>
                    <View style={styles.seperator}></View>
                </View>
            </TouchableOpacity>
        )
    }


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.ScrollView}>
            <FlatList data={dataSource}
            renderItem={ cases => renderInfoData(cases.item, props)}
            keyExtractor={ cases => cases.ID.toString()}/>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8FBC8F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainStyle:{
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#8FBC8F',
    padding:15
  },
  smallImage:{
    width:25,
    height:25,
    marginEnd:10,
    color:'blue',
  },
  aniImg:{
    width:50,
    height:50,
    objectFit:'cover',
    borderRadius:10,
    marginEnd:20,
  },
  seperator:{
    height:1,
    width:'100%',
    backgroundColor:'#D2691E',
  },
});
