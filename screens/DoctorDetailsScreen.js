import React, { useEffect, useState } from 'react'
import { Imports } from '../utilities/GlobalImports'
import GlobalStyles from '../utilities/GlobalStyles'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utilities/GlobalColors';
import GlobalButton from '../components/GlobalButton';
import { useNavigation } from '@react-navigation/native';

const DoctorDetailsScreen = ({ route }) => {
    const [item, setItem] = useState(null);

    const navigation = useNavigation()

    useEffect(() => {
        const { item } = route.params;
        // console.log("item",item)
    setItem(item)
    }, []);

    const content = [
        { icon: <Ionicons name='people-outline' size={24} style={{color:colors.primary500}}/>, name: "Patients", count: `${item?.patients ? item?.patients :100}+` ,color:colors.primary500,bgColor:"rgb(214, 245, 249)"}, 
        { icon: <Ionicons name='flash-outline' size={24}  style={{color:"red"}}/>, name: "Experience", count: `${item?.experience}yrs`  ,color:"red",bgColor:'rgb(243, 217, 217)'},
        { icon: <Ionicons name='star-outline' size={24} style={{color:"orange"}} />, name: "Rating", count: item?.rating ? item?.rating : 4  ,color:"orange",bgColor:'rgb(243, 230, 217)',}
      ];

      const contentOne = [
        {icon:<Ionicons name="mail" size={32}  style={{color:"red"}}></Ionicons> ,name:"Messaging", descp:"chat me up,share photos",bgColor:'rgb(243, 217, 217)'},
        {icon:<Ionicons name="call" size={32} style={{color:colors.primary500}}></Ionicons> ,name:"Audio Call", descp:"call your doctor directly",bgColor:"rgb(214, 245, 249)",},
        {icon:<Ionicons name="videocam" size={32} style={{color:"orange"}} ></Ionicons> ,name:"Video Call", descp:"see your doctor live",bgColor:'rgb(243, 230, 217)',}
      ]

      const handleButtonPressed = () => {
        navigation.navigate('bookappointment' ,{item:item})
      }

    return (
        <Imports.View style={GlobalStyles.mainContainer}>
            <Imports.SafeAreaView style={{ flex: 1,marginBottom:10, }}>
                <Imports.ScrollView style={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <Imports.View style={styles.container}>
                        <Imports.Image source={{ uri: item?.profileImage }} style={[styles.image,{borderColor:"gray",borderWidth:1}]} resizeMode='cover' />
                    </Imports.View>
                    <Imports.View>
                        <Imports.Text style={{ fontSize: 18, marginVertical: 5, fontWeight: "bold",textAlign:"center" }}>{item?.name}</Imports.Text>
                        <Imports.Text style={{ fontSize: 16, fontWeight: 500,textAlign:"center" }}>{item?.role}</Imports.Text>

                    </Imports.View>

                    <Imports.View style={{justifyContent:'space-between',flexDirection:"row",padding:8,}}>
                        {content.map((itm,index)=>(
                            <Imports.View style={{padding:5, flex:1}} key={index}>
                            <Imports.View style={styles.mainView} >
                                <Imports.View style={{paddingTop:35,paddingBottom:5,justifyContent:"center",alignItems:"center",backgroundColor:itm.bgColor,marginHorizontal:25,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>{itm.icon}</Imports.View>
                                <Imports.Text style={{ fontSize: 16, fontWeight: 500,textAlign:"center",marginVertical:10 }}>{itm.count}</Imports.Text> 
                                <Imports.Text style={{ fontSize: 16, fontWeight: 500,textAlign:"center", }}>{itm.name}</Imports.Text>
                                
                            </Imports.View>
                            </Imports.View> 
                        ))}
                    </Imports.View>

                    <Imports.View style={{marginTop:25}}>
                        <Imports.Text style={{fontSize:21,fontWeight:"bold",lineHeight:30,marginBottom:5}}>About Doctor</Imports.Text>
                        <Imports.Text style={{fontSize:14,color:"gray"}}>{item?.bio} He has treated hundreds of patients with care and professionalism, earning a strong reputation among his peers. </Imports.Text>
                    </Imports.View>
                    <Imports.View style={{marginTop:25}}>
                        <Imports.Text style={{fontSize:21,fontWeight:"bold",lineHeight:30,marginBottom:10}}>Working Time</Imports.Text>
                        <Imports.Text style={{fontSize:14,color:"gray"}}>{item?.availableDays}   ( {item?.availableTime} )</Imports.Text>
                    </Imports.View>
                    <Imports.View style={{marginVertical:25}}>
                        <Imports.Text style={{fontSize:21,fontWeight:"bold",lineHeight:30,marginBottom:10}}>Communication</Imports.Text>
                        <Imports.View>
                            {contentOne.map((itm,index)=>(
                                <Imports.View key={index} style={{justifyContent:"start",flexDirection:"row",gap:20,alignItems:"center",marginBottom:10}}>
                                    <Imports.View style={{backgroundColor:itm.bgColor,padding:10,borderRadius:16}}>{itm.icon}</Imports.View>
                                    <Imports.View>
                                        <Imports.Text style={{fontSize: 18, marginVertical: 5, fontWeight: "bold",textAlign:"start" }}>{itm.name}</Imports.Text>
                                        <Imports.Text style={{fontSize:14,color:"gray"}}>{itm.descp}</Imports.Text>
                                    </Imports.View>
                                      
                                </Imports.View>
                            ))}
                        </Imports.View>
                    </Imports.View>
                    <Imports.View style={GlobalStyles.buttonWidth}>
                        <GlobalButton btnTitle={"Book Appointment"} handleButtonPressed={handleButtonPressed} />
                    </Imports.View>

                </Imports.ScrollView>
            </Imports.SafeAreaView>
        </Imports.View>
    );
};


export default DoctorDetailsScreen;

const styles = Imports.StyleSheet.create({
    container: {
        width: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    mainView:{
        flex:1,
        backgroundColor:"white",
        height:140,
        borderRadius:10,
        elevation:5
        
    },
   
})