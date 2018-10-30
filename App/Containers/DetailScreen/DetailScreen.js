import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'

// Styles
import styles from './DetailScreenStyle'

class DetailScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>DetailScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default DetailScreen