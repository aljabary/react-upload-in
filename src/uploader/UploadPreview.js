import React, {Component} from 'react'
 class UploadPreview extends Component {
	state={percentage:0,startupload:false,removed:false,
  response:null}
	constructor(props){
		super(props);
        this.uploadprogress = this.uploadprogress.bind(this);
        this.results = this.results.bind(this); 
        
	}
  xhr=new XMLHttpRequest();
	componentDidMount(){
         if(!this.props.previewOnly){
           if(this.props.src)this.upload()
         }
	}
componentWillUnmount() { 
}
  
onRemove=()=>{
  this.xhr.abort()
  this.setState({removed:true});
  if(!this.props.previewOnly){
    if(this.props.onRemoved)this.props.onRemoved(this.state.response);
  }else{
    if(this.props.onRemoved)this.props.onRemoved(this.props.src);
  }
  }
uploadprogress(e){
    var p = Math.ceil((e.loaded / e.total) * 100);
    this.setState({percentage:p});
}
results(r){
  let res = JSON.parse(r)
    this.props.result(res)    
  this.setState({
      startupload:false,
      response:res,
      removed:this.props.hideOnSuccess
  })
}
 upload(){
   const{action,src,setHeader}=this.props
    const formData = new FormData();
    formData.append("file",src);    
    var xhr = this.xhr
    xhr.onreadystatechange = () =>{
    if (xhr.readyState == XMLHttpRequest.DONE) {
        this.results(xhr.response)        
    }
  }
  xhr.open("POST",action, true)
  if(setHeader) xhr.setRequestHeader(setHeader.key, setHeader.value);
  xhr.upload.onprogress = this.uploadprogress;
  xhr.onload = function(t) {
    if(this.status == 200) {    }
  }
  this.setState({ startupload:true  })
  xhr.send(formData);
   
}
preview(src,previewOnly){
  var filename = previewOnly?new URL(src.src).pathname.split('/').pop():src.name
  filename =filename.split('.').pop();
  filename = filename.toLowerCase();
    var extentions =['png','jpg','jpeg','webp'];
    if(extentions.includes(filename)){
        return  <img src={previewOnly?src.src:URL.createObjectURL(src)} />;
    }
    var extentions =['dwg','pdf','xls','xlsx','doc','docx','iges','igs','step','stp','.x_t','dxf','stl'];
    if(extentions.includes(filename)){
        return (<><svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg></>);
    }
}
  render() {
	  let {startupload,removed,percentage}=this.state;
    const {src,previewOnly,removeText}=this.props
    console.log(previewOnly)
  return (
      <>{!removed&&<div className='preview'>
      {this.preview(src,previewOnly)}
      <div className='meta'>
      <span className='line-clamp'>{previewOnly?new URL(src.src).pathname.split('/').pop():src.name}</span>
      {startupload&&<div className="rui-progress"><div className="determinate" style={{width:percentage+'%'}} ></div> </div>}
      {!this.props.btnremove&&<div className='btn-remove'><a className='text-red-500 text-sm' onClick={this.onRemove.bind(this)}>{removeText?removeText:"remove"}</a></div>}
    </div>
 
  </div>}</>
)
}
}

export default UploadPreview
