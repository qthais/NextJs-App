'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'
const AuthContext = React.createContext()
const provider = new GoogleAuthProvider();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProVider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)
    //Auth handlers
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function signInWithGoogle(){
        return signInWithPopup(auth,provider)
    }
    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubcribe=onAuthStateChanged(auth,async (user)=>{
            try {
                console.log("auth change")
                //Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log('no user found!')
                    return 
                }
                //if user exists,fetch data
                const docRef=doc(db,'users',user.uid)
                const docSnap=await getDoc(docRef)
                let firebaseData={}
                if(docSnap.exists()){
                    console.log('found user')
                    firebaseData=docSnap.data()
                }
                setUserDataObj(firebaseData)
            } catch (err) {
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        })
        return unSubcribe
    }, [])
    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        signInWithGoogle,
        loading
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}