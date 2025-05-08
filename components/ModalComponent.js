import React from 'react';
import { Imports } from '../utilities/GlobalImports';
import { deleteDoctorInitiate } from '../redux/actions/deleteDoctorAction';
import { getDoctorInitiate } from '../redux/actions/getDoctorAction';
import { useDispatch } from 'react-redux';



const ModalComponent = ({ modal, handleClose, id, setModal }) => {
  const dispatch = useDispatch()

  const confirmDelete = async () => {
    try {
      setModal(false)
      await dispatch(deleteDoctorInitiate(id))
      await dispatch(getDoctorInitiate())
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: "doctor profile deleted successfully",
        visibilityTime: 4000,
        autoHide: true,
        text1Style: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 14,
        },
      });


    } catch (error) {
      console.log("error", error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "doctor profile not deleted ",
        visibilityTime: 4000,
        autoHide: true,
        text1Style: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 14,
        },
      });

    }

  }
  return (
    <Imports.Modal visible={modal} transparent animationType="slide">
      <Imports.View style={styles.overlay}>
        <Imports.View style={styles.modalContainer}>
          <Imports.Text style={styles.text}>Do you want to delete this  profile.</Imports.Text>
          <Imports.View style={styles.buttonContainer}>
            <Imports.TouchableOpacity style={[styles.button, styles.greenButton]} onPress={confirmDelete}>
              <Imports.Text style={styles.buttonText}>Yes</Imports.Text>
            </Imports.TouchableOpacity>

            <Imports.TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleClose}>
              <Imports.Text style={styles.buttonText}>No</Imports.Text>
            </Imports.TouchableOpacity>
          </Imports.View>
        </Imports.View>
      </Imports.View>
    </Imports.Modal>
  );
};

const styles = Imports.StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30
  },
  modalContainer: {
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20, // For React Native 0.71+; use marginRight if not supported
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: 'green',
  },
  redButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModalComponent;
