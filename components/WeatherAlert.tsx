import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Alert } from './WeatherView';
import { Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

type AlertProps = {
    alert: Alert;
};
  
export default function AlertItem({ alert }: AlertProps) {
  const [isInstructionOpen, setIsInstructionOpen] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertHeader}>
        <Foundation name="alert" style={styles.alertIcon}/>
        <Text style={{color: 'white'}}>Weather Alert{alert.msgtype === 'Update' ? " - Update" : ""}</Text>
      </View>
      <View style={styles.alertContent}>
        <View style={styles.alertContentHeader}>
          <View style={{ flex: 1, marginRight: '10%' }}>
            <Text style={styles.alertText}>{alert.headline}</Text>
          </View>
          <View style={styles.alertInfo}>
            <Text style={[styles.alertText, {marginBottom: 5}]}><MaterialCommunityIcons name="weather-cloudy-alert"/>  {alert.severity} </Text>
            <Text style={styles.alertText}><MaterialCommunityIcons name="timer-sand-complete"/>  {alert.urgency} </Text>
          </View>
        </View>
        {alert.instruction ? (
          <Pressable onPress={() => setIsInstructionOpen(!isInstructionOpen)} style={styles.alertInstruction}>
            <View style={styles.alertInstructionHeader}>
              <Text style={styles.alertText}>Instructions</Text>
              <MaterialIcons name="expand-more" color={'white'} size={24}/>
            </View>
            {isInstructionOpen ? (
              <View style={styles.alertInstructionContent}>
                <Text style={styles.alertText}>{alert.instruction.replace(/\s+/g, ' ').trim()}</Text>
              </View>
            ):(
              <View></View>
            )}
          </Pressable>
        ):(
          <View></View>
        )}
      </View>
      {isDetailOpen ? (
        <Pressable onPress={() => setIsDetailOpen(!isDetailOpen)}>
          <View style={styles.alertDetails}>
            <Text style={styles.alertText}>{alert.desc}</Text>
          </View>
          <View style={styles.alertFooter}>
            <MaterialIcons name="expand-more" color={'white'} size={24}/>
          </View>
        </Pressable>
      ):(
        <Pressable onPress={() => setIsDetailOpen(!isDetailOpen)} style={styles.alertFooter}>
          <MaterialIcons name="expand-more" color={'white'} size={24}/>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: '#4F5D6C',
    borderRadius: 10,
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center'
  },
  alertHeader: {
    flexDirection: 'row',
    backgroundColor: '#708394',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  alertContent: {
    padding: 10,
    paddingHorizontal: 20,
  },
  alertContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertInfo: {
    backgroundColor: '#708394',
    padding: 10,
    borderRadius: 5,
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
  alertText: {
    color: 'white',
    fontSize: 12,
  },
  alertIcon: {
    color: 'white',
    fontSize: 18,
    marginRight: 8,
  },
  alertFooter: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    borderTopColor: '#708394',
    borderTopWidth: 1,
  },
  alertDetails: {
    padding: 10,
    paddingHorizontal: 20,
    borderTopColor: '#708394',
    borderTopWidth: 1,
  }
});