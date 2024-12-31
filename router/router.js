const {Router}=require('express')
const router=Router()
const Cnt_Schema= require('../schema/schema')
const fs = require('fs')
router.get('/addContact',(req,res)=>{
    res.render('contact_App/addContact',{title:'Add_Contact'})
})


    router.get('/style',(req,res)=>{
        fs.readFile('./public/cnt.css',(err,data)=>{
            if(err) throw err;
            res.end(data);
        })
    })


router.post('/addContact',async(req,res)=>{
    await Cnt_Schema.create(req.body);
    res.redirect('/',302,{})
})

router.get('/allContact',async(req,res)=>{
    let payload=await Cnt_Schema.find({}).lean()
    res.render('contact_App/cnt_list',{title:'All-Contact',payload})
})

// INFO CONTACT :
router.get('/:id',async(req,res)=>{
    let payload=await Cnt_Schema.findOne({_id:req.params.id}).lean() //js object into plain text
    res.render('contact_App/single_cnt',{title:'Single-Contact',payload})
})

//EDIT CONTACT :
router.get('/edit/:id',async(req,res)=>{
    let editData = await Cnt_Schema.findOne({_id:req.params.id}).lean()
    res.render('contact_App/edit_cnt',{title:'Edit-Contact',editData})
})//UPDATE CONTACT :
router.post('/edit/:id',async(req,res)=>{
    let editData = await Cnt_Schema.findOne({_id:req.params.id})
    editData.fname=req.body.fname;
    editData.lname=req.body.lname;
    editData.phno=req.body.phno;
    editData.loc=req.body.loc

    editData.save()
    res.redirect('/api/allContact',302,{})
})



// DELETE CONTACT :
router.get('/delete/:id', async (req, res) => {
    const result = await Cnt_Schema.deleteOne({ _id: req.params.id });
    console.log(res.data);
    res.redirect('/api/allContact')
});


module.exports=router;
