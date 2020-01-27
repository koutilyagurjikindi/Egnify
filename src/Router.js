import React from "react"
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import Home from "../src/Screens/Home"
import Cart from "../src/Screens/Cart"

const Navigation=createStackNavigator({
    Home:{
        screen:Home
    },
    Cart:{
        screen:Cart,
        navigationOptions:{
            headerShown:false,
            headerTransparent:true
        }
    }
},{initialRouteName:"Home"})

const Router = createAppContainer(Navigation)

export default Router