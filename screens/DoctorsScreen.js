import React, { useEffect, useState } from 'react'
import { Imports } from '../utilities/GlobalImports'
import GlobalStyles from '../utilities/GlobalStyles'
import { useFocusEffect, useNavigation } from '@react-navigation/native' 
import { ActivityIndicator, Alert } from 'react-native' 
import { Ionicons } from '@expo/vector-icons' 
import {useDispatch, useSelector } from 'react-redux'
import { getDoctorInitiate } from '../redux/actions/getDoctorAction' 
import ModalComponent from '../components/ModalComponent'

const DoctorsScreen = () => {
    const [doctorsList ,setdoctorsList] = useState([])
    const [id,setId] = useState(null)
    const [idDelete,setIdDelete] = useState(null)
    const [menuVisible, setMenuVisible] = useState(false);
    const [modal ,setModal] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.getdoctor.loading)
    const doctorData = useSelector((state) => state?.getdoctor?.data);



    useFocusEffect(
      React.useCallback(() => {
        fetchData(); 
      }, []) 
    );
const fetchData = async () => {
    try {
       
      await dispatch(getDoctorInitiate())

    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(()=>{
    if(doctorData){
      setdoctorsList(doctorData)
    }
  } ,[doctorData])
  
  const toggleMenu = (id) => {
    
    setId(id)
    setMenuVisible(!menuVisible);
  }
 const handleNavigate = async (item) => {
    navigation.navigate('doctordetails',{item:item} );
    
 }

 const handleEditDoctor = async(item) => {
  try {
  // console.log("id handleEditDoctor",item)
  navigation.navigate('addDoctor',{item:item} );
      
} catch (error) {
    console.log("error",error)
}
 }

 const handleDeleteDoctor = async (id) => {

  console.log("id handleDeleteDoctor",id)
  setIdDelete(id)
  setModal(true) 


 }

 const handleClose = () => {
  setModal(false)
}

 const handleDoctorsUi = (item) => {
  return (
    <Imports.TouchableOpacity style={{ flex: 1, padding: 5 }} onPress={() => handleNavigate(item)}>
      <Imports.View style={[styles.card, { justifyContent: "center", alignItems: "center", position: 'relative' }]}>
        
        <Imports.TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2
          }}
          onPress={()=>toggleMenu(item.id)}
        >
          <Ionicons name="ellipsis-vertical" size={16} />
        </Imports.TouchableOpacity>

        { (item.id === id )?
        menuVisible && (
          <Imports.View
            style={{
              position: 'absolute',
              top: 40,
              right: 10,
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 5,
              paddingHorizontal: 10,
              elevation: 5,
              zIndex: 3,
            }}
          >
            <Imports.TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('doctordetails',{item:item} ); }}>
              <Imports.Text style={styles.menuText}>Info</Imports.Text>
            </Imports.TouchableOpacity>
            <Imports.TouchableOpacity onPress={() => {  setMenuVisible(false); handleEditDoctor(item) }}>
              <Imports.Text style={styles.menuText}>Edit</Imports.Text>
            </Imports.TouchableOpacity>
            <Imports.TouchableOpacity onPress={() => { setMenuVisible(false); handleDeleteDoctor(item.id) }}>
              <Imports.Text style={styles.menuText}>Delete</Imports.Text>
            </Imports.TouchableOpacity>
          </Imports.View>
        ) : ""}

 
        <Imports.Image source={{ uri: item.profileImage }} style={styles.image} />
        <Imports.Text style={{ fontSize: 17, marginVertical: 5, fontWeight: "bold" }}>{item.name}</Imports.Text>
        <Imports.Text style={{ fontSize: 15, fontWeight: "500" }}>{item.role}</Imports.Text>
        <Imports.Text style={{ fontSize: 14, fontWeight: "400", marginVertical: 5 }}>
          Fees: {item.consultationFee} Rs
        </Imports.Text>
      </Imports.View>
    </Imports.TouchableOpacity>
  );
};

    if(loading){
      return (
            <Imports.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </Imports.View>
          );  
    }

    return (
        <>
            <Imports.View style={GlobalStyles.mainContainer}>
                <Imports.View style={{ flex: 1 }}>
                    <Imports.View style={{ width: "100%", marginBottom:10}}>
                        <Imports.FlatList
                            data={doctorsList}
                            renderItem={({ item }) => handleDoctorsUi(item)}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between',  }}
                            showsVerticalScrollIndicator={false}
                        />


                    </Imports.View>
                </Imports.View>
            </Imports.View>
            {modal && <ModalComponent modal ={modal} handleClose={handleClose} id ={idDelete} setModal= {setModal} />}
        </>
    )
}

export default DoctorsScreen

const styles = Imports.StyleSheet.create({
    card: {
        backgroundColor: "white",
        width: '100%', 
        height: 250,
        padding: 10,
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 10,
        elevation:2
    },

    image: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    menuText:{
      fontSize:16,
      marginHorizontal:20,
      marginVertical:6
    }
})