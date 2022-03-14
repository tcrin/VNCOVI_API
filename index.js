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

// [GET] Account
// http://localhost:3000/account
app.get('/account',async (req,res)=>{
    const pool = await connect;
    var sqlString = 'SELECT * FROM [Account]'
    return await pool.request().query(sqlString, (err,data)=>{
      res.send({result:data.recordset});
    })
  })

// [POST] Account
// http://localhost:3000/account
app.post('/account',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'INSERT INTO Account ([uid],phone,fullname,birthday,avatar,gender,status) VALUES (@uid,@phone,@fullname,@birthday,@avatar,@gender,@status)';//
  return await pool.request()
  .input('uid', sql.VarChar, req.body.uid)
  .input('phone', sql.VarChar, req.body.phone)
  .input('fullname', sql.NVarChar, req.body.fullname)
  .input('birthday', sql.Date, req.body.birthday)
  .input('avatar', sql.VarChar, req.body.avatar)
  .input('gender', sql.NVarChar, req.body.gender)
  .input('status', sql.NVarChar, req.body.status)
  .query(sqlString, (err,data)=>{
      res.json({result: data}); 
  })
})

// [GET] Health Declaration
// http://localhost:3000/declaration
app.get('/declaration',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'SELECT * FROM Health_Declaration'
  return await pool.request().query(sqlString, (err,data)=>{
    res.send({result:data.recordset});
  })
})

// [POST] Health Declaration
// http://localhost:3000/declaration
app.post('/declaration',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'INSERT INTO Health_Declaration (fullname,gender,birthday,CCCD,phone,BHYT,[address],nationality,across_place,signs,contact_with,account) VALUES (@fullname,@gender,@birthday,@CCCD,@phone,@BHYT,@address,@nationality,@across_place,@signs,@contact_with,@account)';//
  return await pool.request()
  .input('fullname', sql.NVarChar, req.body.fullname)
  .input('gender', sql.NVarChar, req.body.gender)
  .input('birthday', sql.Date, req.body.birthday)
  .input('CCCD', sql.Int, req.body.CCCD)
  .input('phone', sql.VarChar, req.body.phone)
  .input('BHYT', sql.VarChar, req.body.BHYT)
  .input('address', sql.NVarChar, req.body.address)
  .input('nationality', sql.NVarChar, req.body.nationality)
  .input('across_place', sql.NVarChar, req.body.across_place)
  .input('signs', sql.NVarChar, req.body.signs)
  .input('contact_with', sql.NVarChar, req.body.contact_with)
  .input('account', sql.VarChar, req.body.account)
  .query(sqlString, (err,data)=>{
      res.json({result: data}); 
  })
})

// [GET] Vaccine
// http://localhost:3000/vaccine
app.get('/vaccine',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'SELECT * FROM Vaccine'
  return await pool.request().query(sqlString, (err,data)=>{
    res.send({result:data.recordset});
  })
})

// [POST] Vaccine
// http://localhost:3000/vaccine
app.post('/vaccine',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'INSERT INTO Vaccine (name_vaccine,type_vaccine,doses,effective,company,storage,[image]) VALUES (@name_vaccine,@type_vaccine,@doses,@effective,@company,@storage,@image)';//
  return await pool.request()
  .input('name_vaccine', sql.NVarChar, req.body.name_vaccine)
  .input('type_vaccine', sql.NVarChar, req.body.type_vaccine)
  .input('doses', sql.NVarChar, req.body.doses)
  .input('effective', sql.NVarChar, req.body.effective)
  .input('company', sql.NVarChar, req.body.company)
  .input('storage', sql.NVarChar, req.body.storage)
  .input('image', sql.VarChar, req.body.image)
  .query(sqlString, (err,data)=>{
      res.json({result: data}); 
  })
})

// [GET] Vaccination
// http://localhost:3000/vaccination
app.get('/vaccination',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'SELECT * FROM Vaccination'
  return await pool.request().query(sqlString, (err,data)=>{
    res.send({result:data.recordset});
  })
})

// [POST] Vaccination
// http://localhost:3000/vaccination
app.post('/vaccination',async (req,res)=>{
  const pool = await connect;
  var sqlString = 'INSERT INTO Vaccination (fullname,gender,birthday,phone,CCCD,BHYT,[address],occupation,workplace,ethnic,injections,injection_session,priority_group,user_vaccination,id_vaccine) VALUES (@fullname,@gender,@birthday,@phone,@CCCD,@BHYT,@address,@occupation,@workplace,@ethnic,@injections,@injection_session,@priority_group,@user_vaccination,@id_vaccine)';//
  return await pool.request()
  .input('fullname', sql.NVarChar, req.body.fullname)
  .input('gender', sql.NVarChar, req.body.gender)
  .input('birthday', sql.Date, req.body.birthday)
  .input('phone', sql.VarChar, req.body.phone)
  .input('CCCD', sql.Int, req.body.CCCD)
  .input('BHYT', sql.VarChar, req.body.BHYT)
  .input('address', sql.NVarChar, req.body.address)
  .input('occupation', sql.NVarChar, req.body.occupation)
  .input('workplace', sql.NVarChar, req.body.workplace)
  .input('ethnic', sql.NVarChar, req.body.ethnic)
  .input('injections', sql.NVarChar, req.body.injections)
  .input('injection_session', sql.NVarChar, req.body.injection_session)
  .input('priority_group', sql.NVarChar, req.body.priority_group)
  .input('user_vaccination', sql.VarChar, req.body.user_vaccination)
  .input('id_vaccine', sql.Int, req.body.id_vaccine)
  .query(sqlString, (err,data)=>{
      res.json({result: data}); 
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





// // [GET] user by ID
// // http://localhost:3000/user/1
// app.get('/user/:id',async (req,res)=>{
//   const id = req.params.id;
//   const pool = await connect;
//   var sqlString = 'SELECT * FROM [User] WHERE id_user = @var_id';
//   return await pool.request()
//   .input('var_id', sql.Int, id)
//   .query(sqlString, (err,data)=>{
//     if(data.recordset.length>0){
//       res.send({result: data.recordset});
//     }else{
//       res.send({result: null});
//     }
//   })
// })

// // [POST] user
// // http://localhost:3000/user
// app.post('/user',async (req,res)=>{
//   const pool = await connect;
//   var sqlString = 'INSERT INTO [User] (fullname,gender,birthday,CCCD,phone,email,[address]) VALUES (@fullname, @gender,@birthday,@CCCD,@phone,@email, @address)';
//   return await pool.request()
//   .input('fullname', sql.NVarChar, req.body.fullname)
//   .input('gender', sql.NVarChar, req.body.gender)
//   .input('birthday', sql.Date, req.body.birthday)
//   .input('CCCD', sql.Int, req.body.CCCD)
//   .input('phone', sql.Int, req.body.phone)
//   .input('email', sql.VarChar, req.body.email)
//   .input('address', sql.NVarChar, req.body.address)
//   .query(sqlString, (err,data)=>{
//       res.json({result: data}); 
//   })
// })

// // [POST] Health_Declaration
// // http://localhost:3000/declaration
// app.post('/declaration',async (req,res)=>{
//   const pool = await connect;
//   var sqlString = 'INSERT INTO Health_Declaration (fullname,gender,birthday,CCCD,phone,BHYT,[address],nationality,across_place, signs,contact_with, user_declaration) VALUES (@fullname, @gender,@birthday,@CCCD,@phone,@BHYT,@address,@nationality,@across_place,@signs,@contact_with,@user_declaration)';
//   return await pool.request()
//   .input('fullname', sql.NVarChar, req.body.fullname)
//   .input('gender', sql.NVarChar, req.body.gender)
//   .input('birthday', sql.Date, req.body.birthday)
//   .input('CCCD', sql.Int, req.body.CCCD)
//   .input('phone', sql.Int, req.body.phone)
//   .input('BHYT', sql.VarChar, req.body.BHYT)
//   .input('address', sql.NVarChar, req.body.address)
//   .input('nationality', sql.NVarChar, req.body.nationality)
//   .input('across_place', sql.NVarChar, req.body.across_place)
//   .input('signs', sql.NVarChar, req.body.signs)
//   .input('contact_with', sql.NVarChar, req.body.contact_with)
//   .input('user_declaration', sql.Int, req.body.user_declaration)
//   .query(sqlString, (err,data)=>{
//       res.json({result: data}); 
//   })
// })

// // [POST] Vaccination
// // http://localhost:3000/vaccination
// app.post('/vaccination',async (req,res)=>{
//   const pool = await connect;
//   var sqlString = 'INSERT INTO Vaccination (fullname,gender,birthday,phone,CCCD,BHYT,[address], occupation, workplace, ethnic, injections, injection_session, priority_group, user_vaccination,id_vaccine) VALUES (@fullname, @gender,@birthday,@phone,@CCCD,@BHYT,@address,@occupation, @workplace, @ethnic, @injections, @injection_session, @priority_group, @user_vaccination,@id_vaccine)';
//   return await pool.request()
//   .input('fullname', sql.NVarChar, req.body.fullname)
//   .input('gender', sql.NVarChar, req.body.gender)
//   .input('birthday', sql.Date, req.body.birthday)
//   .input('phone', sql.Int, req.body.phone)
//   .input('CCCD', sql.Int, req.body.CCCD)
//   .input('BHYT', sql.VarChar, req.body.BHYT)
//   .input('address', sql.NVarChar, req.body.address)
//   .input('occupation', sql.NVarChar, req.body.occupation)
//   .input('workplace', sql.NVarChar, req.body.workplace)
//   .input('ethnic', sql.NVarChar, req.body.ethnic)
//   .input('injections', sql.NVarChar, req.body.injections)
//   .input('injection_session', sql.NVarChar, req.body.injection_session)
//   .input('priority_group', sql.NVarChar, req.body.priority_group)
//   .input('user_vaccination', sql.Int, req.body.user_vaccination)
//   .input('id_vaccine', sql.Int, req.body.id_vaccine)
//   .query(sqlString, (err,data)=>{
//       res.json({result: data}); 
//   })
// })