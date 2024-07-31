'use client' //this line makes the app a client-sided app
import Image from "next/image";
import { useState,useEffect } from "react"; //state variables and client-sided functions from react
import { firestore } from "@/firebase"; //from firebase file
import { Box, Typography } from '@mui/material'
import { collection, deleteDoc, getDocs, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]) //state variable that stores inventory
  const [open, setOpen] = useState(false) //state variables to add and remove stuff
  //set to empty string, which will be default val
  const [itemName, setItemName] = useState('') //itemName is used to store the name of the item we type out

  //updates inventory from firebase
  //async means it wont block the code while fetching, meaning that the site wont freeze
  const updateInventory = async () => {
    //gets snapshot of collection
    const snapShot = query(collection(firestore, 'inventory')) //firestore instance, inventory
    //gets documents from collection 'inventory'
    const docs = await getDocs(snapShot)
    const inventoryList = []
    //for every doc, we want to add it to inventory list
    docs.forEach((doc) => {
      inventoryList.push({
        //push new object where name is id of doc 
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item) //gets the direct item ref
  const docSnap = await getDoc(docRef) //get document snapshot if it exists

  if (docSnap.exists()){
    const {quantity} = docSnap.data() //get quantity from data
    if (quantity === 1){ //if === 1, delete it
      await deleteDoc(docRef) 
    }
    else{ //it not 1, set doc ref to be quantity-1
      await setDoc(docRef, {quantity: quantity-1})
    }
    //if it doesnt exist, do nothing, or throw error message

  }
  await updateInventory()
}

  //calls the above code, which is updateInventory, whenever the dependency array changes
  //however, its empty, which means itll only run once when the page loads, which is good
  useEffect(()=>{ 
    updateInventory()
  }, [])

  //in MUI, a box is the most basic starting block
  return <Box>
    <Typography variant="h1">Portfolio Partner</Typography>
    {
      inventory.forEach((item) =>{
        return (<Box>
          {item.name}
          {item.count}
        </Box>)
      })
    }
  </Box> 
}