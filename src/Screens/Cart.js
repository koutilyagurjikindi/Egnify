import React from "react"
import {View,SafeAreaView,Text,Image} from "react-native"
import {Context} from "../../App"
import SvgClose from "../Images/Close"
import SvgAddCart from "../Images/Addcart"
import { TouchableOpacity } from "react-native-gesture-handler"
import SvgBlackClose from "../Images/Blackclose"

export default Cart=({navigation})=>{
    const {Storestate,Storedispatch}=React.useContext(Context)
    const [cartproduct,setcartproduct]=React.useState([])
    React.useEffect(()=>{
        let temp=cartproduct
        for(i=0;i<Storestate.addtocart.length;i++){
            if(temp.indexOf(Storestate.addtocart[i])==-1){
                temp.push({"product":Storestate.addtocart[i],})
            }
        }
    },[])
    return(
        <View style={{flex:1,backgroundColor:"#FFF"}}>
            <SafeAreaView></SafeAreaView>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:"#0a0a0a",backgroundColor:"#FFF",paddingVertical:10,paddingHorizontal:20}}>
                    <View>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <SvgClose/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <SvgAddCart width={50} height={50}/>
                        <View style={{position:"absolute",bottom:0,right:0}}>
                           <View style={{width:20,height:20,borderRadius:10,backgroundColor:"#FFF000",justifyContent:"center",alignItems:"center"}}>
                               <Text style={{fontWeight:"bold"}}>{Storestate.addtocart.length}</Text>
                           </View>
                        </View>
                    </View>
                    <View>

                    </View>
                </View>
                <View style={{flex:1,justifyContent:"space-between",backgroundColor:"#0a0a0a"}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:20,paddingVertical:5,backgroundColor:"#999999",marginTop:20}}>
                        <View style={{flexDirection:"row"}}>
                            <View>
                            <Image
                            style={{width:70,height:100,aspectRatio:2/3}}
                            source={require("../products/113_1.jpg")}
                            />
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontSize:20,width:220,flexWrap:"wrap"}}>Car Red t SHirt</Text>
                                <Text style={{fontSize:13,width:220,flexWrap:"wrap",marginTop:5}}>Description</Text>
                                <Text style={{fontSize:12,width:220,flexWrap:"wrap",marginTop:5}}>Print</Text>
                                <Text style={{fontSize:12,width:220,flexWrap:"wrap",marginTop:5}}>Quantity:1</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={{alignSelf:"flex-end"}} hitSlop={{right:10,left:10,bottom:10,top:10}}>
                            <SvgBlackClose width={10} height={10}/>
                            </TouchableOpacity>
                            <Text style={{fontWeight:"bold",fontSize:16}}>$10.90</Text>
                            <View style={{marginTop:20,flexDirection:"row"}}>
                                <View>
                                    <TouchableOpacity style={{paddingVertical:1,paddingHorizontal:12,backgroundColor:"#FFF000",borderTopLeftRadius:3,borderBottomLeftRadius:3}}>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{paddingVertical:1,paddingHorizontal:12,backgroundColor:"#FF0000",borderTopRightRadius:3,borderBottomRightRadius:3}}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingTop:30,backgroundColor:"#999999",marginTop:20,paddingHorizontal:20}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingBottom:50}}>
                            <View>
                                <Text style={{fontWeight:"bold",fontSize:20}}>SUBTOTAL</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight:"bold",fontSize:20,color:"#FFF000"}}>$10</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{backgroundColor:"#0a0a0a",justifyContent:"center",alignItems:"center",marginBottom:70,paddingVertical:20}}>
                            <Text style={{color:"#FFF",fontWeight:"bold",fontSize:20}}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}