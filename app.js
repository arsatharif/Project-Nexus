const expFun=require('express')
const app=expFun()
const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient;
const bodyParser=require('body-parser')
const path=require('path')
let currentuser;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(expFun.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
    console.log("Opening login page")
    res.render('signup',{
        error:""
    })
})

app.get('/login', (req, res) => {

    res.render('login',{
        error:""
    })
   // Render the login view
});
app.get('/signup', (req, res) => {
    console.log("signup");
    res.render('signup',{
        error:" "
    })
   // Render the login view
});
app.use('pasta.png',(req,res)=>{
    console.log("hell")
})
//signup posting data
app.post('/signuppostData',async(req,res)=>{
    console.log(req.body);
    const db=await mongoClient.connect('mongodb://localhost:27017/user').then(console.log("Connected to db"))
    const dbObject=await db.db('user')
    const collection=await dbObject.collection('users')
    const userEmail=req.body.useremail;
    const create=await collection.findOne({userEmail})
    //place to insert data
    if(create===null)
    {//place if if there is no one with this email
        const currentuser={
            userName:req.body.username,
            userEmail:userEmail,
            userPassword:req.body.userpassword
        }        

        await collection.insertMany([currentuser]).then(console.log("user data entered sucessfully"))   
        res.render('home',{
            name:req.body.username
        });
    }
    else
    {//place to redirect sign up because entered is already present
        console.log("User email already exists")
        res.render('signup',{
            error:"User already exists"
        })
    }

})

//login
app.post('/loginpostData',async(req,res)=>{
    const db=await mongoClient.connect('mongodb://localhost:27017/user').then(console.log("Connected to db"))
    const dbObject=await db.db('user')
    const collection=await dbObject.collection('users')
    const userEmail=req.body.useremail;
    const create=await collection.findOne({userEmail})
    if(create===null)
    {
        console.log("Enter registered user email")
        res.render('login',{
            error:"Enter registered user email"
        })
    }
    else
    {//place to check password
        //checking entered password is matching
        if(create.userPassword===req.body.userpassword)
        {//Password matched
            currentuser=create;
            res.render('home',{
                name:create.userName,
                
            })
        }
        // password is not matching
        else 
        {
            console.log("Enter registered password")
            res.render('login',{
                error:"Enter registered password"
            })
            
        }
    }
    
})
//order page
app.use('/order',(req,res)=>{
  res.render('order')  
})
//forgotten password page displayer
app.use('/forgottenpasswordpage',(req,res)=>{
    res.render('forgottenpassword',{
        error:""
    });
})
//update password
app.post('/updatepassword',async(req,res)=>{
    console.log(req.body)
    const db=await mongoClient.connect('mongodb://localhost:27017/user').then(console.log("Connected to db"))
    const dbObject=await db.db('user')
    const collection=await dbObject.collection('users')
    const userEmail=req.body.useremail;
    const create=await collection.findOne({userEmail})
    console.log(req.body.newpassword,userEmail)
    //checking is there user i already present with that name
    if(create==null)
    {
        res.render('forgottenpassword',{
        error:"Enter Valid Email"
        });
    }
    else
    {
       await collection.updateOne(
        {userEmail:userEmail},
        {$set:{
        userPassword:req.body.newpassword}}
    )
       .then((e)=>console.log(e))
    }
    currentuser=await collection.findOne({userEmail})

    res.render('home',{
        name:create.userName
    });
    
})
app.get('/home',(req,res)=>{
    res.render('home',{
        name:currentuser.userName
    })
})
app.listen(3000,console.log("Running on port 3000"));

//function to connect with database
function connectDb()
{
    
}



