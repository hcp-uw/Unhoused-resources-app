// import { supabase } from '@/utils/supabase';
import React, { useEffect, useState } from 'react'

export default function test_page() {
  // Consts
  const [shelterName, setShelterName] = useState('')
  const testEnv = process.env.TEST_ENV;

  // useEffect(() => {
  //   const fetchName = async () => {
  //     const { data, error } = await supabase
  //       .from('locations')
  //       .select('title')  // Column
  //       .single()
  
  //     if (error != null) {
  //       throw new Error("Testing this error");
  //     } else {
  //       setShelterName(data.title)
  //     }
  //   }
  // }, []) // Like componentDidMount




  // Return
  return (
    <div>Hello!{testEnv || 'No env var found'}</div>
    // <div>test_page {(shelterName != null) ? shelterName : 'Error...'}</div>
  )
}
