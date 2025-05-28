import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import Dropdown from "@/components/Dropdown";

export default function HelpersPage() {
  const [isAboutVisible, setIsAboutVisible] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Dropdown 
          header="Volunteering"
          text="For volunteering, please visit each resource's respective website! They likely have a “volunteer” page. Example: https://rootsinfo.org/volunteernow"
        />
        <Dropdown 
          header="Donations"
          text="Donations are not yet in this app! If you would like to donate, go to a resource's respective website! Example: https://rootsyoungadultshelter-bloom.kindful.com/"
        />
        <Dropdown 
          header="Learn"
          text="Common resources include: Charity Navigator for seeing charity ratings and reliability King County Regional Homelessness Authority for government based information https://kcrha.org/"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    padding: 32,
  },
});