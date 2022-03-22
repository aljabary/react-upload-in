import React, {Component} from 'react';
import UploadPreview from './UploadPreview';
import './Uploader.css'
class Uploader extends Component {
  state={files:[], enabled:true,fterror:false, errors:[]};
  filetypes=[]
 constructor (props) {
    super(props);
	this.fl  =null;
	this.setfl = element => {
      this.fl = element;
    };
  props.filetypes.forEach(element => {
    this.filetypes+="."+element+",";
  })

  
	if(props.image) this.filetypes += ".jpg,.png,.jpeg,";
	if(props.pdf) this.filetypes += ".pdf,";
	if(props.doc) this.filetypes += ".doc,.docx,";
	if(props.xl) this.filetypes += ".xls,.xlxs,";
    this.browse = this.browse.bind( this );
 }
	componentDidMount(){}
  reset(){ 
	   this.setState({files:[]});
  }
  browse(tp){
	  if(this.fl)this.fl.click(); 
  }
  handleFileChange(e){
    let {files,errors}=this.state
    for(var i=0;i<e.target.files.length;i++){      
      var fls =e.target.files[i];
    //  for(var i=0; i<fls.length;i++){
         var fl = fls.name.split('.').pop();
         fl = fl.toLowerCase();
         if(this.filetypes.includes(fl)){       
	         files.push( fls); 
             this.setState({files: files,fterror:false});
         }else{
          errors.push(1)
             this.setState({errors:errors});
			       // this.props.onError( files);
			  return false;
         }
    }
     
      if(this.props.onselected) this.props.onselected(files);
	  
  }
  isEnabled(en){ 
  this.setState({enabled:en});
  }
  render() {
    const { errors,files } = this.state;
    const{action,image,pdf,doc,xl, src, filetypes, onResult,buttonText,btnremove, onRemoved, theme}=this.props
	let ftp = ""
  let is_enabled=false; 
  filetypes.forEach(element => {
    ftp+="."+element+",";
  }); 
  let filelist
  if(src){
   filelist= src 
  }
	if(image) ftp += "image/*,";
	if(pdf) ftp += ".pdf,";
	if(doc) ftp += ".doc,.docx,";
	if(xl) ftp += ".xls,.xlxs,";
	if(!this.state.enabled) is_enabled=true
  let theTheme=theme?theme:'default'
  return (<div className={'react-upload-in rui-theme-'+theTheme}>
    <div className='panel'>
    <button className='p-2 border rounded-lg bg-white flex flex-col items-center justify-center' onClick={this.browse.bind(this)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
</svg>
<span>{buttonText}</span></button>
<span className='label'>{this.props.label} </span>
<input type="file" style={{display:'none'}} 
ref={this.setfl }
 multiple={this.props.multiple===false?false:true}
 onChange={this.handleFileChange.bind( this )}
accept={ftp} 
	/>
  </div>
  <div className='list-upload'>
    {files.map((f,i)=>{
      return <UploadPreview previewOnly={f.id?true:false} hideOnSuccess={this.props.hideOnSuccess} src={f} key={i} 
      result={onResult} onRemoved={onRemoved}
      action={action}
      />
    })}
    {filelist?.map((f,i)=>{
      return <UploadPreview previewOnly={f.id?true:false} hideOnSuccess={this.props.hideOnSuccess} 
      src={f} key={f.id} result={onResult} onRemoved={onRemoved}
      btnremove={btnremove===false?true:false}
      action={action} />
    })}
    {errors.map((e,i)=>{
      return <div className='alert danger' key={i}>File tipe tidak didukung!</div>
    })}
     </div>
  </div>)
}
}

export default Uploader
