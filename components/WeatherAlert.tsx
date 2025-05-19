import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Alert } from './WeatherView';
import { Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

type AlertProps = {
    alert: Alert;
};
  
export default function AlertItem({ alert }: AlertProps) {
  const [isInstructionOpen, setIsInstructionOpen] = useState<boolean>(false);

  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertHeader}>
        <Foundation name="alert" style={styles.alertIcon}/>
        <Text style={styles.alertText}>Weather {alert.msgtype}</Text>
      </View>
      <View style={styles.alertContent}>
        <View style={styles.alertContentHeader}>
          <Text style={styles.alertText}>{alert.headline}</Text>
          <View style={styles.alertInfo}>
            <Text style={styles.alertText}><MaterialCommunityIcons name="weather-cloudy-alert"/>  {alert.severity} </Text>
            <Text style={styles.alertText}><MaterialCommunityIcons name="timer-sand-complete"/>  {alert.urgency} </Text>
          </View>
        </View>
        {alert.instruction ? (
          <View style={styles.alertInstruction}>
            <View style={styles.alertInstructionHeader}>
              <Text style={styles.alertText}>Instructions</Text>
              <Pressable onPress={() => setIsInstructionOpen(!isInstructionOpen)}><MaterialIcons name="expand-more" color={'white'} size={24}/></Pressable>
            </View>
            {isInstructionOpen ? (
              <View style={styles.alertInstructionContent}>
                <Text style={styles.alertText}>{alert.instruction.replace(/\s+/g, ' ').trim()}</Text>
              </View>
            ):(
              <View></View>
            )}
          </View>
        ):(
          <View></View>
        )}
      </View>
      {/* <Text>{alert.desc}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: '#4F5D6C',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center'
  },
  alertHeader: {
    flexDirection: 'row',
    backgroundColor: '#708394',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10,
    padding: 3,
    alignItems: 'center',
  },
  alertContent: {
    padding: 10,
    paddingHorizontal: 20,
  },
  alertContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10%',
    alignItems: 'center',
  },
  alertInfo: {
    backgroundColor: '#708394',
    padding: 10,
    borderRadius: 5,
    minHeight: '70%',
    justifyContent: 'space-around'
  },
  alertInstruction: {
    color: 'white',
    marginTop: 10, 
    borderRadius: 5,
    backgroundColor: '#708394',
  },
  alertInstructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 5,
  },
  alertInstructionContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: '#4F5D6C',
    borderTopWidth: 2,
    borderStyle: 'dashed'
  },
  alertExpand: {

  },
  alertText: {
    color: 'white',
  },
  alertIcon: {
    color: 'white',
    fontSize: 18,
    marginRight: 8,
  },
});