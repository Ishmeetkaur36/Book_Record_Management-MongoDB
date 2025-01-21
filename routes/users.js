const express = require("express");
const {users} = require("../data/users.json");
const router = express.Router();

//& http://localhost:8081/users

/*
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});



/*
 * Route: /users/:id
 * Method: GET
 * Description: Get user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id" , (req,res) => {
   const {id} = req.params;
   const user = users.find((each) => each.id === id);
   if(!user){
    return res.status(404).json({
      success : false,
      message : "USER DOES NOT EXIT !",
    });
   }
    return res.status(200).json({       
    succuss : true,
    message : "USER FOUND",
    data : user,
   }); 
});

/*
 * Route: /users
 * Method: POST
 * Description: Creating new user
 * Access: Public
 * Parameters: none
 */
router.post("/" ,(req,res) =>{
  const {id, name, surname, email, subscriptionType ,subscriptionDate } = req.body;

  const user =users.find((each) => each.id === id)
  if(user){
    return res.status(404).json({
      success : false,
      messsage : "User with this ID already exists!",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate
  });
  return res.status(201).json({
    success : true,
    message : "USER ADDED SUCCESSFULLY",
    data : users,
  });
});

/*
 * Route: /users/:id
 * Method: PUT
 * Description: Updating  a user by id
 * Access: Public
 * Parameters: id
 */
router.put("/:id" ,(req,res) =>{
  const {id} = req.params;
  const {data} = req.body;

  const user = users.find((each) => each.id === id);
  if(!user){
    return res.status(404).json({
      success : false,
      message : "USER DOES NOT EXIST !",
    });
  }
  const updateUserData = users.map((each)=>{
    if(each.id === id){
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success : true,
    message : "USER UPDATED SUCCESSFULLY",
    data : updateUserData,
  });
});

/*
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete user by id
 * Access: Public
 * Parameters: id
 */
router.delete("/:id" , (req,res) =>{
  const {id} = req.params;
  const user = users.find((each) => each.id ===id);
  if(!user){
    return res.status(404).json({
      success : false,
      message : "USER ID DOES NOT EXITS !",
    });
  }
  const index = users.indexOf(user);
  users.splice(index,1);
  return res.status(200).json({
    success : true,
    message : "USER DELETED",
    data : users,
  });
});

/*
 * Route: /users/subscriptionDetails/:id
 * Method: GET
 * Description: Get all users subscription details
 * Access: Public
 * Parameters: id
 */
router.get("/subscriptionDetails/:id" , (req,res)=>{
  const {id} =req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success : false,
      message : "USER WITH GIVEN ID DOES NOT EXIST !",
    });
  }

  const getDateInDays = (data = "") =>{
    let date;
    if(data === ""){
      date = new Date();                    //Current date
    }
    else{
      date = new Date(data);                //Provided Date
    }
    
    //~ Calculates no of days from current day
    let days = Math.floor(date/(1000*60*60*24));
    return days;

  };
    const subscriptionType = (date) =>{
      if((user.subscriptionType == "Basic")){
        date = date + 90;
      }
      else if((user.subscriptionType == "Standard")){
        date = date + 180;
      }
      if((user.subscriptionType =="Premium")){
        date = date + 365;
      }
      return date;
    };

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
      ...users,
      isSubscriptionExpired : subscriptionExpiration <= currentDate,
      daysLeftForExpiration : 
        subscriptionExpiration <= currentDate ?
            0  
          : subscriptionExpiration - currentDate,
      fine :
        returnDate < currentDate ?
          subscriptionExpiration <= currentDate ?
              100
              :50
          : 0,    
    };
    return res.status(200).json({
      success : true,
      message : "SUBSCRIPTION DETAILS",
      data,
    });


});

module.exports = router;