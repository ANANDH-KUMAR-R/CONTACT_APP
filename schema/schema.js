const {model,Schema} = require('mongoose')
const cnt_schema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required:true
    },
    phno:{
        type:Number,
        required:true
    },
    loc:{
        type:String,
        required:true,
        enum:['mobile','sim','email']
    }
},{timestamps:true}
)

module.exports=model('cnt_schema',cnt_schema,'cnt_schema')