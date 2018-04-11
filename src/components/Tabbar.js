import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native'

const generateArr = (index, length, value) => {
  return Array
    .from({ length })
    .map((_, i) => {
      if (i === index) {
        return value
      }
      return 0.8
    })
}

class Tabbar extends Component {
  render () {
    return (
      <View style={styles.container}>
        {
          this.props.tabs.map((name, page) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.goToPage(page)
                }}
                key={page}
              >
                <Animated.Text 
                  style={[styles.navText, {
                    // fontSize: this.props.activeTab === page ? 20 : 14
                    transform: [
                      {
                        scale: this.props.scrollValue.interpolate({
                          inputRange: [0, 1, 2],
                          outputRange: generateArr(page, 3, 1),
                          extrapolate: 'clamp'
                        })
                      },
                      {
                        translateX: 0
                      }
                    ]
                  }]}
                 >
                  {name}
                </Animated.Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  navText: {
    color: '#626262',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  }
})

export default Tabbar
