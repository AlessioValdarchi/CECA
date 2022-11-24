import { API } from '../../constant';
import * as helper from '../../helper'
export const updateDatabase = async (user, setUser, store, saldo) => {
    try {
        const storage = store.getState()
   
        const values= {
        TotalBuy: storage.dataPack.filter(Boolean),
        Saldo: saldo
        };
        
        try {
          const response = await fetch(`${API}/users/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // set the auth token to the user's jwt
              Authorization: `Bearer ${helper.getToken()}`,
            },
            body: JSON.stringify(values),
          });
          const responseData = await response.json();
          setUser(responseData);
          
        } catch (error) {
          console.log("Error", error)
        } finally {
          
          
    
        }
    } catch (error) {
        return error
    }
   
  };