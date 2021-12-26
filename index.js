const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer();
const app = express()



app.use(express.json());
// // parse application/json
app.use(bodyParser.json())
// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded())
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
const port = 3000
const {connect,sql} = require('./connect')
app.use(morgan('combined'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// [GET] user 
// http://localhost:3000/user
app.get('/user',async (req,res)=>{
    const pool = await connect;
    var sqlString = 'SELECT * FROM [User]'
    return await pool.request().query(sqlString, (err,data)=>{
      res.send({result:data.recordset});
    })
  })

// [GET] user by ID
// http://localhost:3000/user/1
app.get('/user/:id',async (req,res)=>{
  const id = req.params.id;
  const pool = await connect;
  var sqlString = 'SELECT * FROM [User] WHERE id_user = @var_id';
  return await pool.request()
  .input('var_id', sql.Int, id)
  .query(sqlString, (err,data)=>{
    if(data.recordset.length>0){
      res.send({result: data.recordset});
    }else{
      res.send({result: null});
    }
  })
})

// [POST] user
// http://localhost:3000/user
app.post('/user',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'INSERT INTO [User] (fullname,gender,birthday,CCCD,phone,email,[address]) VALUES (@fullname, @gender,@birthday,@CCCD,@phone,@email, @address)';
  return await pool.request()
  .input('fullname', sql.NVarChar, req.body.fullname)
  .input('gender', sql.NVarChar, req.body.gender)
  .input('birthday', sql.Date, req.body.birthday)
  .input('CCCD', sql.Int, req.body.CCCD)
  .input('phone', sql.Int, req.body.phone)
  .input('email', sql.VarChar, req.body.email)
  .input('address', sql.NVarChar, req.body.address)
  .query(sqlString, (err,data)=>{
      res.json({result: data}); 
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})