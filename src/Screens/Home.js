import React from "react"
import {View,FlatList,ImageBackground,TouchableOpacity,Text,Image,Button,Modal,Dimensions} from "react-native"
import Product from "../products"
import {Context} from "../../App"
import SvgAddCart from "../Images/Addcart"

const {width,height}=Dimensions.get("window")
const size=["XS","S","M","ML","L","X","XL","XXL"]
const filtersize=["Selected","Higher to Lower","Lower to Higher"]
export default Home =({navigation},props)=>{
    const [product,setproduct]=React.useState([...Product])
    const [modal,setmodal]=React.useState(false)
    const [selectedsize,setselectedsize]=React.useState([])
    const [selectedsizebool,setselectedsizebool]=React.useState(false)
    const [filter,setfilter]=React.useState("Selected")
    const [filterbool,setfilterbool]=React.useState(false)
    const {Storestate,Storedispatch}=React.useContext(Context)

    React.useEffect(()=>{
        navigation.setParams({onSave:onSave})
    },[])

    onSave=()=>{
       const temp=Storestate.addtocart
       temp.sort(function(a,b){return a.price-b.price})
       getHome({addtocart:temp})
       navigation.navigate("Cart")
    }

    React.useEffect(()=>{
       if(selectedsizebool){
           let temp=product
           if(selectedsize.length!=0){
           for(let i=0;i<Product.length;i++){
               for(let j=0;j<selectedsize.length;j++){
                   if(Product[i].availableSizes.indexOf(selectedsize[j])!=-1 && temp.length==0){
                       temp.push(Product[i])    
                   }else{
                       if(Product[i].availableSizes.indexOf(selectedsize[j])!=-1 && temp[temp.length-1].id!=Product[i].id){
                           temp.push(Product[i])
                       }
                   }
               }
           }
           setproduct([...temp])
        }else{
            setproduct([...Product])
        }
        setfilter("Selected")
           setselectedsizebool(false)
       }
       if(filter=="Selected" && filterbool){
           if(selectedsize.length!=0){
            setproduct([])
            setselectedsizebool(true)
           }else{
               setproduct([...Product])
           }
           setfilterbool(false)
       }
       if(filter=="Higher to Lower" && filterbool){
        const temp=product
        const sort = temp.sort(function(a,b){ return a.price-b.price})
        setproduct([...sort])
        setfilterbool(false)
       }
       if(filter=="Lower to Higher" && filterbool){
        const temp=product
        const sort = temp.sort(function(a,b){ return b.price-a.price})
        setproduct([...sort])
        setfilterbool(false)
       }
    },[selectedsizebool,filter,filterbool])
    OnPressedSize=(item,index)=>{
        const temp=selectedsize
        if(temp.indexOf(item)==-1){
            temp.push(item)
        }else{
            temp.splice(temp.indexOf(item),1)
        }
        setselectedsize([...temp])
        setproduct([])
        setselectedsizebool(true)
    }
    OnPressedAddCart=(item,index)=>{
        const temp=Storestate.addtocart
        temp.push(item)
        getHome({addtocart:temp})
        console.log(Storestate.addtocart)
    }
    renderFilter=()=>{
        let arr=[]
        for(let i=0;i<filtersize.length;i++){
            arr.push(<TouchableOpacity key={i} onPress={()=>{setfilter(filtersize[i]),setfilterbool(true)}} style={{justifyContent:"center",alignItems:"center",paddingVertical:15}}><Text style={{color:"#0a0a0a",fontWeight:"bold",fontSize:25}}>{filtersize[i]}</Text></TouchableOpacity>)
        }
        return arr
    }
    return(
        <View style={{flex:1,backgroundColor:"#0a0a0a"}}>
            <Text style={{color:"#FFF",fontWeight:"bold",textAlign:"center",fontSize:20,paddingVertical:10}}>Size</Text>
          <View style={{paddingVertical:10,height:80}}>
          <FlatList
           data={size}
           horizontal={true}
           renderItem={({item,index})=>{return( <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:selectedsize.includes(item)?"#FF0000":"#FF0",justifyContent:"center",alignItems:"center"}} onPress={()=>OnPressedSize(item,index)}>
           <Text style={{color:selectedsize.includes(item)?"#FFF":"#0a0a0a"}}>{item}</Text>
       </TouchableOpacity>)}}
       keyExtractor={(item,index)=>item+index.toString()}
       ItemSeparatorComponent={()=>{return(<View style={{paddingHorizontal:10}}/>)}}
       extraData={selectedsize}
           />
          </View>
            <View style={{flexDirection:"row",alignSelf:"center",alignItems:"center",paddingVertical:20}}>
                <Text style={{color:"#FFF",fontSize:16}}>Order by</Text>
                <TouchableOpacity style={{width:120,height:40,marginHorizontal:20,backgroundColor:"#F8F8F8",alignItems:"center",justifyContent:"center"}} onPress={()=>setmodal(!modal)}>
                 <Text style={{color:"#0a0a0a",fontWeight:"bold"}}>{filter}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
            data={product}
            numColumns={2}
            renderItem={({item,index})=>{return(<View style={{width:width/2,marginVertical:10,justifyContent:"center",alignItems:"center"}}>
                <ImageBackground style={{width:160,height:250,backgroundColor:"#FF0",aspectRatio:2.5/4}} source={item.src_1}>
                    {item.isFreeShipping?<Text style={{width:70,paddingVertical:3,fontSize:10,textAlign:"auto",alignSelf:"flex-end",marginTop:20,backgroundColor:"#000",color:"#FFF"}}>Free Shipping</Text>:null}
                </ImageBackground>
                <Text style={{color:"#FFF",fontSize:20,textAlign:"center"}}>{item.title}</Text>
                <Text style={{color:"#FFF",fontSize:20,textAlign:"center"}}>{`${item.currencyFormat}`+" "+`${item.price}`}</Text>
                <Button onPress={()=>OnPressedAddCart(item,index)} title="Add to Cart"/>
            </View>)}}
            keyExtractor={(item,index)=>item.id.toString()}
            contentContainerStyle={{paddingTop:20,paddingBottom:70}}
            extraData={product}
            />
            <Modal
            visible={modal}
            transparent={true}
            >
                <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity style={{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:100}} onPress={()=>setmodal(!modal)}>

                </TouchableOpacity>
                <View style={{width:width/1.2,height:200,backgroundColor:"#FFF",zIndex:10000}}>
                    {renderFilter()}
                </View>
               </View>
            </Modal>
        </View>
    )

    function getHome(data){
        Storedispatch({type:"STORE",payload:data})
    }
}


Home.navigationOptions = ({navigation})=> {
    const { params = {}} = navigation.state
    let headerRight =(<TouchableOpacity
    style={{marginRight:20}}
     onPress={()=> params.onSave()}
     hitSlop={{right:20,left:20,bottom:20,top:20}}
     >
      <SvgAddCart/>
    </TouchableOpacity>)
    return {headerRight}
    }