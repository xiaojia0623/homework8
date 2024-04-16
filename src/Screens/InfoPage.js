import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import TextStyle from '../styles/TextStyle';

export default function InfoPage(props) {

    const passProps = props.route.params.passProps || 'no data';

    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lN-MIfzq_YivOa0M67__O1MNHV0bwzr0-hbVQiKe8g&s';
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <View style={{padding:20}}>
          <Text style={TextStyle.infoTextTitle}>{passProps.Name}</Text>
          <Image style={styles.infoImg} 
          defaultSource={defaultImage}
          source={{uri: passProps.Column1 ? passProps.Column1 : defaultImage}}/>
          <Text style={TextStyle.infoContent}><Text style={TextStyle.infoSmallTitle}>農會: </Text> {passProps.ProduceOrg}</Text>
          <Text style={TextStyle.infoContent}><Text style={TextStyle.infoSmallTitle}>成分:</Text>  {passProps.SpecAndPrice}</Text>
          <Text style={TextStyle.infoContent}><Text style={TextStyle.infoSmallTitle}>特點: </Text> {passProps.Feature}</Text>
          <Text style={TextStyle.infoContent}><Text style={TextStyle.infoSmallTitle}>地址: </Text> {passProps.SalePlace}</Text>
          <Text style={TextStyle.infoContent}><Text style={TextStyle.infoSmallTitle}>電話: </Text> {passProps.ContactTel}</Text>
          <StatusBar style="auto" />

          <TouchableOpacity style={styles.backBtn} onPress={() => props.navigation.pop()}>
              <Text style={{color:'white',textAlign:'center',}}>回農產品列表</Text>
          </TouchableOpacity>
        </View>
        
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
    padding:15,
  },
  infoImg:{
    width:300,
    height:300,
    objectFit:'cover',
    justifyContent: 'center',
    borderRadius:10,
    marginBottom:20,
    marginHorizontal:'auto',
  },
  backBtn:{
    marginHorizontal:'auto',
    borderRadius:5,
    padding:10,
    borderWidth:2,
    border:'#A52A2A',
    backgroundColor:'#006400',
    textAlign:'center',
    marginTop:20,
}
});
